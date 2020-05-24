/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ProdSubcategory extends Model {
  company() {
    return this.belongsTo('App/Models/Company/Company');
  }

  category() {
    return this.belongsTo('App/Models/Product/ProdCategory');
  }

  products() {
    return this.hasMany('App/Models/Product/Product');
  }
}

module.exports = ProdSubcategory;
