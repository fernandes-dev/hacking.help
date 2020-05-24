/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddressSchema extends Schema {
  up() {
    this.table('addresses', table => {
      table
        .string('latitude')
        .defaultTo(0)
        .notNullable();
      table
        .string('longitude')
        .defaultTo(0)
        .notNullable();
    });
  }

  down() {
    this.table('addresses', table => {
      table.dropColumn('latitude');
      table.dropColumn('longitude');
    });
  }
}

module.exports = AddressSchema;
