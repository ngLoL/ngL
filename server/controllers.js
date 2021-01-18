const axios = require('axios');

function countNumRankGames(queues) {
  for (let i = 0; i < queues.length; i++) {
    if (queues[i].queueType === "RANKED_SOLO_5x5") {
      return queues[i].wins + queues[i].losses;
    }
  }
  return 0;
}

function gameStatsTemplate() {
  return {
    gameDurationInIntervals: {
      gamesUnder20: 0,
      gamesUnder30: 0,
      gamesUnder40: 0,
      gamesPast40: 0,
      winsUnder20: 0,
      winsUnder30: 0,
      winsUnder40: 0,
      winsPast40: 0,
    },
    totalTeamScore: 0,
    maxKillSpree: 0,
    maxKillSpreeChampId: 0,
    maxKillSpreeMatchId: 0,
    totalVisionScore: 0,
    maxTimeLiving: 0,
    maxTimeLivingChampId: 0,
    maxTimeLivingMatchId: 0,
    totalTimeCCingOthers: 0,
    totalFirstBloods: 0,
    totalWinsWithFirstBloods: 0,
    totalGoldEarned: 0,
    totalGoldSpent: 0,
    totalDoubleKills: 0,
    totalTripleKills: 0,
    totalQuadraKills: 0,
    championStats: {},
    enemyChampionStats: {},
  };
}

function champStatsTemplate() {
  return {
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

function enemyChampStatsTemplate() {
  return {
    totalGames: 0,
    wins: 0,
    killsOn: 0,
    killsBy: 0,
  };
}

function updateChampStats(gameStats, champ, stats) {
  let { championStats } = gameStats;
  const { gameDuration, win, kills, deaths, assists, totalMinionsKilled, neutralMinionsKilled, totalDamageDealtToChampions } = stats;
  championStats[champ].totalGameDuration += gameDuration;
  championStats[champ].numGames++;
  if (win) { championStats[champ].numWins++; }
  championStats[champ].totalKills += kills;
  championStats[champ].totalDeaths += deaths;
  championStats[champ].totalAssists += assists;
  championStats[champ].totalCs += totalMinionsKilled + neutralMinionsKilled;
  championStats[champ].totalDamageToChamps += totalDamageDealtToChampions;
}

function updateGameDuration(gameStats, gameDuration, win) {
  let { gameDurationInIntervals } = gameStats;
  let minutes = gameDuration < 1200 ? 20 : Math.ceil(gameDuration / 600) * 10;
  if (minutes > 40) {
    gameDurationInIntervals.gamesPast40++;
    if (win) { gameDurationInIntervals.winsPast40++; }
  }
  else {
    gameDurationInIntervals[`gamesUnder${minutes}`]++;
    if (win) { gameDurationInIntervals[`winsUnder${minutes}`]++ }
  }
}

function updateKillSpree(gameStats, largestKillingSpree, userChamp, gameId) {
  gameStats.maxKillSpree = largestKillingSpree;
  gameStats.maxKillSpreeChampId = userChamp;
  gameStats.maxKillSpreeMatchId = gameId;
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

  getGameStats: (dataArr) => {
    const [ finalInfo, championIds, ...matches ] = dataArr;
    const gameStats = gameStatsTemplate();

    // first half of matches: match infos
    // second half: match timelines
    let length = matches.length / 2;
    for (let i = 0; i < length; i++) {
      const { gameDuration, teams, participants, gameId } = matches[i].data;
      const userChamp = championIds[i];

      // championStats
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

      const { win, largestKillingSpree, visionScore, longestTimeSpentLiving, timeCCingOthers, visionWardsBoughtInGame, firstBloodKill, firstBloodAssist, goldEarned, goldSpent, doubleKills, tripleKills, quadraKills, pentaKills } = userStats;

      updateChampStats(gameStats, userChamp, userStats);
      gameStats.championStats[userChamp].totalTeamDamageToChamps += teamsDamage[userTeam];

      // gameDurationInIntervals: increment gamesUnder20, etc...
      updateGameDuration(gameStats, gameDuration, win);

      // update largestKillingSpree
      if (largestKillingSpree > gameStats.maxKillSpree) {
        updateKillSpree(gameStats, largestKillingSpree, userChamp, gameId);
      }

      // update visionScore, maxTimeLiving, timeCCingOthers, firstBloods, goldEarned/goldSpent
      gameStats.totalTeamScore += teamsKills[userTeam];
      gameStats.totalVisionScore += visionScore;
      const longestTimeSpentLivingInGame = longestTimeSpentLiving == 0 ? gameDuration : longestTimeSpentLiving;
      if (longestTimeSpentLivingInGame > gameStats.maxTimeLiving) {
        gameStats.maxTimeLiving = longestTimeSpentLivingInGame;
        gameStats.maxTimeLivingChampId = userChamp;
        gameStats.maxTimeLivingMatchId = gameId;
      }
      gameStats.totalTimeCCingOthers += timeCCingOthers;
      if (firstBloodKill) {
        gameStats.totalFirstBloods++;
        if (win) { gameStats.totalWinsWithFirstBloods++; }
      }
      gameStats.totalGoldEarned += goldEarned;
      gameStats.totalGoldSpent += goldSpent;
      gameStats.totalDoubleKills += doubleKills;
      gameStats.totalTripleKills += tripleKills;
      gameStats.totalQuadraKills += quadraKills;

      // update enemyChampionStats for each enemy champion in this match
      for (let i = 0; i < 5; i++) {
        const enemyChamp = champsByTeam[enemyTeam][i];
        if (!gameStats.enemyChampionStats[enemyChamp]) {
          gameStats.enemyChampionStats[enemyChamp] = enemyChampStatsTemplate();
        }
        gameStats.enemyChampionStats[enemyChamp].totalGames++;
        if (win) { gameStats.enemyChampionStats[enemyChamp].wins++; }
      }

      // go through timeline of each corresponding match
      const timeline = matches[i + length].data;
      const { frames } = timeline;
      for (const frame of frames) {
        const { events } = frame;
        for (const event of events) {
          const { type, killerId, victimId } = event;
          if (type == "CHAMPION_KILL" && (killerId == userPartId || victimId == userPartId)) {
            const enemyPart = killerId == userPartId ? victimId : killerId;
            const enemyChamp = partToChamp[enemyPart];
            if (enemyPart == victimId) { gameStats.enemyChampionStats[enemyChamp].killsOn++; }
            else { gameStats.enemyChampionStats[enemyChamp].killsBy++; }
          }
        }
      }
    }

    let match = matches[0].data;

    return ({ ...finalInfo, ...gameStats, match });
  },

};
