const checkoutRepository = require('../repository/checkout.repository');

const saveCard = async (data) => {
  const { nroTarjeta, fechaVencimiento, clave, idUsuario, importe } = data;

  if (!nroTarjeta || !fechaVencimiento || !clave || !idUsuario || !importe) {
    console.log("falta algun campo");
    return { status: 400, body: { message: 'Todos los campos son requeridos' } };
  }

  await checkoutRepository.insertCard({ nroTarjeta, fechaVencimiento, clave, idUsuario, importe });

  return { status: 201, body: { message: 'Tarjeta guardada con éxito' } };
};

const removeCard = async (idTarjeta) => {
  if (!idTarjeta) {
    return { status: 400, body: { message: 'El id de la tarjeta es requerido' } };
  }

  const tarjeta = await checkoutRepository.getCardById(idTarjeta);
  if (!tarjeta) {
    return { status: 404, body: { message: 'Tarjeta no encontrada' } };
  }

  await checkoutRepository.deleteCard(idTarjeta);

  return { status: 200, body: { message: 'Tarjeta eliminada con éxito' } };
};

module.exports = { saveCard, removeCard };
