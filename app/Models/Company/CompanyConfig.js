/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class CompanyConfig extends Model {
  company() {
    return this.belongsTo('App/Models/Company/Company');
  }
}

module.exports = CompanyConfig;
