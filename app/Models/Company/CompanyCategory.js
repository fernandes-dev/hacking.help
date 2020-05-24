/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class CompanyCategory extends Model {
  companiesPrimary() {
    return this.hasMany(
      'App/Models/Company/Company',
      'id',
      'primary_category_id'
    );
  }

  companiesSecondary() {
    return this.hasMany(
      'App/Models/Company/Company',
      'id',
      'secondary_category_id'
    );
  }

  companiesTertiary() {
    return this.hasMany(
      'App/Models/Company/Company',
      'id',
      'tertiary_category_id'
    );
  }
}

module.exports = CompanyCategory;
