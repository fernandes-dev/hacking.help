const Sale = use('App/Models/Sale/Sale');
const SaleItem = use('App/Models/Sale/SaleItem');

class SaleController {
  async index({ auth }) {
    try {
      await auth.check();

      const sales = await Sale.all();

      return sales;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth }) {
    try {
      await auth.check();

      const data = request.only([
        'user_client_id',
        'user_seller_id',
        'total',
        'subtotal',
        'total_discount',
        'total_interest',
        'qtd_parcels',
        'pc_discount',
        'pc_interest',
        'input_value',
        'payment_id',
        'total_commission',
        'cupom',
        'sale_type_id',
        'sale_status_id',
        'user_who_changed_id',
        'change',
        'change_for',
        'company_id',
        'credit',
      ]);

      const sale = await Sale.create(data);

      return { success: 'Venda realizada com sucesso', sale };
    } catch (error) {
      return error;
    }
  }

  async show({ params, auth }) {
    try {
      await auth.check();

      const saleItems = await SaleItem.query()
        .with('product')
        .with('childItem.product')
        .where('sale_id', params.id)
        .where('parent_item_id', null)
        .fetch();

      return saleItems;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const sale = await Sale.findOrFail(params.id);

      const data = request.only([
        'user_client_id',
        'user_seller_id',
        'total',
        'subtotal',
        'total_discount',
        'total_interest',
        'qtd_parcels',
        'pc_discount',
        'pc_interest',
        'input_value',
        'payment_id',
        'total_commission',
        'cupom',
        'sale_type_id',
        'sale_status_id',
        'sale_statuses',
        'user_who_changed_id',
        'change',
        'change_for',
        'credit',
      ]);

      sale.merge(data);

      await sale.save();

      return sale;
    } catch (error) {
      return error;
    }
  }

  async cancel({ request, params, auth }) {
    try {
      await auth.check();

      const sale = await Sale.findOrFail(params.id);

      const data = request.only(['sale_status_id']);

      sale.merge(data);

      await sale.save();

      return { success: 'Cancelado com sucesso' };
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const sale = await Sale.findOrFail(params.id);

      await sale.delete();

      return { success: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = SaleController;
