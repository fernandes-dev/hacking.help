/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  tokens() {
    return this.hasMany('App/Models/User/Token');
  }

  address() {
    return this.hasMany('App/Models/Address/Address');
  }

  favprods() {
    return this.hasMany('App/Models/Product/FavoriteProd');
  }

  companies() {
    return this.hasMany('App/Models/Company/Company');
  }

  ratings() {
    return this.hasMany('App/Models/Company/CompanyRating');
  }
}

module.exports = User;
