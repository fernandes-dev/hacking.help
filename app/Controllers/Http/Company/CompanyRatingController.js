const Rating = use('App/Models/Company/CompanyRating');

class CompanyRatingController {
  async index() {
    try {
      const ratings = await Rating.all();

      return ratings;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only([
        'company_id',
        'user_id',
        'description',
        'note',
      ]);

      const rating = await Rating.create(data);

      return rating;
    } catch (error) {
      return error;
    }
  }

  async show({ params }) {
    try {
      const rating = await Rating.findOrFail(params.id);

      return rating;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const rating = await Rating.findOrFail(params.id);

      await rating.delete();

      return { message: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = CompanyRatingController;
