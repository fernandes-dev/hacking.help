/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.alter('users', table => {
      table.dropUnique('phone')
      table.date('birthday').alter()
    });
  }

  down() {
    this.alter('users', table => {
      table.unique('phone').alter();
      table.date('birthday').notNullable().alter();
    });
  }
}

module.exports = UserSchema;
