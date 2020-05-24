/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PaymentSchema extends Schema {
  up() {
    this.create('payments', table => {
      table.increments();
      table.string('name').notNullable();
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('payments');
  }
}

module.exports = PaymentSchema;
