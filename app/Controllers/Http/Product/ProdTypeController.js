const ProdType = use('App/Models/Product/ProdType');

class ProdTypeController {
  async index() {
    try {
      const types = await ProdType.all();

      return types;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only(['name']);

      const type = await ProdType.create(data);

      return { success: 'Tipo de produto adicionado com sucesso', type };
    } catch (error) {
      return error;
    }
  }

  async show({ params }) {
    try {
      const type = await ProdType.findOrFail(params.id);

      return type;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const type = await ProdType.findOrFail(params.id);

      const data = request.only(['name']);

      type.merge(data);

      await type.save();

      return type;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const type = await ProdType.findOrFail(params.id);

      await type.delete();

      return { success: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = ProdTypeController;
