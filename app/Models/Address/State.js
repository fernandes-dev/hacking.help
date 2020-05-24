/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class State extends Model {
  cities() {
    return this.hasMany('App/Models/Address/City');
  }

  address() {
    return this.belongsToMany('App/Models/Address');
  }

  country() {
    return this.belongsTo('App/Models/Address/Country');
  }
}

module.exports = State;
