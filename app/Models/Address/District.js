/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class District extends Model {
  city() {
    return this.belongsTo('App/Models/Address/City');
  }

  address() {
    return this.belongsToMany('App/Models/Address/Address');
  }
}

module.exports = District;
