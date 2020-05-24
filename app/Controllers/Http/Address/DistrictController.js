const District = use('App/Models/Address/District');

class DistrictController {
  async index() {
    try {
      const districts = await District.all();

      return districts;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only(['name', 'city_id']);

      const district = await District.create(data);

      return { success: 'Bairro cadastrado com sucesso', district };
    } catch (error) {
      return error;
    }
  }

  async show({ params }) {
    try {
      const district = await District.findOrFail(params.id);

      return district;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const district = await District.findOrFail(params.id);

      const data = request.only(['name', 'city_id']);

      district.merge(data);

      await district.save();

      return district;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const district = await District.findOrFail(params.id);

      await district.delete();

      return { success: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = DistrictController;
