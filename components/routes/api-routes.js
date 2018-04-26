const moment = require('moment');
const bodyParser = require('body-parser');
const express = require('systemic-express/express');
const { join } = require('path');

module.exports = () => {
  const start = ({ app, collections }, cb) => {
    app.use(express.static('public'));
    app.use(bodyParser.json());

    const format = (date) => moment(date).format('DD-MM-YYYYTHH:mm:ss');

    app.get('/tes', (req, res) => {
      res.sendFile(join(process.cwd(), 'public', 'views', 'tes.html'));
    });

    app.get('/bot', (req, res) => {
      res.json({
        id: process.env.BOT_ID,
        buttonColor: process.env.BOT_COLOR || '#0000ff',
      });
    });

    app.post('/savedsearch', (req, res) => {
      const email = 'felipe.polo@guidesmiths.com';
      collections.saved_search.findOne({ 'user.email': email })
        .then(({ user, sentDate }) => {
          const { firstName, lastName, displayName } = user;
          res.json({
            sentDate: format(sentDate),
            firstName,
            lastName,
            displayName,
          });
        });
    });

    app.post('/blacklist/check', (req, res) => {
      const email = 'felipe.polo@guidesmiths.com';
      collections.blacklist.findOne({ email })
        .then((result) => {
          if (!result) return res.json({ found: false });
          res.json({
            found: true,
            status: result.status,
            when: format(result.details.timestamp),
          });
        });
    });

    cb();
  };

  return { start };
};
