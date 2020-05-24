/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Payment extends Model {
  sales() {
    return this.belongsToMany('App/Models/Sale/Sale');
  }
}

module.exports = Payment;
