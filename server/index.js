const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { getSummoner } = require('./model.js');
const compression = require('compression');
const axios = require('axios');
const api_key = require('../riotAPIKey.js');

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
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get('/numRankGames/:id', (req, res) => {
  axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.params.id}?api_key=${api_key}`)
    .then(results => {
      let numRankGames = '';
      const queueTypeArr = results.data;

      for (let i = 0; i < queueTypeArr.length; i++) {
        if (queueTypeArr[i].queueType === "RANKED_SOLO_5x5") {
          numRankGames += queueTypeArr[i].wins + queueTypeArr[i].losses;
        }
      }
      numRankGames = numRankGames === '' ? '0' : numRankGames;
      res.status(200).send(numRankGames);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get('/matchHistoryPage/:accountId&:start&:end', (req, res) => {
  axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.params.accountId}?queue=420&endIndex=${req.params.end}&beginIndex=${req.params.start}&api_key=${api_key}`)
    .then(results => {
      let gameIds = [];
      let champion = 0;
      const playedChampions = {};
      let matchHistory = results.data.matches;

      for (let j = 0; j < matchHistory.length; j++) {
        gameIds.push(matchHistory[j].gameId);
        champion = matchHistory[j].champion;

        if (!playedChampions[champion]) {
          playedChampions[champion] = 1;
        } else { playedChampions[champion]++; }
      }

      let mostChampionId = Object.keys(playedChampions).reduce((a, b) => playedChampions[a] > playedChampions[b] ? a : b);
      // query champname

      const data = { mostChampionId, gameIds };
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
})

app.get('/individualMatch/:id', (req, res) => {
  axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${req.params.id}?api_key=${api_key}`)
    .then(results => {
      res.status(200).send(results.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
})

app.listen(port, () => console.log(`currently listening on localhost:${port}`));