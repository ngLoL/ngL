const express = require('express');
const axios = require('axios');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const redis = require('redis');
const api_key = require('../riotAPIKey.js');
const { getEntries, getMatchHistory, getMatches, getGameStats } = require('./controllers.js');

const app = express();
const port = 8000;

const redis_client = redis.createClient(6379);

redis_client.on("error", (error) => {
  console.error(error);
});

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));
app.use(cors());
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/summoner/:summonerName', (req, res) => {
  const summonerName = req.params.summonerName.toLowerCase();
  redis_client.get(summonerName, (error, result) => {
    if (error) {
      res.status(500).json({ error: error });
      return;
    }

    if (result) {
      res.status(200).send(result);
    } else {
      axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`)
        .then(data => getEntries(data, api_key))
        .then(datas => getMatchHistory(datas, api_key))
        .then(datas => getMatches(datas, api_key))
        .then(datas => getGameStats(datas))
        .then(result => {
          redis_client.setex(summonerName, 60, JSON.stringify(result));
          return result;
        })
        .then(result => res.status(200).send(result))
        .catch(err => {
          if (err.response) {
            res.status(err.response.status).send(err)
          } else {
            res.status(400).json(err.message);
          }
        });
    }
  })
});

app.listen(port, () => console.log(`currently listening on localhost:${port}`));