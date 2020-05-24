const SaleType = use('App/Models/Sale/SaleType');

class SaleTypeController {
  async index({ auth }) {
    try {
      await auth.check();

      const saleType = await SaleType.all();

      return saleType;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only(['name']);

      const saleType = await SaleType.create(data);

      return { success: 'Tipo de venda adicionado com sucesso', saleType };
    } catch (error) {
      return error;
    }
  }

  async show({ params, auth }) {
    try {
      await auth.check();

      const saleType = await SaleType.findOrFail(params.id);

      return saleType;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const saleType = await SaleType.findOrFail(params.id);

      const data = request.only(['name']);

      saleType.merge(data);

      await saleType.save();

      return saleType;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const saleType = await SaleType.findOrFail(params.id);

      await saleType.delete();

      return { success: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = SaleTypeController;
