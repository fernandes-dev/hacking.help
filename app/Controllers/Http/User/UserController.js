const User = use('App/Models/User/User');
const Address = use('App/Models/Address/Address');
const SmsCode = use('App/Models/User/SmsCode');

class UserController {
  async index({ auth, response }) {
    try {
      const user = await auth.getUser();

      const users = await User.query()
        .setHidden(['password'])
        .whereNot('id', user.id)
        .fetch();

      return users;
    } catch (error) {
      return response
        .status(401)
        .send({ message: `erro na async index: ${error}` });
    }
  }

  async store({ request, auth, response }) {
    try {
      const data = request.only([
        'name',
        'type',
        'company_name',
        'document',
        'state_registration',
        'class',
        'email',
        'password',
        'phone',
        'birthday',
        'simple_national',
        'status',
        'adm',
        'obs',
      ]);

      data.phone = data.phone.match(/[0-9]/g).join('');

      const { address } = request.only(['address']);
      const { user_cpanel } = request.only(['user_cpanel']);

      if (!user_cpanel)
        try {
          const { status } = await SmsCode.findByOrFail('phone', data.phone);
          if (status !== 'Confirmado')
            return { fail: 'Por favor, confirme seu telefone', status };
        } catch (error) {
          return response
            .status(400)
            .send({ error, message: 'Telefone inválido', phone: data.phone });
        }

      const user = await User.create(data);

      if (address)
        try {
          address.user_id = user.id;
          const userAddress = await Address.create(address);

          const { token } = await auth.attempt(data.email, data.password);
          user.token = token;

          return {
            success: 'Usuário cadastrado com sucesso',
            user,
            address: userAddress,
          };
        } catch (error) {
          await user.delete();
          return response.status(400).send(error);
        }
      return { success: 'Usuário cadastrado com sucesso', user };
    } catch (error) {
      return response
        .status(400)
        .send({ error, message: 'Erro ao cadastrar usuário' });
    }
  }

  async show({ params, auth }) {
    await auth.check();

    const user = await User.query()
      .with('address')
      .where('id', params.id)
      .fetch();

    return user;
  }

  async getProfille({ auth }) {
    const userAuth = await auth.getUser();

    let user = await User.query()
      .with('address')
      .where('id', userAuth.id)
      .fetch();

    [user] = user.toJSON();

    return user;
  }

  async update({ params, auth, request, response }) {
    const user = await User.findOrFail(params.id);
    const userJSON = await user.toJSON();

    await auth.check();
    const authUser = await auth.getUser();

    if (userJSON.id !== authUser.id) {
      return response.status(401).send({ error: 'Not authorized' });
    }

    const data = request.only([
      'name',
      'type',
      'company_name',
      'document',
      'state_registration',
      'class',
      'email',
      'password',
      'phone',
      'birthday',
      'simple_national',
      'status',
      'adm',
      'obs',
    ]);

    user.merge(data);

    await user.save();

    return user;
  }

  async destroy({ params, auth, response }) {
    const user = await User.findOrFail(params.id);
    const userJSON = await user.toJSON();

    await auth.check();
    const authUser = await auth.getUser();

    if (userJSON.id !== authUser.id) {
      return response.status(401).send({ error: 'Not authorized' });
    }

    user.merge({ status: 'Inativo' });

    await user.save();

    return user;
  }
}

module.exports = UserController;
