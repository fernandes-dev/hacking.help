/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ProdSubcategory extends Model {
  user() {
    return this.belongsTo('App/Models/User/User');
  }

  category() {
    return this.belongsTo('App/Models/Product/ProdCategory');
  }

  products() {
    return this.hasMany('App/Models/Product/Product');
  }
}

module.exports = ProdSubcategory;
