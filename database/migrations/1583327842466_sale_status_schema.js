/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SaleStatusSchema extends Schema {
  up() {
    this.create('sale_statuses', table => {
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
    this.drop('sale_statuses');
  }
}

module.exports = SaleStatusSchema;
