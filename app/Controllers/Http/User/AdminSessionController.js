const User = use('App/Models/User/User');

class AdminSessionController {
  async create({ request, auth, response }) {
    try {
      const { email, password } = request.all();

      let user = await User.query()
        .setHidden(['id', 'password'])
        .where('email', email)
        .fetch();

      [user] = user.toJSON();

      if (user.adm !== 'S')
        return response.status(401).send({ message: 'Usuário não autorizado' });

      const { token } = await auth.attempt(email, password);

      user.token = token;

      return user;
    } catch (error) {
      return response
        .status(401)
        .send({ message: `E-mail ou senha inválidos` });
    }
  }

  async verifyEmail({ request, response }) {
    const { email } = request.all();

    try {
      await User.findByOrFail({ email });

      return response
        .status(401)
        .send({ message: 'E-mail já está sendo utilizado' });
    } catch (error) {
      return { message: 'E-mail válido' };
    }
  }
}

module.exports = AdminSessionController;
