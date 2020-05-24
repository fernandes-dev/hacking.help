const CompanyCategory = use('App/Models/Company/CompanyCategory');

class CompanyCategoryController {
  async index() {
    try {
      const companies = await CompanyCategory.query()
        .with('companiesPrimary.deliveryFee')
        .with('companiesSecondary.deliveryFee')
        .with('companiesTertiary.deliveryFee')
        .fetch();

      return companies;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth, response }) {
    try {
      await auth.check();

      const data = request.only(['name', 'img', 'description']);

      const companyCategory = await CompanyCategory.create(data);

      return companyCategory;
    } catch (error) {
      return response.status(400).send({
        message: 'Erro ao cadastrar categoria, faça login novamente',
        error,
      });
    }
  }

  async show({ params, response }) {
    try {
      const companyCategory = await CompanyCategory.query()
        .with('companiesPrimary')
        .with('companiesSecondary')
        .with('companiesTertiary')
        .where('id', params.id)
        .fetch();

      return companyCategory;
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Erro ao consultar dados', error });
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const companyCategory = await CompanyCategory.findOrFail(params.id);

      const data = request.only(['name', 'img', 'description']);

      companyCategory.merge(data);

      await companyCategory.save();

      return companyCategory;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const companyCategory = await CompanyCategory.findOrFail(params.id);

      await companyCategory.delete();
    } catch (error) {
      return error;
    }
  }
}

module.exports = CompanyCategoryController;
