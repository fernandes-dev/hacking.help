/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProdCategorySchema extends Schema {
  up() {
    this.table('prod_categories', table => {
      table
        .integer('order')
        .defaultTo(1)
        .after('mandatory');
    });
  }

  down() {
    this.table('prod_categories', table => {
      table.dropColumn('order');
    });
  }
}

module.exports = ProdCategorySchema;
