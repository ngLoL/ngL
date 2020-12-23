const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const axios = require('axios');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/summoner/:id', (req, res) => {
  axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.id}?api_key=RGAPI-a7d80df9-cb0c-4deb-9cbe-1c22e5a73be1`)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get('/gameModes/:id', (req, res) => {
  axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.params.id}?api_key=RGAPI-a7d80df9-cb0c-4deb-9cbe-1c22e5a73be1`)
  .then(results => {
    res.status(200).send(results.data);
  })
  .catch(err => {
    res.status(400).send(err);
  });
});

app.get('/matchHistory/:accountId&:start&:end', (req, res) => {
  axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.params.accountId}?queue=420&endIndex=${req.params.end}&beginIndex=${req.params.start}&api_key=RGAPI-a7d80df9-cb0c-4deb-9cbe-1c22e5a73be1`)
  .then(results => {
    res.status(200).send(results.data);
  })
  .catch(err => {
    res.status(400).send(err);
  });
})

app.listen(port, () => console.log(`currently listening on localhost:${port}`));