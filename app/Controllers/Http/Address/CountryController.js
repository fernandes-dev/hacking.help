const Country = use('App/Models/Address/Country');

class CountryController {
  async index({ auth }) {
    try {
      await auth.check();

      const countries = await Country.all();

      return countries;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only(['name']);

      const country = await Country.create(data);

      return country;
    } catch (error) {
      return error;
    }
  }

  async show({ params, auth }) {
    try {
      await auth.check();

      const country = await Country.findOrFail(params.id);

      return country;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const country = await Country.findOrFail(params.id);

      const data = request.only(['name']);

      country.merge(data);

      await country.save();

      return country;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const country = await Country.findOrFail(params.id);

      await country.delete();

      return { message: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = CountryController;
