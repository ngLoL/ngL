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
    .then(({ data: { name, id, accountId } }) => {
      const finalInfo = { summonerName: name };
      return Promise.all([finalInfo, accountId, axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api_key}`)]);
    })
    .then(([finalInfo, accountId, { data }]) => {
      let numRankGames = '';
      const queueTypeArr = data;

      for (let i = 0; i < queueTypeArr.length; i++) {
        if (queueTypeArr[i].queueType === "RANKED_SOLO_5x5") {
          numRankGames += queueTypeArr[i].wins + queueTypeArr[i].losses;
        }
      }

      if (numRankGames === '') {
        throw new Error(`You don't have enough ranked solo games played`);
      }

      return Promise.all([{ ...finalInfo, numRankGames }, axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?queue=420&endIndex=10&beginIndex=0&api_key=${api_key}`)]);
    })
    .then(([finalInfo, { data: { matches } }]) => {
      let gameIds = [];
      let champion = 0;
      const playedChampions = {};
      let matchHistory = matches;

      for (let j = 0; j < matchHistory.length; j++) {
        gameIds.push(matchHistory[j].gameId);
        champion = matchHistory[j].champion;

        if (!playedChampions[champion]) {
          playedChampions[champion] = 1;
        } else { playedChampions[champion]++; }
      }

      let mostChampionId = Object.keys(playedChampions).reduce((a, b) => playedChampions[a] > playedChampions[b] ? a : b);

      const matchStorage = gameIds.map(gameId => axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${api_key}`));

      return Promise.all([{...finalInfo, mostChampionId}, ...matchStorage]);
    })
    .then(([finalInfo, ...matches]) => {
      //matches is an array of huge match objects
      res.status(200).send(results);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.listen(port, () => console.log(`currently listening on localhost:${port}`));