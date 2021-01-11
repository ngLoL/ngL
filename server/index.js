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
    .then(([finalInfo, championIds, ...matches]) => {
      const gameDurationInIntervals = {
        gamesUnder20: 0,
        gamesUnder30: 0,
        gamesUnder40: 0,
        gamesPast40: 0,
        winsUnder20: 0,
        winsUnder30: 0,
        winsUnder40: 0,
        winsPast40: 0,
      };

      let maxKillSpree = 0;
      let maxKillSpreeChampId = 0;
      let maxKillSpreeMatchId = 0;
      let totalVisionScore = 0;
      let maxTimeLiving = 0;
      let totalTimeCCingOthers = 0;
      let totalFirstBloods = 0;

      const championStats = {};
      const enemyChampionStats = {};

      let length = matches.length / 2;
      for (let i = 0; i < length; i++) {
        const { gameDuration, teams, participants, gameId } = matches[i].data;
        const userChamp = championIds[i];

        // championStats
        if (!championStats[userChamp]) {
          championStats[userChamp] = {
            totalGameDuration: 0,
            numGames: 0,
            numWins: 0,
            totalKills: 0,
            totalDeaths: 0,
            totalAssists: 0,
            totalCs: 0,
            totalDamageToChamps: 0,
            totalTeamDamageToChamps: 0,
          };
        }

        // enemyChampionStats

        // enemyPartToChamp
        const partToChamp = {};

        let userStats;
        let userTeam;
        let enemyTeam;
        let userPartId;
        const teamsDamage = {
          100: 0,
          200: 0,
        };
        const champsByTeam = {
          100: [],
          200: [],
        }

        for (let participant of participants) {
          const { stats, teamId, participantId, championId } = participant;
          if (championId == userChamp) {
            userStats = stats;
            userTeam = teamId;
            enemyTeam = teamId == 100 ? 200 : 100;
            userPartId = participantId;
          }
          partToChamp[participantId] = championId;
          teamsDamage[teamId] += stats.totalDamageDealtToChampions;
          champsByTeam[teamId].push(championId);
        }

        const { win, kills, deaths, assists, totalMinionsKilled, neutralMinionsKilled, totalDamageDealtToChampions, largestKillingSpree, visionScore, longestTimeSpentLiving, timeCCingOthers, visionWardsBoughtInGame, firstBloodKill, firstBloodAssist } = userStats;

        championStats[userChamp].totalGameDuration += gameDuration;
        championStats[userChamp].numGames++;
        if (win) { championStats[userChamp].numWins++; }
        championStats[userChamp].totalKills += kills;
        championStats[userChamp].totalDeaths += deaths;
        championStats[userChamp].totalAssists += assists;
        championStats[userChamp].totalCs += totalMinionsKilled + neutralMinionsKilled;
        championStats[userChamp].totalDamageToChamps += totalDamageDealtToChampions;
        championStats[userChamp].totalTeamDamageToChamps += teamsDamage[userTeam];

        // gameDurationInIntervals: increment gamesUnder20, etc...
        let minutes = gameDuration < 1200 ? 20 : Math.ceil(gameDuration / 600) * 10;
        if (minutes > 40) {
          gameDurationInIntervals.gamesPast40++;
          if (win) { gameDurationInIntervals.winsPast40++; }
        }
        else {
          gameDurationInIntervals[`gamesUnder${minutes}`]++;
          if (win) { gameDurationInIntervals[`winsUnder${minutes}`]++ }
        }

        // update largestKillingSpree
        if (largestKillingSpree > maxKillSpree) {
          maxKillSpree = largestKillingSpree;
          maxKillSpreeChampId = userChamp;
          maxKillSpreeMatchId = gameId;
        }

        // update visionScore, maxTimeLiving, timeCCingOthers,
        totalVisionScore += visionScore;
        if (longestTimeSpentLiving == 0 || longestTimeSpentLiving > maxTimeLiving) {
          maxTimeLiving = Math.max(maxTimeLiving, (longestTimeSpentLiving || gameDuration));
        }
        totalTimeCCingOthers += timeCCingOthers;
        if (firstBloodKill || firstBloodAssist) { totalFirstBloods++; }

        // update enemyChampionStats for each enemy champion in this match
        for (let i = 0; i < 5; i++) {
          const enemyChamp = champsByTeam[enemyTeam][i];
          if (!enemyChampionStats[enemyChamp]) {
            enemyChampionStats[enemyChamp] = {
              totalGames: 0,
              wins: 0,
              killsOn: 0,
              killsBy: 0,
            }
          }
          enemyChampionStats[enemyChamp].totalGames++;
          if (win) { enemyChampionStats[enemyChamp].wins++; }
        }


        // go through each frame, each event
        // if the event is CHAMPION_KILL, and user was involved.
        // then record killsOn or killsBy accordingly
        const timeline = matches[i + length].data;
        const { frames } = timeline;
        for (const frame of frames) {
          const { events } = frame;
          for (const event of events) {
            const { type, killerId, victimId } = event;
            if (type == "CHAMPION_KILL") {
              if (killerId == userPartId || victimId == userPartId) {
                const enemyPart = killerId == userPartId ? victimId : killerId;
                const enemyChamp = partToChamp[enemyPart];
                if (enemyPart == victimId) { enemyChampionStats[enemyChamp].killsOn++; }
                else { enemyChampionStats[enemyChamp].killsBy++; }
              }
            }
          }
        }
      }

      res.status(200).send({ ...finalInfo, gameDurationInIntervals, championStats, maxKillSpree, maxKillSpreeChampId, maxKillSpreeMatchId, totalVisionScore, maxTimeLiving, totalTimeCCingOthers, totalFirstBloods, enemyChampionStats });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.listen(port, () => console.log(`currently listening on localhost:${port}`));