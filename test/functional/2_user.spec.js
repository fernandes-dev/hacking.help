const { test, trait } = use('Test/Suite')('User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should return JWT token when created session', async ({
  assert,
  client,
}) => {
  const sessionPayload = {
    email: 'eduardo.yugan@gmail.com',
    password: '0000',
  };

  await Factory.model('App/Models/User/User').create(sessionPayload);

  const response = await client
    .post('/session')
    .send(sessionPayload)
    .end();
  console.log(response);
  response.assertStatus(200);
  assert.exists(response.body.token);
});
