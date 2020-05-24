/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Sale extends Model {
  itens() {
    return this.hasMany('App/Models/Sale/SaleItem');
  }

  client() {
    return this.hasOne('App/Models/User/User');
  }

  seller() {
    return this.hasOne('App/Models/User/User');
  }

  payment() {
    this.hasMany('App/Models/Sale/Payment');
  }

  saleType() {
    return this.hasOne('App/Models/Sale/SaleType');
  }

  saleStatus() {
    return this.hasOne('App/Models/Sale/SaleStatus', 'sale_status_id', 'id');
  }

  userChanged() {
    return this.hasMany('App/Models/User/User');
  }
}

module.exports = Sale;
