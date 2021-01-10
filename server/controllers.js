const axios = require('axios');

function countNumRankGames(queues) {
  for (let i = 0; i < queues.length; i++) {
    if (queues[i].queueType === "RANKED_SOLO_5x5") {
      return queues[i].wins + queues[i].losses;
    }
  }
  return 0;
}

function getMostPlayedChamp(matchHistory) {
  const playedChampions = {};

  for (let j = 0; j < matchHistory.length; j++) {
    let champion = matchHistory[j].champion;

    if (!playedChampions[champion]) {
      playedChampions[champion] = 1;
    } else { playedChampions[champion]++; }
  }

  return Object.keys(playedChampions).reduce((a, b) => playedChampions[a] > playedChampions[b] ? a : b);
}

module.exports = {

  getEntries: (dataObj, api_key) => {
    const { name, id, accountId } = dataObj.data;
    const finalInfo = { summonerName: name };
    return Promise.all([finalInfo, accountId, axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api_key}`)]);
  },

  getMatchHistory: (dataArr, api_key) => {
    const [finalInfo, accountId, dataObj] = dataArr;
    const queues = dataObj.data;
    let numRankGames = countNumRankGames(queues);

    if (numRankGames == 0) {
      throw new Error(`You don't have enough ranked solo games played`);
    }

    return Promise.all([{ ...finalInfo, numRankGames }, axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?queue=420&endIndex=10&beginIndex=0&api_key=${api_key}`)]);
  },

  getMatches: (dataArr, api_key) => {
    const [finalInfo, dataObj] = dataArr;
    let matchHistory = dataObj.data.matches;

    const mostChampionId = getMostPlayedChamp(matchHistory);

    const matchStorage = matchHistory.map(match => axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${match.gameId}?api_key=${api_key}`));

    return Promise.all([{ ...finalInfo, mostChampionId }, ...matchStorage]);
  },

};
