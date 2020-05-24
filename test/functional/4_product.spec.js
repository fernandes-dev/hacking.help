// const { test, trait } = use("Test/Suite")("Product");

// /** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

// /** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use("Factory");

// trait("Test/ApiClient");

// test("it should return success when add prod category", async ({
//   assert,
//   client
// }) => {
//   const category = {
//     name: "Bebidas"
//   };

//   const response = await client
//     .post("/prodcategory")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(category)
//     .end();

//   response.assertStatus(200);
// });

// test("it should return success when add prod subcategory", async ({
//   assert,
//   client
// }) => {
//   const subcategory = {
//     name: "Sucos",
//     category_id: 1
//   };

//   const response2 = await client
//     .post("/prodsubcategory")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(subcategory)
//     .end();

//   response2.assertStatus(200);
// });

// test("it should return success when add prod type", async ({
//   assert,
//   client
// }) => {
//   const type = {
//     name: "Mercadoria p/ Revenda"
//   };

//   const response3 = await client
//     .post("/prod_type")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(type)
//     .end();

//   response3.assertStatus(200);
// });

// test("it should return success when add prod unity", async ({
//   assert,
//   client
// }) => {
//   const unity = {
//     name: "L",
//     description: "Litros"
//   };

//   const response4 = await client
//     .post("/prod_unity")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(unity)
//     .end();

//   response4.assertStatus(200);
// });

// test("it should return success when add product", async ({
//   assert,
//   client
// }) => {
//   const product = {
//     name: "Suco de Laranja",
//     category_id: 1,
//     subcategory_id: 1,
//     unity_sale_id: 1,
//     qtd_stock: 200,
//     min_stock: 1,
//     cost: 2.5,
//     code_bar: "5645645644554",
//     sale_value: 5.0,
//     profit: 100,
//     promo_value: 4.5,
//     promo_expires: "29/02/2020",
//     ncm: "",
//     img: "https://imagem.com",
//     name_tag: "Suco de Laranja",
//     stock_fiscal: 0,
//     type: 1,
//     unity_buy_id: 1
//   };

//   const response5 = await client
//     .post("/product")
//     .header("Authorization", process.env.TOKEN_TEST)
//     .send(product)
//     .end();

//   response5.assertStatus(200);
// });
