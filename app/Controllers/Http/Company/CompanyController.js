const Company = use('App/Models/Company/Company');
const Category = use('App/Models/Product/ProdCategory');

const hidden = [
  'prod_category_id',
  'prod_subcategory_id',
  'created_at',
  'updated_at',
  'unity_sale_id',
  'qtd_stock',
  'min_stock',
  'cost',
  'code_bar',
  'profit',
  'promo_value',
  'promo_expires',
  'ncm',
  'name_tag',
  'stock_fiscal',
  'type',
  'stock_attacked',
  'stock_min_attacked',
  'cost_attacked',
  'profit_attacked',
  'sale_value_attacked',
  'unity_buy_id',
  'width',
  'height',
  'weight',
  'code_bar_box',
  'print_token',
  'color',
  'company_id',
  'status',
  'parent_product',
  'created_at',
  'updated_at',
];

class CompanyController {
  async index() {
    try {
      const company = await Company.query()
        .with('deliveryFee')
        .fetch();

      return company;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only([
        'name',
        'logo',
        'primary_category_id',
        'secondary_category_id',
        'tertiary_category_id',
        'delivery_min_time',
        'delivery_max_time',
        'latitude',
        'longitude',
        'owner_id',
      ]);

      const company = await Company.create(data);

      return company;
    } catch (error) {
      return error;
    }
  }

  async show({ params }) {
    try {
      // await auth.check();

      const company = await Company.query()
        .with('deliveryFee')
        .setHidden(['id', 'owner_id'])
        .where('id', params.id)
        .fetch();

      const products = await Category.query()
        .with('products', builder => {
          builder.setHidden(hidden);
          builder.where('company_id', params.id);
          builder.where('parent_product', null);
        })
        .setHidden(hidden)
        .where('company_id', params.id)
        .fetch();

      return { company, products };
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const company = await Company.findOrFail(params.id);

      const data = request.only([
        'name',
        'logo',
        'primary_category_id',
        'secondary_category_id',
        'tertiary_category_id',
        'delivery_min_time',
        'delivery_max_time',
        'latitude',
        'longitude',
        'owner_id',
      ]);

      company.merge(data);

      await company.save();

      return company;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, response, auth }) {
    try {
      const company = await Company.findOrFail(params.id);
      const companyJSON = await company.toJSON();

      await auth.check();
      const authUser = await auth.getUser();

      if (companyJSON.owner_id !== authUser.id) {
        return response.status(401).send({ error: 'Not authorized' });
      }

      company.merge({ status: 'Inativo' });

      await company.save();

      return company;
    } catch (error) {
      return error;
    }
  }
}

module.exports = CompanyController;
