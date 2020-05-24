const { parseISO, isBefore, subHours } = require('date-fns');

const Token = use('App/Models/User/Token');

class ResetPasswordController {
  async store({ request, response }) {
    try {
      const { token, password } = request.only(['token', 'password']);

      const userToken = await Token.findByOrFail('token', token);

      if (isBefore(parseISO(userToken.created_at), subHours(new Date(), 2))) {
        return response.status(400).json({ error: 'Token expirou' });
      }
      const user = await userToken.user().fetch();

      user.password = password;

      await user.save();

      return { token };
    } catch (error) {
      return error;
    }
  }
}

module.exports = ResetPasswordController;
