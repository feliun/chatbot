const System = require('systemic');
const { join } = require('path');

module.exports = () => new System({ name: 'basic-microservice' }).bootstrap(join(__dirname, 'components'));
