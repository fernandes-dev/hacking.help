/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProdCategory extends Schema {
  up() {
    this.create('prod_categories', table => {
      table.increments();
      table.string('name').notNullable();
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
    this.drop('prod_categories');
  }
}

module.exports = ProdCategory;
