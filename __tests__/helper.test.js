const { countNumRankGames, gameStatsTemplate, champStatsTemplate, updateChampStats, updateGameDuration, updateGlobalGameStats, updateUserVsEnemyKills } = require('../server/helper.js');

describe("countNumRankGames function", () => {

  test("it should handle empty array argument", () => {
    expect(countNumRankGames([])).toEqual(0);
  });

  test("it should return 0 if there is no queue type RANKED_SOLO_5x5", () => {
    const queues = [
      {
        queueType: "RANKED_FLEX_5x5",
        wins: 10,
        losses: 4,
      },
    ];

    expect(countNumRankGames(queues)).toEqual(0);
  });

  test("it should return wins + losses of queue type RANKED_SOLO_5x5", () => {
    const queues = [
      {
        queueType: "RANKED_SOLO_5x5",
        wins: 3,
        losses: 4,
      },
      {
        queueType: "RANKED_FLEX_5x5",
        wins: 2,
        losses: 1,
      },
    ];

    expect(countNumRankGames(queues)).toEqual(7);
  });

});

describe("updateChampStats function", () => {
  const gameStats = gameStatsTemplate();
  const userChampId = 154;
  const userStats = {
    gameDuration: 1130,
    win: true,
  };
  const teamDamage = 50000;
  gameStats.championStats[userChampId] = champStatsTemplate();

  updateChampStats(gameStats, userChampId, userStats, teamDamage);

  test("it should currectly add a match's gameDuration onto total user gameDuration", () => {
    expect(gameStats.championStats[userChampId].totalGameDuration).toEqual(userStats.gameDuration);
  });

  test("it should increment numGames", () => {
    expect(gameStats.championStats[userChampId].numGames).toEqual(1);
  });

  test("it should correctly increment number of games won", () => {
    expect(gameStats.championStats[userChampId].numWins).toEqual(1);
  });

  test("it should not increment number of games won for a lost game", () => {
    const lostGameStats = gameStatsTemplate();
    const lostUserChampId = 154;
    const lostUserStats = {
      gameDuration: 1030,
      win: false,
    };
    const lostTeamDamage = 20000;
    lostGameStats.championStats[lostUserChampId] = champStatsTemplate();
    updateChampStats(lostGameStats, lostUserChampId, lostUserStats, lostTeamDamage);

    expect(lostGameStats.championStats[lostUserChampId].numWins).toEqual(0);
  });

});

describe("updateGameDuration function", () => {

});
