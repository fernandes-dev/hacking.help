const City = use('App/Models/Address/City');

class CityController {
  async index() {
    try {
      const cities = await City.query()
        .with('districts')
        .fetch();

      return cities;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only(['name', 'state_id']);

      const city = await City.create(data);

      return { success: 'Cidade cadastrada com sucesso', city };
    } catch (error) {
      return error;
    }
  }

  async show({ params }) {
    try {
      const city = await City.query()
        .with('districts')
        .where('id', params.id)
        .fetch();

      return city;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const city = await City.findOrFail(params.id);

      const data = request.only(['name', 'state_id']);

      city.merge(data);

      await city.save();

      return city;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const city = await City.findOrFail(params.id);

      await city.delete();
    } catch (error) {
      return error;
    }
  }
}

module.exports = CityController;
