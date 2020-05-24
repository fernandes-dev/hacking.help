const FavoriteProd = use('App/Models/Product/FavoriteProd');

class FavoriteProdController {
  async index({ auth }) {
    try {
      await auth.check();

      const favorites = await FavoriteProd.all();

      return favorites;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only(['user_id', 'product_id']);

      const favorite = await FavoriteProd.create(data);

      return {
        success: 'Produto adicionado aos favoritos com sucesso',
        favorite,
      };
    } catch (error) {
      return error;
    }
  }

  async show({ params, auth }) {
    try {
      await auth.check();

      const favorite = await FavoriteProd.findOrFail(params.id);

      return favorite;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const favorite = await FavoriteProd.findOrFail(params.id);

      const data = request.only(['user_id', 'product_id']);

      favorite.merge(data);

      await favorite.save();

      return favorite;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const favorite = await FavoriteProd.findOrFail(params.id);

      await favorite.delete();

      return { success: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = FavoriteProdController;
