const axios = require('axios');
const { countNumRankGames, gameStatsTemplate, champStatsTemplate, enemyChampStatsTemplate, updateChampStats, updateGameDuration, updateKillSpree, updateGlobalGameStats, updateMaxTimeLiving, updateUserVsEnemyKills } = require('./helper.js');

module.exports = {

  getEntries: (dataObj, api_key) => {
    const { id, accountId, profileIconId } = dataObj.data;
    const finalInfo = { profileIconId };
    return Promise.all([finalInfo, accountId, axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api_key}`)]);
  },

  getMatchHistory: (dataArr, api_key) => {
    const [finalInfo, accountId, dataObj] = dataArr;
    const queues = dataObj.data;
    let numRankGames = Math.min(countNumRankGames(queues), 25);

    if (numRankGames == 0) {
      throw new Error(`You don't have enough ranked solo games played`);
    }

    return Promise.all([{ ...finalInfo, numRankGames }, axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?queue=420&endIndex=${numRankGames}&beginIndex=0&api_key=${api_key}`)]);
  },

  getMatches: (dataArr, api_key) => {
    const [finalInfo, dataObj] = dataArr;
    let matchHistory = dataObj.data.matches;

    let RATE_LIMIT_BASE = 150;
    let promises = (url) => matchHistory.map((match, idx) => {
      return new Promise((resolve, reject) => {
        setTimeout(() =>
            axios
              .get(`${url}/${match.gameId}?api_key=${api_key}`)
              .then(res => resolve(res))
              .catch(err => reject(err)),
          RATE_LIMIT_BASE * idx
        );
      });
    });

    const championIds = matchHistory.map(match => match.champion);
    // const matchStorage = matchHistory.map(match => axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${match.gameId}?api_key=${api_key}`));
    const matchStorage = promises('https://na1.api.riotgames.com/lol/match/v4/matches');
    // const matchTimelines = matchHistory.map(match => axios.get(`https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/${match.gameId}?api_key=${api_key}`));
    const matchTimelines = promises('https://na1.api.riotgames.com/lol/match/v4/timelines/by-match');

    return Promise.all([{ ...finalInfo }, championIds, ...matchStorage, ...matchTimelines]);
  },

  getGameStats: (dataArr) => {
    const [finalInfo, championIds, ...matches] = dataArr;
    const gameStats = gameStatsTemplate();

    // first half of matches: match infos
    // second half: match timelines
    let length = matches.length / 2;
    for (let i = 0; i < length; i++) {
      const { gameDuration, teams, participants, gameId } = matches[i].data;
      const userChamp = championIds[i];

      if (!gameStats.championStats[userChamp]) {
        gameStats.championStats[userChamp] = champStatsTemplate();
      }

      let userStats;
      let userTeam;
      let enemyTeam;
      let userPartId;
      const partToChamp = {};
      const teamsDamage = { 100: 0, 200: 0 };
      const champsByTeam = { 100: [], 200: [] };
      const teamsKills = { 100: 0, 200: 0 };

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
        teamsKills[teamId] += stats.kills;
      }

      const { win, largestKillingSpree, longestTimeSpentLiving } = userStats;

      updateChampStats(gameStats, userChamp, userStats, teamsDamage[userTeam]);

      updateGameDuration(gameStats, userChamp, gameDuration, win);

      if (largestKillingSpree > gameStats.maxKillSpree) {
        updateKillSpree(gameStats, largestKillingSpree, userChamp, gameId);
      }

      updateGlobalGameStats(gameStats, userStats, teamsKills[userTeam]);

      const longestTimeSpentLivingInGame = longestTimeSpentLiving == 0 ? gameDuration : longestTimeSpentLiving;
      if (longestTimeSpentLivingInGame > gameStats.maxTimeLiving) {
        updateMaxTimeLiving(gameStats, longestTimeSpentLivingInGame, userChamp, gameId);
      }

      for (let i = 0; i < 5; i++) {
        const enemyChamp = champsByTeam[enemyTeam][i];
        if (!gameStats.enemyChampionStats[enemyChamp]) {
          gameStats.enemyChampionStats[enemyChamp] = enemyChampStatsTemplate();
        }
        gameStats.enemyChampionStats[enemyChamp].totalGames++;
        if (win) { gameStats.enemyChampionStats[enemyChamp].wins++; }
      }

      const timeline = matches[i + length].data;
      updateUserVsEnemyKills(gameStats, timeline, userPartId, partToChamp);
    }

    const match = matches[0].data;

    return ({ ...finalInfo, ...gameStats, match });
  },

};
