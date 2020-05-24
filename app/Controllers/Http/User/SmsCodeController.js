const SmsCode = use('App/Models/User/SmsCode');
const User = use('App/Models/User/User');
const http = require('http');

class SmsCodeController {
  async store({ request, response }) {
    const { phone } = request.only(['phone']);

    const newPhone = phone.match(/[0-9]/g).join('');

    if (newPhone.length < 11) {
      return response.status(400).send({ message: 'Telefone inválido' });
    }

    let user = await User.query()
      .where('phone', newPhone)
      .fetch();
    [user] = user.toJSON();

    if (user)
      return response.status(401).send({
        message: 'Este telefone já está sendo utilizado',
      });

    const date = new Date();
    const codeSms = (
      Math.floor(Math.random() * parseFloat(newPhone)) * date.getMilliseconds()
    )
      .toString()
      .substr(0, 6);

    const options = {
      method: 'GET',
      hostname: 'api.smsdev.com.br',
      port: null,
      path: `/send?key=${
        process.env.API_SMS_KEY
      }&type=9&number=${newPhone}&msg=${encodeURIComponent(
        `Codigo para cadastro em Food Service: ${codeSms}`
      )}`,
      headers: {},
    };

    const req = http.request(options, res => {
      const chunks = [];

      res.on('data', chunk => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        Buffer.concat(chunks);
      });
    });
    req.end();

    try {
      const verify = await SmsCode.findByOrFail('phone', newPhone);
      if (verify.status === 'Pendente') {
        verify.merge({ phone: newPhone, code: codeSms });

        await verify.save();
      } else {
        await SmsCode.create({ phone: newPhone, code: codeSms });
      }
    } catch (error) {
      await SmsCode.create({ phone: newPhone, code: codeSms });
    }

    return { success: 'Código enviado com sucesso', codeSms };
  }

  async verifyCode({ request, response }) {
    const data = request.only(['phone', 'code_sms']);

    const newPhone = data.phone.match(/[0-9]/g).join('');

    try {
      const verify = await SmsCode.findByOrFail('phone', newPhone);

      if (verify.status === 'Confirmado')
        return response
          .status(401)
          .send({ message: 'Este telefone já está em uso' });

      if (verify.code !== data.code_sms)
        return response.status(400).json({ message: 'Código incorreto' });

      verify.status = 'Confirmado';
      await verify.save();

      return { success: 'Código Verificado' };
    } catch (error) {
      return response.status(400).send({ message: 'Telefone inválido', error });
    }
  }
}

module.exports = SmsCodeController;
