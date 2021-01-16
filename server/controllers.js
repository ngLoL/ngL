const axios = require('axios');

function countNumRankGames(queues) {
  for (let i = 0; i < queues.length; i++) {
    if (queues[i].queueType === "RANKED_SOLO_5x5") {
      return queues[i].wins + queues[i].losses;
    }
  }
  return 0;
}

module.exports = {

  getEntries: (dataObj, api_key) => {
    const { id, accountId, profileIconId } = dataObj.data;
    const finalInfo = { profileIconId };
    return Promise.all([finalInfo, accountId, axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api_key}`)]);
  },

  getMatchHistory: (dataArr, api_key) => {
    const [finalInfo, accountId, dataObj] = dataArr;
    const queues = dataObj.data;
    let numRankGames = countNumRankGames(queues);

    if (numRankGames == 0) {
      throw new Error(`You don't have enough ranked solo games played`);
    }

    return Promise.all([{ ...finalInfo, numRankGames }, axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?queue=420&endIndex=3&beginIndex=0&api_key=${api_key}`)]);
  },

  getMatches: (dataArr, api_key) => {
    const [finalInfo, dataObj] = dataArr;
    let matchHistory = dataObj.data.matches;

    const championIds = matchHistory.map(match => match.champion);
    const matchStorage = matchHistory.map(match => axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${match.gameId}?api_key=${api_key}`));
    const matchTimelines = matchHistory.map(match => axios.get(`https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/${match.gameId}?api_key=${api_key}`));

    return Promise.all([{ ...finalInfo}, championIds, ...matchStorage, ...matchTimelines]);
  },

};
