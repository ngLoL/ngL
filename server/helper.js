module.exports = {

  countNumRankGames: (queues) => {
    for (let i = 0; i < queues.length; i++) {
      if (queues[i].queueType == "RANKED_SOLO_5x5") {
        return queues[i].wins + queues[i].losses;
      }
    }
    return 0;
  },

  gameStatsTemplate: () => {
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
      totalPentaKills: 0,
      championStats: {},
      enemyChampionStats: {},
    };
  },

  champStatsTemplate: () => {
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
  },

  enemyChampStatsTemplate: () => {
    return {
      totalGames: 0,
      wins: 0,
      killsOn: 0,
      killsBy: 0,
    };
  },

  updateChampStats: (gameStats, champ, stats, teamDamage) => {
    let { championStats } = gameStats;
    const { gameDuration, win, kills, deaths, assists, totalMinionsKilled, neutralMinionsKilled, totalDamageDealtToChampions } = stats;
    championStats[champ].numGames++;
    if (win) { championStats[champ].numWins++; }
    championStats[champ].totalKills += kills;
    championStats[champ].totalDeaths += deaths;
    championStats[champ].totalAssists += assists;
    championStats[champ].totalCs += totalMinionsKilled + neutralMinionsKilled;
    championStats[champ].totalDamageToChamps += totalDamageDealtToChampions;
    championStats[champ].totalTeamDamageToChamps += teamDamage;
  },

  updateGameDuration: (gameStats, champ, gameDuration, win) => {
    let { gameDurationInIntervals, championStats } = gameStats;
    championStats[champ].totalGameDuration += gameDuration;
    let minutes = gameDuration < 1200 ? 20 : Math.ceil(gameDuration / 600) * 10;
    if (minutes > 40) {
      gameDurationInIntervals.gamesPast40++;
      if (win) { gameDurationInIntervals.winsPast40++; }
    }
    else {
      gameDurationInIntervals[`gamesUnder${minutes}`]++;
      if (win) { gameDurationInIntervals[`winsUnder${minutes}`]++ }
    }
  },

  updateKillSpree: (gameStats, largestKillingSpree, userChamp, gameId) => {
    gameStats.maxKillSpree = largestKillingSpree;
    gameStats.maxKillSpreeChampId = userChamp;
    gameStats.maxKillSpreeMatchId = gameId;
  },

  updateGlobalGameStats: (gameStats, userStats, teamScore) => {
    gameStats.totalVisionScore += userStats.visionScore;
    gameStats.totalTimeCCingOthers += userStats.timeCCingOthers;
    gameStats.totalGoldEarned += userStats.goldEarned;
    gameStats.totalGoldSpent += userStats.goldSpent;
    gameStats.totalDoubleKills += userStats.doubleKills;
    gameStats.totalTripleKills += userStats.tripleKills;
    gameStats.totalQuadraKills += userStats.quadraKills;
    gameStats.totalPentaKills += userStats.pentaKills;
    gameStats.totalTeamScore += teamScore;

    if (userStats.firstBloodKill) {
      gameStats.totalFirstBloods++;
      if (userStats.win) { gameStats.totalWinsWithFirstBloods++; }
    }
  },

  updateMaxTimeLiving: (gameStats, longestTimeSpentLivingInGame, userChamp, gameId) => {
    gameStats.maxTimeLiving = longestTimeSpentLivingInGame;
    gameStats.maxTimeLivingChampId = userChamp;
    gameStats.maxTimeLivingMatchId = gameId;
  },

  updateUserVsEnemyKills: (gameStats, timeline, userPartId, partToChamp) => {
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
  },

};