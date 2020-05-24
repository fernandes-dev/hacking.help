const { test, trait } = use('Test/Suite')('SmsSend');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

trait('Test/ApiClient');

test('if the code is being sent', async ({ assert, client }) => {
  const smsPayload = {
    phone: '66999579223',
  };

  const response = await client
    .post('/sms')
    .send(smsPayload)
    .end();

  console.log(response.body);
  response.assertStatus(200);
  assert.exists(response.body.success);
});
