const ProdUnity = use('App/Models/Product/ProdUnity');

class ProdUnityController {
  async index() {
    try {
      const produnits = await ProdUnity.all();

      return produnits;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only(['name', 'description']);

      const produnity = await ProdUnity.create(data);

      return { success: 'Cadastrado com sucesso', produnity };
    } catch (error) {
      return error;
    }
  }

  async show({ params }) {
    try {
      const produnity = await ProdUnity.findOrFail(params.id);

      return produnity;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const produnity = await ProdUnity.findOrFail(params.id);

      const data = request.only(['name', 'description']);

      produnity.merge(data);

      await produnity.save();

      return produnity;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const produnity = await ProdUnity.findOrFail(params.id);

      await produnity.delete();

      return { message: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = ProdUnityController;
