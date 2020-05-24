const Category = use('App/Models/Product/ProdCategory');

class ProdCategoryController {
  async index() {
    try {
      const categories = await Category.query()
        .with('subcategories')
        .fetch();

      return categories;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only(['name', 'company_id', 'limit', 'mandatory']);

      const category = await Category.create(data);

      return {
        success: 'Categoria de produto adicionada com sucesso',
        category,
      };
    } catch (error) {
      return error;
    }
  }

  async show({ params }) {
    try {
      const category = await Category.findOrFail(params.id);

      return category;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const category = await Category.findOrFail(params.id);

      const data = request.only(['name']);

      category.merge(data);

      await category.save();

      return category;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const category = await Category.findOrFail(params.id);

      await category.delete();

      return { message: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = ProdCategoryController;
