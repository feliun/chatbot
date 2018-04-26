const System = require('systemic');
const mongodb = require('systemic-mongodb');
const initCollections = require('./initCollections');

module.exports = new System({ name: 'mongo' })
  .add('mongo', mongodb()).dependsOn('config', 'logger')
  .add('collections', initCollections()).dependsOn('mongo');
