/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CompanyRatingSchema extends Schema {
  up() {
    this.create('company_ratings', table => {
      table.increments();
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('description');
      table.integer('note').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('company_ratings');
  }
}

module.exports = CompanyRatingSchema;
