/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ProdCategory extends Model {
  company() {
    return this.belongsTo('App/Models/Company/Company');
  }

  subcategories() {
    return this.hasMany(
      'App/Models/Product/ProdSubcategory',
      'id',
      'category_id'
    );
  }

  products() {
    return this.hasMany('App/Models/Product/Product');
  }
}

module.exports = ProdCategory;
