const Route = use('Route');

// Login
Route.post('/session', '/User/UserSessionController.create').validator(
  'UserSession'
);
Route.post('/admin-session', '/User/AdminSessionController.create').validator(
  'UserSession'
);

// Usuário painel administrativo
Route.resource('user-cpanel', '/User/UserController').validator(
  new Map([[['user.store'], ['UserRegisterCpanel']]])
);

// Usuário página de pedidos
Route.resource('user', '/User/UserController').validator(
  new Map([[['user.store'], ['UserRegister']]])
);

// meu perfil
Route.get('/my-profille', '/User/UserController.getProfille');
Route.post(
  '/verify-email',
  '/User/UserSessionController.verifyEmail'
).validator('EmailValidate');

// Envio de Sms
Route.post('/sms-verify', '/User/SmsCodeController.verifyCode');
Route.resource('sms', '/User/SmsCodeController').validator(
  new Map([[['sms.store'], ['Phone']]])
);

// tudo relacionado a endereço
Route.resource('address', '/Address/AddressController').apiOnly();
Route.resource('city', '/Address/CityController').apiOnly();
Route.resource('state', '/Address/StateController').apiOnly();
Route.resource('district', '/Address/DistrictController').apiOnly();

// produtos
Route.resource('prod-category', '/Product/ProdCategoryController').apiOnly();
Route.resource(
  'prod-subcategory',
  '/Product/ProdSubcategoryController'
).apiOnly();
Route.resource('prod-type', '/Product/ProdTypeController').apiOnly();
Route.resource('prod-unity', '/Product/ProdUnityController').apiOnly();
Route.resource('product', '/Product/ProductController').apiOnly();

// venda
Route.resource('sale', '/Sale/SaleController').apiOnly();
Route.resource('sale-item', '/Sale/SaleItemController').apiOnly();
Route.resource('sale-type', '/Sale/SaleTypeController').apiOnly();
Route.resource('sale-status', '/Sale/SaleStatusController').apiOnly();
Route.resource('payment', '/Sale/PaymentController').apiOnly();

// esqueci minha senha
Route.resource('forgot', '/User/ForgotPasswordController')
  .validator('ForgotPassword')
  .apiOnly();
Route.resource('reset', '/User/ResetPasswordController')
  .validator('ResetPassword')
  .apiOnly();

// empresa
Route.resource(
  'company-category',
  '/Company/CompanyCategoryController'
).apiOnly();

Route.resource('company', '/Company/CompanyController').apiOnly();
Route.resource('rating', '/Company/CompanyRatingController').apiOnly();
Route.resource('company-config', '/Company/CompanyConfigController').apiOnly();
Route.resource('delivery-fee', '/Company/DeliveryFeeController').apiOnly();

// localização geográfica
Route.post('/cep', '/Address/LocalizationController.getAddressByCEP');
Route.post('/coord', '/Address/LocalizationController.getAddressByCoord');
