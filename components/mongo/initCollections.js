module.exports = () => {
  const collections = { };

  const start = ({ mongo }, cb) => {
    collections.sent_alerts = mongo.collection('sent_alerts');
    // collections.landing_content = mongo.collection('landing_content');

    return cb(null, collections);
  };

  return { start };
};