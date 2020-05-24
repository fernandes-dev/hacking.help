/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FavoriteProdSchema extends Schema {
  up() {
    this.create('favorite_prods', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
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
    this.drop('favorite_prods');
  }
}

module.exports = FavoriteProdSchema;
