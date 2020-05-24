/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.table('users', table => {
      table.string('object_id');
    });
  }

  down() {
    this.table('users', table => {
      table.dropColumn('object_id');
    });
  }
}

module.exports = UserSchema;
