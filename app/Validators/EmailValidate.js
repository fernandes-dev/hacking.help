class EmailValidate {
  get rules() {
    return {
      email: 'email|required|unique:users,email',
    };
  }

  get messages() {
    return {
      'email.required': 'Você deve fornecer um e-mail',
      'email.email': 'E-mail inválido',
      'email.unique': 'Este e-mail já está sendo utilizado',
    };
  }

  async fails(errorMessages) {
    const [response] = errorMessages;
    return this.ctx.response.status(400).send({ message: response.message });
  }
}

module.exports = EmailValidate;
