/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SaleStatusSchema extends Schema {
  up() {
    this.table('sale_statuses', table => {
      table.dropForeign('company_id');
      table.dropColumn('company_id');
    });
  }

  down() {
    this.table('sale_statuses', table => {
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
  }
}

module.exports = SaleStatusSchema;
