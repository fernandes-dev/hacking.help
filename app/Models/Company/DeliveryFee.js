/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class DeliveryFee extends Model {
  company() {
    this.belongsTo('App/Models/Company/Company');
  }
}

module.exports = DeliveryFee;
