/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CompanyConfigSchema extends Schema {
  up() {
    this.create('company_configs', table => {
      table.increments();
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.time('open_time').notNullable();
      table.time('close_time').notNullable();
      table.enu('status', ['Aberto', 'Fechado']).defaultTo('Aberto');
      table.timestamps();
    });
  }

  down() {
    this.drop('company_configs');
  }
}

module.exports = CompanyConfigSchema;
