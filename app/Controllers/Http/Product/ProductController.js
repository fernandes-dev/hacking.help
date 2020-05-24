const Product = use('App/Models/Product/Product');
const Category = use('App/Models/Product/ProdCategory');
const Subcategory = use('App/Models/Product/ProdSubcategory');

class ProductController {
  async index({ request }) {
    try {
      const parent = request.only(['parent_id']);
      const user = request.only(['user_id']);

      if (parent.parent_id) {
        const childs = await Subcategory.query()
          .with('products', builder => {
            builder.where('parent_product', parent.parent_id);
          })
          .fetch();
        return childs;
      }

      if (user.company_id) {
        const products = await Category.query()
          .with('products', builder => {
            builder.where('user_id', user.company_id);
            builder.where('parent_product', null);
          })
          .where('user_id', user.company_id)
          .fetch();

        return products;
      }

      const products = await Category.query()
        .with('products', builder => {
          builder.where('parent_product', null);
        })
        .fetch();

      return products;
    } catch (error) {
      return error;
    }
  }

  async store({ request, response, auth }) {
    try {
      await auth.check();

      const data = request.only([
        'name',
        'description',
        'prod_category_id',
        'prod_subcategory_id',
        'unity_sale_id',
        'qtd_stock',
        'min_stock',
        'cost',
        'code_bar',
        'sale_value',
        'profit',
        'promo_value',
        'promo_expires',
        'ncm',
        'img',
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
        'status_availability',
        'color',
        'parent_product',
        'user_id',
        'mount',
      ]);

      const product = await Product.create(data);

      return { success: 'Produto cadastrado com sucesso', product };
    } catch (error) {
      return response.status(400).send({
        message: 'Erro ao cadastrar produto, faça login novamente',
        error,
      });
    }
  }

  async show({ params }) {
    try {
      const product = await Product.findOrFail(params.id);

      if (product.parent_product === null) {
        let childs = await Subcategory.query()
          .with('products', builder => {
            builder.where('parent_product', params.id);
            builder.where('status', 'Ativo');
          })
          .fetch();
        childs = childs.toJSON();
        const newChilds = [];
        childs.forEach(child => {
          if (child.products.length > 0) {
            newChilds.push(child);
          }
        });
        return { product, childs: newChilds };
      }

      return product;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const product = await Product.findOrFail(params.id);

      const data = request.only([
        'name',
        'description',
        'prod_category_id',
        'prod_subcategory_id',
        'unity_sale_id',
        'qtd_stock',
        'min_stock',
        'cost',
        'code_bar',
        'sale_value',
        'profit',
        'promo_value',
        'promo_expires',
        'ncm',
        'img',
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
        'status_availability',
        'color',
        'parent_product',
        'user_id',
        'mount',
      ]);

      product.merge(data);

      await product.save();

      return product;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const product = await Product.findOrFail(params.id);

      await product.merge({ status: 'Inativo' });

      return { message: 'Produto inativado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = ProductController;
