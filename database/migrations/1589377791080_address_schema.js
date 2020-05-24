/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddressSchema extends Schema {
  up() {
    this.table('addresses', table => {
      table.dropColumn('latitude');
      table.dropColumn('longitude');
    });
  }

  down() {
    this.table('addresses', table => {
      table.string('latitude').notNullable();
      table.string('longitude').notNullable();
    });
  }
}

module.exports = AddressSchema;
