/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class CompanyRating extends Model {
  user() {
    return this.belongsTo('App/Models/User/User');
  }

  company() {
    return this.belongsTo('App/Models/Company/Company');
  }
}

module.exports = CompanyRating;
