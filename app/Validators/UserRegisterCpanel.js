class UserRegisterCpanel {
  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique:users,email',
      password: 'required',
      document: 'required'
    };
  }

  get messages() {
    return {
      'name.required': 'Digite seu nome completo.',
      'email.required': 'Você precisa fornecer um email.',
      'email.email': 'Você precisa fornecer um email válido.',
      'email.unique': 'Este e-mail já está sendo utilizado.',
      'password.required': 'Forneça uma senha.',
    };
  }

  async fails(errorMessages) {
    const [response] = errorMessages;
    return this.ctx.response.status(400).send({ message: response.message });
  }
}

module.exports = UserRegisterCpanel;
