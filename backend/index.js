// Importaciones
const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('./config/db.js');

// Importa las rutas personalizadas para autenticación, libros, usuarios, pagos e IA
const authRoutes = require('./routes/auth.routes.js');
const bookRoutes = require('./routes/book.routes.js');
const userRoutes = require('./routes/user.routes.js');
const checkoutRoutes = require('./routes/checkout.routes.js');
const aiGeminiRoutes = require('./routes/aiGemini.routes');
const uploadFile = require('./routes/uploadFile.routes.js');

// Crea una instancia de la aplicación Express
const app = express();
// Puerto donde se levanta el servidor
const PORT = 3000;

// Habilitamos CORS para permitir peticiones desde el frontend (http://localhost:4200)
app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://main.d17jgtfjujlttk.amplifyapp.com'
  ],
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, sameSite: 'lax' }
}));

// Ruta de prueba
app.get('/', (req, res) => res.send('¡Backend funcionando con CommonJS! 🚀'));

// ---------- Cargamos openid-client dinámicamente ----------
(async () => {
  try {
    const openid = await import('openid-client');
    const { Issuer, generators } = openid.default || openid;

    // Cognito OpenID Client
    const issuer = await Issuer.discover(
      'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_dvurIkHLe'
    );

    const client = new issuer.Client({
      client_id: '1951tqfvb7fakucpruls1e1875',
      client_secret: '220il2krtt5hgp1q0b1903vj492gtqnhigp04733cj4bmui15b7',
      redirect_uris: ['https://main.d17jgtfjujlttk.amplifyapp.com/home'],
      response_types: ['code']
    });

    console.log('✅ Cognito client inicializado');

    // ---------- Rutas Cognito ----------
    app.get('/login', (req, res) => {
      const codeVerifier = generators.codeVerifier();
      const codeChallenge = generators.codeChallenge(codeVerifier);
      req.session.codeVerifier = codeVerifier;

      const url = client.authorizationUrl({
        scope: 'openid email profile',
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
      });

      res.redirect(url);
    });

    app.get('/callback', async (req, res) => {
      try {
        if (!req.session || !req.session.codeVerifier) {
          return res.status(400).send('CodeVerifier no encontrado en sesión');
        }

        const params = client.callbackParams(req);
        const tokenSet = await client.callback(
          'https://main.d17jgtfjujlttk.amplifyapp.com/home',
          params,
          { code_verifier: req.session.codeVerifier }
        );

        req.session.tokenSet = tokenSet;
        res.json({ message: 'Login exitoso con Cognito ✅', token: tokenSet });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en callback de Cognito' });
      }
    });

    // LOGOUT 
    app.get('/logout', (req, res) => {
      req.session.destroy(() => {
        const logoutUrl = `https://us-east-1dvurikhle.auth.us-east-1.amazoncognito.com/logout?client_id=1951tqfvb7fakucpruls1e1875&logout_uri=http://localhost:4200/login`;
        res.redirect(logoutUrl);
      });
    });
    // Rutas internas
    app.use('/api/auth', authRoutes);
    app.use('/api/books', bookRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/checkout', checkoutRoutes);
    app.use('/api/ai', aiGeminiRoutes);
    app.use('/api/upload', uploadFile);

    // Iniciar servidor después de Cognito
    app.listen(PORT, () =>
      console.log(`Servidor escuchando en http://localhost:${PORT}`)
    );

  } catch (err) {
    console.error('❌ Error cargando openid-client:', err);
  }
})();
