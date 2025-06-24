const checkoutService = require('../service/checkout.service');

const addCard = async (req, res) => {
  try {
    const response = await checkoutService.saveCard(req.body);
    res.status(response.status).json(response.body);
  } catch (error) {
    console.error('Error en addCard controller:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await checkoutService.removeCard(id);
    res.status(response.status).json(response.body);
  } catch (error) {
    console.error('Error en deleteCard controller:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { addCard, deleteCard };
