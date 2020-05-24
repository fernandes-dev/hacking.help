/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductSchema extends Schema {
  up() {
    this.table('products', table => {
      table.renameColumn('subcategory_id', 'prod_subcategory_id');
    });
  }

  down() {
    this.table('products', table => {
      table.renameColumn('prod_subcategory_id', 'subcategory_id');
    });
  }
}

module.exports = ProductSchema;
