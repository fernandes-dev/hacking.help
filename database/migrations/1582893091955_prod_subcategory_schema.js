/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProdSubcategory extends Schema {
  up() {
    this.create('prod_subcategories', table => {
      table.increments();
      table.string('name').notNullable();
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('prod_categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('limit');
      table.enu('mandatory', ['S', 'N']).defaultTo('N');
      table.timestamps();
    });
  }

  down() {
    this.drop('prod_subcategories');
  }
}

module.exports = ProdSubcategory;
