/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class SaleStatus extends Model {
  sale() {
    return this.belongsToMany('App/Models/Sale/Sale');
  }
}

module.exports = SaleStatus;
