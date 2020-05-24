/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProdType extends Schema {
  up() {
    this.create('prod_types', table => {
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
    this.drop('prod_types');
  }
}

module.exports = ProdType;
