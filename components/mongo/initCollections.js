module.exports = () => {
  const collections = { };

  const start = ({ mongo }, cb) => {
    collections.saved_search = mongo.collection('saved_search');
    collections.blacklist = mongo.collection('blacklist');

    return cb(null, collections);
  };

  return { start };
};