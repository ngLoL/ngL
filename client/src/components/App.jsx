import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getChampionName } from '../../../champion-library/helper.js';
import Splash from './Splash.jsx';
import HolisticStatsCards from './holisticStats/HolisticStatsCards.jsx';
import Hexagon from './Hexagon.jsx';
import FavChampsCards from './favChampRoutes/FavChampsCards.jsx';
import MultiKillsCards from './multiKills/MultiKillsCards.jsx';
import TimeVsWin from './TimeVsWin.jsx';

const App = () => {
  const [info, setInfo] = useState({
    summonerName: '',
    isLoading: false,
    mostPlayedChampion: 0,
    profileIconId: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    cs: 0,
    gameDuration: 0,
    numGames: 0,
    doubleKills: 0,
    tripleKills: 0,
    quadraKills: 0,
    pentaKills: 0,
    visionScore: 0,
    numTeamKills: 0,
    totalDamageToChamps: 0,
    totalTeamDamage: 0,
    longestTimeSpentLiving: 0,
    longestTimeSpentLivingChampId: 0,
    longestTimeSpentLivingMatchId: 0,
    goldSpent: 0,
    goldEarned: 0,
    timeCCingOthers: 0,
    numFirstBlood: 0,
    winsWithFirstBlood: 0,
    largestKillingSpree: 0,
    largestKillingSpreeChamp: 0,
    largestKillingSpreeMatchId: 0,
    numWins: 0,
    favoriteChamps: [],
    gamesUnder20: 0,
    gamesUnder30: 0,
    gamesUnder40: 0,
    gamesPast40: 0,
    winsUnder20: 0,
    winsUnder30: 0,
    winsUnder40: 0,
    winsPast40: 0,
    mostDiedToChampionId: 0,
    mostDiedToChampionDeaths: 0,
    mostKilledChampionId: 0,
    mostKilledChampionKills: 0,
    worstWinrateAgainstChampionId: 0,
    worstWinrateAgainstChampionPercentage: 0,
    bestWinrateAgainstChampionId: 0,
    bestWinrateAgainstChampionPercentage: 0,
  });

  const getSummonerInfo = (summonerName) => {
    axios.get(`/summoner/${summonerName}`)
      .then((results) => {
        const mostPlayed = [];
        let mostDiedTo = { killsBy: 0 };
        let mostKilled = { killsOn: 0 };
        let worstWinRate = { currentWinRate: 1 };
        let bestWinRate = { currentWinRate: 0 };
        const yourOverallStats = {
          kills: 0,
          deaths: 0,
          assists: 0,
          gameDuration: 0,
          numWins: 0,
          cs: 0,
          totalDamageToChamps: 0,
          totalTeamDamage: 0,
        };
        const yourChampionStats = results.data.championStats;
        const { enemyChampionStats } = results.data;

        for (const champId in yourChampionStats) {
          const champObj = yourChampionStats[champId];
          champObj.champId = champId;
          mostPlayed.push(champObj);
          yourOverallStats.kills += yourChampionStats[champId].totalKills;
          yourOverallStats.deaths += yourChampionStats[champId].totalDeaths;
          yourOverallStats.assists += yourChampionStats[champId].totalAssists;
          yourOverallStats.gameDuration += yourChampionStats[champId].totalGameDuration;
          yourOverallStats.numWins += yourChampionStats[champId].numWins;
          yourOverallStats.cs += yourChampionStats[champId].totalCs;
          yourOverallStats.totalDamageToChamps += yourChampionStats[champId].totalDamageToChamps;
          yourOverallStats.totalTeamDamage += yourChampionStats[champId].totalTeamDamageToChamps;
        }

        for (const champId in enemyChampionStats) {
          const champObj = enemyChampionStats[champId];
          champObj.currentWinRate = Math.round(100 * (champObj.wins / champObj.totalGames)) / 100;
          champObj.champId = champId;

          if (champObj.killsBy > mostDiedTo.killsBy) {
            mostDiedTo = champObj;
          }
          if (champObj.killsOn > mostKilled.killsOn) {
            mostKilled = champObj;
          }
          if (champObj.currentWinRate < worstWinRate.currentWinRate) {
            worstWinRate = champObj;
          }
          if (champObj.currentWinRate > bestWinRate.currentWinRate) {
            bestWinRate = champObj;
          }
        }

        const top3 = mostPlayed.sort((a, b) => {
          if (a.numGames > b.numGames) {
            return -1;
          }
        }).slice(0, 3);

        setInfo({
          ...info,
          summonerName,
          mostPlayedChampion: mostPlayed[0].champId,
          kills: yourOverallStats.kills,
          deaths: yourOverallStats.deaths,
          assists: yourOverallStats.assists,
          gameDuration: yourOverallStats.gameDuration,
          numWins: yourOverallStats.numWins,
          cs: yourOverallStats.cs,
          totalDamageToChamps: yourOverallStats.totalDamageToChamps,
          totalTeamDamage: yourOverallStats.totalTeamDamage,
          doubleKills: results.data.totalDoubleKills,
          tripleKills: results.data.totalTripleKills,
          quadraKills: results.data.totalQuadraKills,
          pentaKills: results.data.totalPentaKills,
          goldEarned: results.data.totalGoldEarned,
          goldSpent: results.data.totalGoldSpent,
          gamesUnder20: results.data.gameDurationInIntervals.gamesUnder20,
          gamesUnder30: results.data.gameDurationInIntervals.gamesUnder30,
          gamesUnder40: results.data.gameDurationInIntervals.gamesUnder40,
          gamesPast40: results.data.gameDurationInIntervals.gamesPast40,
          winsUnder20: results.data.gameDurationInIntervals.winsUnder20,
          winsUnder30: results.data.gameDurationInIntervals.winsUnder30,
          winsUnder40: results.data.gameDurationInIntervals.winsUnder40,
          winsPast40: results.data.gameDurationInIntervals.winsPast40,
          largestKillingSpree: results.data.maxKillSpree,
          largestKillingSpreeChamp: results.data.maxKillSpreeChampId,
          largestKillingSpreeMatchId: results.data.maxKillSpreeMatchId,
          longestTimeSpentLiving: results.data.maxTimeLiving,
          longestTimeSpentLivingChampId: results.data.maxTimeLivingChampId,
          longestTimeSpentLivingMatchId: results.data.maxTimeLivingMatchId,
          numGames: results.data.numRankGames,
          profileIconId: results.data.profileIconId,
          numFirstBlood: results.data.totalFirstBloods,
          timeCCingOthers: results.data.totalTimeCCingOthers,
          visionScore: results.data.totalVisionScore,
          favoriteChamps: top3,
          winsWithFirstBlood: results.data.totalWinsWithFirstBloods,
          numTeamKills: results.data.totalTeamScore,
          mostDiedToChampionId: mostDiedTo.champId,
          mostDiedToChampionDeaths: mostDiedTo.killsBy,
          mostKilledChampionId: mostKilled.champId,
          mostKilledChampionKills: mostKilled.killsOn,
          worstWinrateAgainstChampionId: worstWinRate.champId,
          worstWinrateAgainstChampionPercentage: worstWinRate.currentWinRate,
          bestWinrateAgainstChampionId: bestWinRate.champId,
          bestWinrateAgainstChampionPercentage: bestWinRate.currentWinRate,
        });
      })
      .catch((err) => {
        if (err.response.status == 400) {
          alert(err.response.data);
        } else if (err.response.status == 404) {
          alert('Summoner does not exist');
        }
      });
  };

  useEffect(() => {
    getSummonerInfo('TheLastStand');
  }, []);

  return (
    <div>
      <Splash
        summonerName={info.summonerName.toUpperCase()}
        profileIconId={info.profileIconId}
        mostPlayedChamp={getChampionName(info.mostPlayedChampion)}
      />

      <HolisticStatsCards
        kills={info.kills}
        assists={info.assists}
        deaths={info.deaths}
        numGames={info.numGames}
        cs={info.cs}
        gameDuration={info.gameDuration}
      >
        We'll give the boring stuff first.
      </HolisticStatsCards>

      <Hexagon
        summonerName={info.summonerName}
        kda={(info.kills + info.assists) / info.deaths}
        cs={Math.round(100 * (info.cs / (info.gameDuration / 60))) / 100}
        winRate={Math.round(100 * (info.numWins / info.numGames))}
        killParticipation={Math.round(100 * ((info.kills + info.assists) / info.numTeamKills))}
        teamDamage={Math.round(100 * (info.totalDamageToChamps / info.totalTeamDamage))}
        visionScore={Math.round(100 * (info.visionScore / (info.gameDuration / 60))) / 100}
      >
        See how you compare to the best when they're playing against the best.
      </Hexagon>

      <FavChampsCards favoriteChamps={info.favoriteChamps}>
        You seem to like these champs a lot, but how good at them are you exactly?
      </FavChampsCards>

      <MultiKillsCards
        doubleKills={info.doubleKills}
        tripleKills={info.tripleKills}
        quadraKills={info.quadraKills}
        pentaKills={info.pentaKills}
      >
        Are you good at last hitting?
      </MultiKillsCards>

      <TimeVsWin
        winsUnder20={info.winsUnder20}
        winsUnder30={info.winsUnder30}
        winsUnder40={info.winsUnder40}
        winsPast40={info.winsPast40}
        gamesUnder20={info.gamesUnder20}
        gamesUnder30={info.gamesUnder30}
        gamesUnder40={info.gamesUnder40}
        gamesPast40={info.gamesPast40}
      >
        Early-game stomper, mid-game monster, or a late-game powerhouse?
      </TimeVsWin>
    </div>
  );
};

export default App;
