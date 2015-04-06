'use strict';
var log = require('util').log,
    server = require('node-http-server');

server.deploy(
    {
        verbose: true,
        port: process.env.PORT || 8000,
        root: process.cwd() + '/public'
    }
);
