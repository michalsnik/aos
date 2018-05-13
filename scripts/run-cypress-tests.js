const cypress = require('cypress');
require('./start-server');

cypress.run().then(() => liveServer.close());
