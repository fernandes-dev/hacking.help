/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class SaleType extends Model {
  sale() {
    return this.belongsToMany('App/Models/Sale/Sale');
  }
}

module.exports = SaleType;
