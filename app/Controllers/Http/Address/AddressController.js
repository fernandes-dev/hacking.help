const Address = use('App/Models/Address/Address');
const User = use('App/Models/User/User');

class AddressController {
  async index() {
    try {
      const addresses = await Address.all();

      return addresses;
    } catch (error) {
      return error;
    }
  }

  async store({ request, auth, response }) {
    try {
      const { user_id } = request.only(['user_id']);
      const user = await User.findOrFail(user_id);
      const userJSON = await user.toJSON();

      await auth.check();
      const authUser = await auth.getUser();

      if (userJSON.id !== authUser.id) {
        return response
          .status(401)
          .send({ error: 'Not authorized', id: authUser.id });
      }

      const data = request.only([
        'street',
        'number',
        'district',
        'city',
        'state',
        'complement',
        'cep',
        'type',
      ]);

      data.user_id = authUser.id;

      const address = await Address.create(data);

      return { success: 'Endereço cadastrado com sucesso', address };
    } catch (error) {
      return error;
    }
  }

  async show({ params, auth }) {
    try {
      await auth.check();

      const address = await Address.findOrFail(params.id);

      return address;
    } catch (error) {
      return error;
    }
  }

  async update({ params, request, auth, response }) {
    try {
      const user = await auth.getUser();

      const address = await Address.findOrFail(params.id);

      if (address.user_id !== user.id) {
        return response.status(401).send({ message: 'Usuário não autorizado' });
      }

      const data = request.only([
        'street',
        'number',
        'district',
        'city',
        'state',
        'complement',
        'cep',
        'type',
      ]);

      address.merge(data);

      await address.save();

      return address;
    } catch (error) {
      return error;
    }
  }

  async destroy({ params, auth }) {
    try {
      await auth.check();

      const address = await Address.findOrFail(params.id);

      await address.merge({ status: 'Inativo' });

      return { success: 'Endereço inativado com sucesso' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = AddressController;
