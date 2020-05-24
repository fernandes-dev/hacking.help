/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class FavoriteProd extends Model {
  product() {
    return this.hasOne('App/Models/Product/Product');
  }

  user() {
    return this.belongsTo('App/Models/User/User');
  }
}

module.exports = FavoriteProd;
