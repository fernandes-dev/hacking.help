/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TokenSchema extends Schema {
  up() {
    this.create('tokens', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .string('token')
        .notNullable()
        .unique();
      table.string('type').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('tokens');
  }
}

module.exports = TokenSchema;
