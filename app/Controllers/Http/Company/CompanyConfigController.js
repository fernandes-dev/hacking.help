const Config = use('App/Models/Company/CompanyConfig');

class CompanyConfigController {
  async index({ auth }) {
    try {
      await auth.check();

      const configs = await Config.all();

      return configs;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only([
        'company_id',
        'open_time',
        'close_time',
        'status',
      ]);

      const config = await Config.create(data);

      return config;
    } catch (error) {
      return error;
    }
  }

  async show({ params }) {
    try {
      const config = await Config.findOrFail(params.id);

      return config;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const config = await Config.findOrFail(params.id);

      const data = request.only([
        'company_id',
        'open_time',
        'close_time',
        'status',
      ]);

      config.merge(data);

      await config.save();

      return config;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const config = Config.findOrFail(params.id);

      await config.delete();

      return { success: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = CompanyConfigController;
