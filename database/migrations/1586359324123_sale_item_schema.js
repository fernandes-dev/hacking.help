/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SaleItemSchema extends Schema {
  up() {
    this.table('sale_items', table => {
      table.string('comment').after('company_id');
      table
        .integer('parent_item_id')
        .unsigned()
        .references('id')
        .inTable('sale_items')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .after('comment');
    });
  }

  down() {
    this.table('sale_items', table => {
      table.dropColumn('comment');
      table.dropForeign('parent_item_id');
      table.dropColumn('parent_item_id');
    });
  }
}

module.exports = SaleItemSchema;
