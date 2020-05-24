/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ProdUnity extends Model {
  products() {
    return this.hasMany('App/Models/Product/Product');
  }
}

module.exports = ProdUnity;
