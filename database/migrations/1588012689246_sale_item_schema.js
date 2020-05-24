/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SaleItemSchema extends Schema {
  up() {
    this.table('sale_items', table => {
      table.dropForeign('sale_item_status_id');
      table.dropColumn('sale_item_status_id');
    });
  }

  down() {
    this.table('sale_items', table => {
      table
        .integer('sale_item_status_id')
        .unsigned()
        .references('id')
        .inTable('sale_statuses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
    });
  }
}

module.exports = SaleItemSchema;
