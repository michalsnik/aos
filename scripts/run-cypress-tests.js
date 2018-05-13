const cypress = require('cypress');
const server = require('./start-server');

cypress.run().then(({ failures }) => {
  server.close();
  process.exit(failures === 0 ? 0 : 1);
});
