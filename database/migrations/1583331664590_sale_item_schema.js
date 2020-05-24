/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SaleItemSchema extends Schema {
  up() {
    this.create('sale_items', table => {
      table.increments();
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.integer('product_qtd').notNullable();
      table
        .integer('sale_id')
        .unsigned()
        .references('id')
        .inTable('sales')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.decimal('total', 10, 2).notNullable();
      table.decimal('subtotal', 10, 2).notNullable();
      table.decimal('total_discount', 10, 2);
      table.decimal('total_commission', 10, 2);
      table.decimal('total_interest', 10, 2);
      table
        .integer('sale_type_id')
        .unsigned()
        .references('id')
        .inTable('sale_types')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('sale_item_status_id')
        .unsigned()
        .references('id')
        .inTable('sale_statuses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('user_who_changed_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('user_seller_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('user_client_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('sale_items');
  }
}

module.exports = SaleItemSchema;
