const DeliveryFee = use('App/Models/Company/DeliveryFee');

class DeliveryFeeController {
  async index() {
    try {
      const deliveryFee = await DeliveryFee.all();

      return deliveryFee;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only(['company_id', 'value', 'maximum_distance']);

      const deliveryFee = await DeliveryFee.create(data);

      return deliveryFee;
    } catch (error) {
      return error;
    }
  }

  async show({ params }) {
    try {
      const deliveryFee = await DeliveryFee.findOrFail(params.id);

      return deliveryFee;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const deliveryFee = await DeliveryFee.findOrFail(params.id);

      const data = request.only(['company_id', 'value', 'maximum_distance']);

      deliveryFee.merge(data);

      await deliveryFee.save();

      return deliveryFee;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const deliveryFee = await DeliveryFee.findOrFail(params.id);

      await deliveryFee.delete();

      return { success: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = DeliveryFeeController;
