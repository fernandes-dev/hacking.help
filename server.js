const { Ignitor } = require('@adonisjs/ignitor');
const cluster = require('cluster');

if (cluster.isMaster) {
  for (let i=0; i < 4; i ++) {
    cluster.fork()
  }
  require('@adonisjs/websocket/clusterPubSub')()
  return
}

const fold = require('@adonisjs/fold');

new Ignitor(fold)
  .appRoot(__dirname)
  .wsServer()
  .fireHttpServer()
  .catch();
