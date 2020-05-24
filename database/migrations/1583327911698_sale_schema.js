/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SaleSchema extends Schema {
  up() {
    this.create('sales', table => {
      table.increments();
      table
        .integer('user_client_id')
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
      table.decimal('total', 10, 2);
      table.decimal('subtotal', 10, 2);
      table.decimal('total_discount', 10, 2);
      table.decimal('total_interest', 10, 2);
      table.integer('qtd_parcels').notNullable();
      table.integer('pc_discount');
      table.integer('pc_interest');
      table.decimal('input_value', 10, 2);
      table
        .integer('payment_id')
        .unsigned()
        .references('id')
        .inTable('payments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('obs');
      table.decimal('total_commission', 10, 2);
      table.string('cupom');
      table
        .integer('sale_type_id')
        .unsigned()
        .references('id')
        .inTable('sale_types')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('sale_status_id')
        .unsigned()
        .references('id')
        .inTable('sale_statuses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('user_who_changed_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.decimal('change', 10, 2);
      table.decimal('change_for', 10, 2);
      table.decimal('credit', 10, 2);
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
    this.drop('sales');
  }
}

module.exports = SaleSchema;
