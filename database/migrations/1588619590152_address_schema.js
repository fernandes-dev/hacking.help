/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddressSchema extends Schema {
  up() {
    this.table('addresses', table => {
      table.string('number').notNullable();
    });
  }

  down() {
    this.table('addresses', table => {
      table.dropColumn('number');
    });
  }
}

module.exports = AddressSchema;
