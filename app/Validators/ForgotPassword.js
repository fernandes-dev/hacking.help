class ForgotPassword {
  get rules() {
    return {
      email: 'email|required',
    };
  }
}

module.exports = ForgotPassword;
