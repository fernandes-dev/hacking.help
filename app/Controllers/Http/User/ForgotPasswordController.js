const Mail = use('Mail');
const Env = use('Env');
const User = use('App/Models/User/User');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

class ForgotPasswordController {
  async store({ request }) {
    const email = request.input(['email']);

    const user = await User.findByOrFail('email', email);

    const random = await promisify(randomBytes)(16);
    const token = random.toString('hex');

    await user.tokens().create({
      token,
      type: 'forgotpassword',
    });

    // const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`;

    try {
      await Mail.send(
        'emails.forgotpassword',
        { name: user.name, token },
        message => {
          message
            .to(email)
            .from(Env.get('EMAIL'))
            .subject('FoodService - Recuperação de Senha');
        }
      );
    } catch (error) {
      return error;
    }

    return { success: 'Email enviado com sucesso' };
  }
}

module.exports = ForgotPasswordController;
