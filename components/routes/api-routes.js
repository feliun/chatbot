const moment = require('moment');
const bodyParser = require('body-parser');
const express = require('systemic-express/express');
const { join } = require('path');

module.exports = () => {
  const start = ({ app, collections }, cb) => {
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const format = (date) => moment(date).format('DD-MM-YYYYTHH:mm:ss');

    app.get('/tes', (req, res) => {
      res.sendFile(join(process.cwd(), 'public', 'views', 'tes.html'));
    });

    app.get('/yoigo', (req, res) => {
      res.sendFile(join(process.cwd(), 'public', 'views', 'yoigo.html'));
    });

    app.get('/hive', (req, res) => {
      res.sendFile(join(process.cwd(), 'public', 'views', 'hive.html'));
    });

    app.get('/bot', (req, res) => {
      const { company }  = req.query || 'tes';
      const idByCompany = {
        tes: process.env.TES_BOT_ID,
        yoigo: process.env.YOIGO_BOT_ID,
        hive: process.env.HIVE_BOT_ID,
      };
      res.json({
        id: idByCompany[company],
        buttonColor: process.env.BOT_COLOR || '#0000ff',
      });
    });

    app.post('/savedsearch', (req, res) => {
      const email = req.body.reply;
      collections.saved_search.findOne({ 'user.email': email })
      .then(({ user, sentDate }) => {
          const { firstName, lastName, displayName } = user;
          res.json({
            sentDate: format(sentDate),
            firstName,
            lastName,
            displayName,
            email,
          });
        });
    });

    app.post('/blacklist/check', (req, res) => {
      const TARGET_TASK = '13482';
      const { email } = req.body.customVariables[TARGET_TASK];
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

    app.post('/blacklist/delete', (req, res) => {
      const email = 'felipe.polo@guidesmiths.com';
      collections.blacklist.deleteOne({ email })
        .then(() => res.json({ success: true }))
        .catch(() => res.json({ success: false }));
    });

    cb();
  };

  return { start };
};
