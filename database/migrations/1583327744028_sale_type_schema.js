/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SaleTypeSchema extends Schema {
  up() {
    this.create('sale_types', table => {
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
    this.drop('sale_types');
  }
}

module.exports = SaleTypeSchema;
