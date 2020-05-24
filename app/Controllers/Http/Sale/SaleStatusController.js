const SaleStatus = use('App/Models/Sale/SaleStatus');

class SaleStatusController {
  async index({ auth, response }) {
    try {
      await auth.check();
      const saleStatus = await SaleStatus.all();

      return saleStatus;
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Erro, faça login novamente', error });
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only(['name']);

      const saleStatus = await SaleStatus.create(data);

      return { success: 'Status adicionado com sucesso', saleStatus };
    } catch (error) {
      return error;
    }
  }

  async show({ params, auth }) {
    try {
      await auth.check();

      const saleStatus = await SaleStatus.findOrFail(params.id);

      return saleStatus;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const saleStatus = await SaleStatus.findOrFail(params.id);

      const data = request.only(['name']);

      saleStatus.merge(data);

      await saleStatus.save();

      return saleStatus;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const saleStatus = await SaleStatus.findOrFail(params.id);

      await saleStatus.delete();

      return { success: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = SaleStatusController;
