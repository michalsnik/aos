const liveServer = require('live-server');

const params = {
  port: 8080,
  host: '0.0.0.0',
  root: './demo',
  watch: ['dist/**', 'demo/**'],
  open: process.env.NODE_ENV !== 'test',
  mount: [['/dist', './dist']],
  noCssInject: true
};

const server = liveServer.start(params);

module.exports = server;
