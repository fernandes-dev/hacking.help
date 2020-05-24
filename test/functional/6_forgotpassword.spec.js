const { test, trait } = use('Test/Suite')('Forgot Password');

const { subHours, format } = require('date-fns');

const Mail = use('Mail');
const Hash = use('Hash');
const Database = use('Database');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should send an email with reset password instructions', async ({
  assert,
  client,
}) => {
  Mail.fake();

  const email = 'eduardo.yugan@gmail.com';

  const user = await Factory.model('App/Models/User/User').create({ email });

  await client
    .post('/forgot')
    .send({ email })
    .end();

  const token = await user.tokens().first();

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.to[0].address, email);

  assert.include(token.toJSON(), {
    type: 'forgotpassword',
  });

  Mail.restore();
});

test('it should be able to reset password ', async ({ assert, client }) => {
  const email = 'eduardo.yugan@gmail.com';
  const user = await Factory.model('App/Models/User/User').create({
    email,
  });

  const userToken = await Factory.model('App/Models/Token').make({
    type: 'forgotpassword',
  });

  await user.tokens().save(userToken);

  await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '1234',
      password_confirmation: '1234',
    })
    .end();

  await user.reload();

  const checkPassword = await Hash.verify('1234', user.password);

  assert.isTrue(checkPassword);
});

test('it cannot reset password after 2h of forgot password request', async ({
  client,
}) => {
  const email = 'eduardo.yugan@gmail.com';
  const user = await Factory.model('App/Models/User/User').create({
    email,
  });

  const userToken = await Factory.model('App/Models/Token').make();

  await user.tokens().save(userToken);

  const dateWithSub = format(subHours(new Date(), 5), 'yyyy-MM-dd hh:ii:ss');

  await Database.table('tokens')
    .where('token', userToken.token)
    .update('created_at', dateWithSub);

  await userToken.reload();

  const response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '1234',
      password_confirmation: '1234',
    })
    .end();

  response.assertStatus(400);
});
