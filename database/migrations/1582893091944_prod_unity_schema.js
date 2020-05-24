/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProdUnity extends Schema {
  up() {
    this.create('prod_unities', table => {
      table.increments();
      table.string('name').notNullable(); // ex: UN
      table.string('description').notNullable(); // ex: Unidade
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
    this.drop('prod_unities');
  }
}

module.exports = ProdUnity;
