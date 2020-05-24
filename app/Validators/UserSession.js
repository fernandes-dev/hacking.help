class UserSession {
  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }

  get messages() {
    return {
      'email.required': 'Você deve fornecer um e-mail',
      'email.email': 'E-mail inválido',
      'password.required': 'Digite uma senha',
    };
  }

  async fails(errorMessages) {
    const [response] = errorMessages;
    return this.ctx.response.status(400).send({ message: response.message });
  }
}

module.exports = UserSession;
