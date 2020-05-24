/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class City extends Model {
  state() {
    return this.belongsTo('App/Models/Address/State');
  }

  districts() {
    return this.hasMany('App/Models/Address/District');
  }

  address() {
    return this.belongsToMany('App/Models/Address/Address');
  }
}

module.exports = City;
