/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Address extends Model {
  user() {
    return this.belongsTo('App/Models/User/User');
  }

  city() {
    return this.hasOne('App/Models/Address/City', 'id', 'id');
  }

  state() {
    return this.hasOne('App/Models/Address/State', 'id', 'id');
  }

  district() {
    return this.hasOne('App/Models/Address/District', 'id', 'id');
  }
}

module.exports = Address;
