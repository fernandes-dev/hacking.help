const Subcategory = use('App/Models/Product/ProdSubcategory');

class ProdSubcategoryController {
  async index() {
    try {
      const subcategories = await Subcategory.all();

      return subcategories;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only([
        'name',
        'category_id',
        'company_id',
        'limit',
        'mandatory',
      ]);

      const subcategory = await Subcategory.create(data);

      return {
        success: 'Subcategoria de produto adicionada com sucesso',
        subcategory,
      };
    } catch (error) {
      return error;
    }
  }

  async show({ params }) {
    try {
      const subcategory = await Subcategory.findOrFail(params.id);

      return subcategory;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const subcategory = await Subcategory.findOrFail(params.id);

      const data = request.only([
        'name',
        'category_id',
        'company_id',
        'limit',
        'mandatory',
      ]);

      subcategory.merge(data);

      await subcategory.save();

      return subcategory;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const subcategory = await Subcategory.findOrFail(params.id);

      await subcategory.delete();

      return { success: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = ProdSubcategoryController;
