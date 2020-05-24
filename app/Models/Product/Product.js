/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  user() {
    return this.belongsTo('App/Models/User/User');
  }

  category() {
    return this.belongsTo('App/Models/Product/ProdCategory');
  }

  subcategory() {
    return this.belongsTo('App/Models/Product/ProdSubcategory');
  }

  unity() {
    return this.belongsTo('App/Models/Product/ProdUnity');
  }

  type() {
    return this.belongsTo('App/Models/Product/ProdType');
  }

  parentProduct() {
    return this.belongsTo('App/Models/Product/Product');
  }

  childProduct() {
    return this.hasMany('App/Models/Product/Product', 'id', 'parent_product');
  }
}

module.exports = Product;
