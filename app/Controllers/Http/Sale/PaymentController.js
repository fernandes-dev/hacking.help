const Payment = use('App/Models/Sale/Payment');

class PaymentController {
  async index() {
    try {
      const payments = await Payment.all();

      return payments;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only(['name']);

      const payment = await Payment.create(data);

      return { success: 'Forma de pagamento adicionada com sucesso', payment };
    } catch (error) {
      return error;
    }
  }

  async show({ params }) {
    try {
      const payment = await Payment.findOrFail(params.id);

      return payment;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const payment = await Payment.findOrFail(params.id);

      const data = request.only(['name']);

      payment.merge(data);

      await payment.save();

      return payment;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const payment = await Payment.findOrFail(params.id);

      await payment.delete();

      return { success: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = PaymentController;
