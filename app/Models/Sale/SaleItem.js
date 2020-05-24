/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class SaleItem extends Model {
  product() {
    return this.hasOne('App/Models/Product/Product', 'product_id', 'id');
  }

  sale() {
    return this.belongsTo('App/Models/Sale/Sale');
  }

  saleItemType() {
    return this.hasOne('App/Models/Sale/SaleType');
  }

  saleItemStatus() {
    return this.hasOne('App/Models/Sale/SaleStatus');
  }

  userChanged() {
    return this.hasMany('App/Models/User/User');
  }

  seller() {
    return this.hasOne('App/Models/User/User');
  }

  childItem() {
    return this.hasMany('App/Models/Sale/SaleItem', 'id', 'parent_item_id');
  }
}

module.exports = SaleItem;
