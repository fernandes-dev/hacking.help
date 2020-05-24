// const { test, trait } = use("Test/Suite")("Address");

// /** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

// /** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use("Factory");

// trait("Test/ApiClient");
// //trait("DatabaseTransactions");

// const User = use("App/Models/User/User");

// test("it should return success when add state", async ({ assert, client }) => {
//   const state = {
//     name: "Mato Grosso"
//   };

//   const stateResp = await client
//     .post("/state")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(state)
//     .end();

//   stateResp.assertStatus(200);
//   assert.exists(stateResp.body.success);
// });

// test("it should return success when add city", async ({ assert, client }) => {
//   const city = {
//     name: "Sinop",
//     state_id: 1
//   };

//   const cityResp = await client
//     .post("/city")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(city)
//     .end();

//   cityResp.assertStatus(200);
//   assert.exists(cityResp.body.success);
// });

// test("it should return success when add district", async ({
//   assert,
//   client
// }) => {
//   const district = {
//     name: "Jardim Paraíso",
//     city_id: 1
//   };

//   const districtResp = await client
//     .post("/district")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(district)
//     .end();

//   districtResp.assertStatus(200);
//   assert.exists(districtResp.body.success);
// });

// test("it should return success when add address", async ({ assert, client }) => {
//   const address = {
//     street: "Rua das Petúnias",
//     district_id: 1,
//     city_id: 1,
//     state_id: 1,
//     type: "Residencial",
//     user_id: 1
//   };

//   const addressResp = await client
//     .post("/address")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(address)
//     .end();

//   // console.log(addressResp);
//   addressResp.assertStatus(200);
//   assert.exists(addressResp.body.success);
// });
