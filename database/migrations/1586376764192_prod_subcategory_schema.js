/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProdSubcategorySchema extends Schema {
  up() {
    this.table('prod_subcategories', table => {
      table
        .integer('order')
        .defaultTo(1)
        .after('mandatory');
    });
  }

  down() {
    this.table('prod_subcategories', table => {
      table.dropColumn('order');
    });
  }
}

module.exports = ProdSubcategorySchema;
