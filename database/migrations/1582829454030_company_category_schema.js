/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CompanyCategorySchema extends Schema {
  up() {
    this.create('company_categories', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('img');
      table.string('description').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('company_categories');
  }
}

module.exports = CompanyCategorySchema;
