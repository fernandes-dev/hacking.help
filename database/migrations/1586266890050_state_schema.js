/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class StateSchema extends Schema {
  up() {
    this.alter('states', table => {
      table
        .integer('country_id')
        .unsigned()
        .references('id')
        .inTable('countries')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
  }

  down() {
    this.alter('states', table => {
      table.dropForeign('country_id');
      table.dropColumn('country_id');
    });
  }
}

module.exports = StateSchema;
