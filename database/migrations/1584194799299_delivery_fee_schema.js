/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DeliveryFeeSchema extends Schema {
  up() {
    this.create('delivery_fees', table => {
      table.increments();
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.decimal('value', 10, 2).notNullable();
      table.float('maximum_distance').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('delivery_fees');
  }
}

module.exports = DeliveryFeeSchema;
