const SaleItem = use('App/Models/Sale/SaleItem');
const SaleStatus = use('App/Models/Sale/SaleStatus');
const Sale = use('App/Models/Sale/Sale');
const User = use('App/Models/User/User');

class SaleItemController {
  async index({ auth }) {
    try {
      await auth.check();

      const saleItens = await SaleItem.all();

      return saleItens;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth, response }) {
    try {
      const user = await auth.getUser();

      const data = request.only([
        'product_id',
        'product_qtd',
        'total',
        'subtotal',
        'total_discount',
        'total_commission',
        'total_interest',
        'sale_type_id',
        'user_who_changed_id',
        'user_seller_id',
        'user_id',
        'comment',
      ]);

      data.user_client_id = user.id;

      const saleStatus = await SaleStatus.findByOrFail({ name: 'Pendente' });

      const sale = await Sale.query()
        .where('user_client_id', user.id)
        .where('sale_status_id', saleStatus.id)
        .fetch();

      const saleJSON = sale.toJSON();

      data.user_id =
        typeof data.user_id === 'number'
          ? data.user_id
          : parseInt(data.user_id, 10);

      if (saleJSON.length > 0 && saleJSON[0].user_id !== data.user_id)
        return response.status(400).send({
          message: 'Você não pode adicionar itens de vendedores diferentes',
        });

      if (saleJSON.length === 0) {
        const newSale = await Sale.create({
          user_client_id: user.id,
          user_seller_id: data.user_seller_id,
          sale_status_id: saleStatus.id,
          qtd_parcels: 1,
          user_id: data.user_id,
        });

        data.sale_id = newSale.id;
      } else if (saleJSON.length > 1) {
        return {
          error: 'Falha no sistema, contate o suporte imediatamente',
          msg:
            'Notamos que existem dois pedidos seus com status "Pendente", entre em contato com o suporte para informar o ocorrido',
          pedidos: saleJSON,
        };
      } else {
        data.sale_id = saleJSON[0].id;
      }

      const saleItem = await SaleItem.create(data);

      const { childs } = request.only(['childs']);

      if (childs) {
        childs.forEach(child => {
          child.user_client_id = user.id;
          child.sale_id = data.sale_id;
          child.parent_item_id = saleItem.id;
          if (child.product_name) delete child.product_name;
        });

        await SaleItem.createMany(childs);
      }

      const userSeller = await User.findOrFail(data.user_id);

      return {
        saller: { id: userSeller.id, name: userSeller.name },
        sale: data.sale_id,
      };
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Erro ao adicionar item, fale com o suporte', error });
    }
  }

  async show({ params, auth }) {
    try {
      await auth.check();

      const saleItem = await SaleItem.findOrFail(params.id);

      return saleItem;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth }) {
    try {
      await auth.check();

      const saleItem = await SaleItem.findOrFail(params.id);

      const data = request.only([
        'product_id',
        'product_qtd',
        'sale_id',
        'total',
        'subtotal',
        'total_discount',
        'total_commission',
        'total_interest',
        'sale_type_id',
        'sale_status_id',
        'user_who_changed_id',
        'user_seller_id',
        'comment',
      ]);

      saleItem.merge(data);

      await saleItem.save();

      return saleItem;
    } catch (error) {
      return error;
    }
  }

  async cancel({ request, params, auth }) {
    try {
      await auth.check();

      const saleItem = await SaleItem.findOrFail(params.id);

      const data = request.only(['sale_item_status_id']);

      saleItem.merge(data);

      await saleItem.save();

      return { success: 'Cancelado com sucesso' };
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const saleItem = await SaleItem.findOrFail(params.id);

      await saleItem.delete();

      return { success: 'Deletado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = SaleItemController;
