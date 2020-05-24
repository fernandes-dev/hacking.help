/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.table('users', table => {
      table.dropColumn('latitude');
      table.dropColumn('longitude');
    });
  }

  down() {
    this.table('users', table => {
      table.string('latitude').notNullable();
      table.string('longitude').notNullable();
    });
  }
}

module.exports = UserSchema;
