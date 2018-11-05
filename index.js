'use strict';

const fs = require('fs'),
    path = require('path'),
    http = require('http');

const process = require('process');
const appConnect = require('connect')();
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const serverPort = process.env.PORT || 3001;

const Knex = require('knex');
const yaml_conf = require('yaml-config');
const settings = yaml_conf.readConfig('./config.yaml', 'env_variables');

// swaggerRouter configuration
const options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './controllers'),
    useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

// Подключаемся к БД
module.exports.knex = connect();

function connect() {
    // [START gae_flex_postgres_connect]
    const config = {
        user: settings.SQL_USER,
        password: settings.SQL_PASSWORD,
        database: settings.SQL_DATABASE
    };

    if (settings.INSTANCE_CONNECTION_NAME && settings.NODE_ENV === 'production') {
        config.host = `/cloudsql/${settings.INSTANCE_CONNECTION_NAME}`;
    }

    // Данные подключения к БД
    return Knex({
        client: 'pg',
        connection: config
    });
}

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    appConnect.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    appConnect.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    appConnect.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    appConnect.use(middleware.swaggerUi());

    // Start the server
    http.createServer(appConnect).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });

});
