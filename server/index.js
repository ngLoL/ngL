const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const axios = require('axios');
const api_key = require('../riotAPIKey.js');
const { getEntries, getMatchHistory, getMatches } = require('./controllers.js');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/summoner/:summonerName', (req, res) => {
  axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}?api_key=${api_key}`)
    .then((data) => getEntries(data, api_key))
    .then((datas) => getMatchHistory(datas, api_key))
    .then((datas) => getMatches(datas, api_key))
    .then(([finalInfo, ...matches]) => {
      res.status(200).send(finalInfo);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.listen(port, () => console.log(`currently listening on localhost:${port}`));