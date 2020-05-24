// const { test, trait } = use("Test/Suite")("Sale");

// /** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

// /** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use("Factory");

// trait("Test/ApiClient");
// //trait("DatabaseTransactions");

// test("it shoould return success when selling", async ({ assert, client }) => {
//   const payment = {
//     name: "Cartão de Crédito"
//   };

//   const saleType = {
//     name: "Entrega"
//   };

//   const saleStatus = {
//     name: "Preparando"
//   };

//   const sale = {
//     user_client_id: 1,
//     user_seller_id: 1,
//     total: 450,
//     subtotal: 450,
//     qtd_parcels: 1,
//     input_value: 450,
//     payment_id: 1,
//     sale_type_id: 1,
//     sale_status_id: 1,
//     change: 10,
//     change_for: 460
//   };

//   saleItem = {
//     product_id: 1,
//     product_qtd: 10,
//     sale_id: 1,
//     total: 120,
//     subtotal: 120,
//     sale_type_id: 1,
//     sale_item_status_id: 1,
//     user_seller_id: 1
//   };

//   const resp1 = await client
//     .post("/payment")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(payment)
//     .end();

//   const resp2 = await client
//     .post("/saleType")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(saleType)
//     .end();

//   const resp3 = await client
//     .post("/saleStatus")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(saleStatus)
//     .end();

//   const resp4 = await client
//     .post("/sale")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(sale)
//     .end();

//   const resp5 = await client
//     .post("/saleItem")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(saleItem)
//     .end();

//   // console.log(resp5);
//   resp1.assertStatus(200);
//   resp2.assertStatus(200);
//   resp3.assertStatus(200);
//   resp4.assertStatus(200);
//   resp5.assertStatus(200);
// });
