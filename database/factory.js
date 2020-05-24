/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User/User', (faker, i, data = {}) => {
  return {
    name: faker.string(),
    type: 'Física',
    document: faker.cpf(),
    email: faker.email(),
    password: faker.string(),
    phone: faker.phone(),
    birthday: '1999-05-10',
    ...data,
  };
});

Factory.blueprint('App/Models/Token', (faker, i, data = {}) => {
  return {
    type: data.type || 'refreshtoken',
    token: faker.string({ length: 20 }),
    ...data,
  };
});
