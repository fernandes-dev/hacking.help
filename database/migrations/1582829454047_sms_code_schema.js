/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SmsCodeSchema extends Schema {
  up() {
    this.create('sms_codes', table => {
      table.increments();
      table.string('code').notNullable();
      table.string('phone').notNullable();
      table
        .enu('status', ['Pendente', 'Confirmado', 'Cancelado'])
        .defaultTo('Pendente');
      table.timestamps();
    });
  }

  down() {
    this.drop('sms_codes');
  }
}

module.exports = SmsCodeSchema;
