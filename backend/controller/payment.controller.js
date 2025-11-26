// backend/controller/payment.controller.js
const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN, // poné tu token en .env
  options: { timeout: 5000 }
});

const preference = new Preference(client);

const createPaymentPreference = async (req, res) => {
  try {
    const { items, idUsuario } = req.body;

    const body = {
      items: items.map(item => ({
        title: item.title,
        unit_price: Number(item.price),
        quantity: Number(item.quantity),
        currency_id: 'ARS'
      })),
      external_reference: String(idUsuario),
      back_urls: {
        success: 'http://localhost:4200/home',
        failure: 'http://localhost:4200/home',
        pending: 'http://localhost:4200/home'
      },
      auto_return: 'approved'
    };

    const result = await preference.create({ body });

    // URL real que devuelve MP
    return res.json({ init_point: result.init_point || result.body.init_point });

  } catch (error) {
    console.error('Error creando preferencia MP:', error);
    return res.status(500).json({ message: 'Error al crear preferencia de pago' });
  }
};

module.exports = { createPaymentPreference };
