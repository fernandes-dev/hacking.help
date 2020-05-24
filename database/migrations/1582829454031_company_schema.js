/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CompanySchema extends Schema {
  up() {
    this.create('companies', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('logo').notNullable();
      table
        .integer('primary_category_id')
        .unsigned()
        .references('id')
        .inTable('company_categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('secondary_category_id')
        .unsigned()
        .references('id')
        .inTable('company_categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('tertiary_category_id')
        .unsigned()
        .references('id')
        .inTable('company_categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('delivery_min_time').notNullable();
      table.string('delivery_max_time').notNullable();
      table
        .integer('owner_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.enu('status', ['Ativo', 'Inativo']).defaultTo('Ativo');
      table.string('latitude').notNullable();
      table.string('longitude').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('companies');
  }
}

module.exports = CompanySchema;
