class ChatController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.topic = socket.topic;
    this.request = request;
    console.log(`Back ${this.topic} connected to WS ${this.topic}`);
    this.socket.emit('message', {
      message: 'Bem vindo ao canal de bate-papo',
      time: new Date().valueOf(),
    });
  }

  async onClose() {
    console.log(`Topic ${this.topic} disconnected to WS ${this.topic}`);
  }

  async onHello(data) {
    console.log('onHello', data);
    this.socket.emit('ABOUT_MESSAGE', {
      message: `Server handled message: ${data.message}`,
    });
  }

  // async onError() {}

  // onMessage(message) {
  //   this.socket.broadcastToAll('message', message);
  // }
}

module.exports = ChatController;
