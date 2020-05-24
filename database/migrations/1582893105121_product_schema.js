/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductSchema extends Schema {
  up() {
    this.create('products', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('description').notNullable();
      table
        .integer('prod_category_id')
        .unsigned()
        .references('id')
        .inTable('prod_categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('subcategory_id')
        .unsigned()
        .references('id')
        .inTable('prod_subcategories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('unity_sale_id')
        .unsigned()
        .references('id')
        .inTable('prod_unities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('qtd_stock');
      table.integer('min_stock');
      table.decimal('cost', 10, 2);
      table.string('code_bar');
      table.decimal('sale_value', 10, 2).defaultTo(0);
      table.integer('profit');
      table.decimal('promo_value', 10, 2);
      table.date('promo_expires');
      table.string('ncm');
      table.string('img');
      table.string('name_tag');
      table.integer('stock_fiscal');
      table
        .integer('type') // tem q trocar pra type_id
        .unsigned()
        .references('id')
        .inTable('prod_types')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('stock_attacked');
      table.integer('stock_min_attacked');
      table.decimal('cost_attacked', 10, 2);
      table.integer('profit_attacked');
      table.decimal('sale_value_attacked', 10, 2);
      table
        .integer('unity_buy_id')
        .unsigned()
        .references('id')
        .inTable('prod_unities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('width');
      table.integer('height');
      table.integer('weight');
      table.string('code_bar_box');
      table.enu('print_token', ['S', 'N']).defaultTo('N');
      table
        .enu('status_availability', ['Disponível', 'Indisponível'])
        .defaultTo('Disponível');
      table.string('color');
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.enu('status', ['Ativo', 'Inativo']).defaultTo('Ativo');
      table
        .integer('parent_product')
        .unsigned()
        .references('id')
        .inTable('products');
      table.enu('mount', ['S', 'N']).defaultTo('N');
      table.timestamps();
    });
  }

  down() {
    this.drop('products');
  }
}

module.exports = ProductSchema;
