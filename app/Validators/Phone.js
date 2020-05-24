class Phone {
  get rules() {
    return {
      phone: 'required|unique:users,phone',
    };
  }

  get messages() {
    return {
      'phone.required': 'Digite um numero de telefone válido',
      'phone.unique': 'Este telefone já está sendo utilizado',
    };
  }

  async fails(errorMessages) {
    const [response] = errorMessages;
    return this.ctx.response.status(400).send({ message: response.message });
  }
}

module.exports = Phone;
