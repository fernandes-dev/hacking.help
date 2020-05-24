/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Company extends Model {
  products() {
    return this.hasMany('App/Models/Product/Product');
  }

  user() {
    return this.belongsTo('App/Models/User/User', 'id', 'owner_id');
  }

  deliveryFee() {
    return this.hasMany('App/Models/Company/DeliveryFee');
  }

  config() {
    return this.hasMany('App/Models/Company/CompanyConfig');
  }

  ratings() {
    return this.hasMany('App/Models/Company/CompanyRating');
  }

  prodCategories() {
    return this.hasMany('App/Models/Product/ProdCategory');
  }

  prodSubCategories() {
    return this.hasMany('App/Models/Product/ProdSubategory');
  }
}

module.exports = Company;
