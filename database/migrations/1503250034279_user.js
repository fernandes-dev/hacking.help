/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments();
      table.string('name').notNullable();
      table.enu('type', ['Física', 'Jurídica']).defaultTo('Física');
      table.string('company_name');
      table.string('document').unique();
      table.string('state_registration').unique();
      table
        .enu('class', ['Cliente', 'Fornecedor', 'Funcionário'])
        .defaultTo('Cliente');
      table
        .string('email')
        .notNullable()
        .unique();
      table.string('password').notNullable();
      table
        .string('phone')
        .unique()
        .notNullable();
      table.date('birthday').notNullable();
      table.enu('simple_national', ['S', 'N']).defaultTo('N');
      table.enu('status', ['Ativo', 'Inativo']).defaultTo('Ativo');
      table.enu('adm', ['S', 'N']).defaultTo('N');
      // table.string("code_phone"); // código enviado por sms
      table.string('obs'); // observações
      table.string('latitude').notNullable();
      table.string('longitude').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
