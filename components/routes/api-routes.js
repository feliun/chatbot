const express = require('systemic-express/express');
const { join } = require('path');

module.exports = () => {
  const start = ({ app }, cb) => {
    app.use(express.static('public'));

    app.get('/tes', (req, res) => {
      res.sendFile(join(process.cwd(), 'public', 'views', 'tes.html'));
    });

    app.get('/bot', (req, res) => {
      res.json({
        id: process.env.BOT_ID,
        buttonColor: process.env.BOT_COLOR || '#0000ff',
      });
    });

    cb();
  };

  return { start };
};
