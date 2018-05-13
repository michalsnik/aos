const cypress = require('cypress');
const server = require('./start-server');

cypress.run().then(() => server.close());
