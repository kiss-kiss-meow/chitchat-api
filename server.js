'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  port: '8000'
});

server.route({
  method: 'GET',
  path: '/api/items',
  handler: (req, res) => {
    return res([{
      id: 1,
      name: 'Item 1'
    }, {
      id: 2,
      name: 'Item 2'
    }, {
      id: 3,
      name: 'Item 3'
    }]);
  }
});

server.start((err) => {
  if (err) throw err;
  console.log('Server running at: ' + server.info.uri);
});
