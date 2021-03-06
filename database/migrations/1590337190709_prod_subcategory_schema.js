/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProdSubcategorySchema extends Schema {
  up() {
    this.table('prod_subcategories', table => {
      table.dropForeign('company_id');
      table.dropColumn('company_id');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
  }

  down() {
    this.table('prod_subcategories', table => {
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.dropForeign('user_id');
      table.dropColumn('user_id');
    });
  }
}

module.exports = ProdSubcategorySchema;
