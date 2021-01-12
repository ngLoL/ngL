import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getChampionName} from '../../../champion-library/helper.js';
import Splash from './Splash.jsx';
import SearchBar from './SearchBar.jsx';

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


  useEffect(() => {
    getSummonerInfo('Iceh');
  }, []);

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
        const enemyChampionStats = results.data.enemyChampionStats;


        for (const champId in yourChampionStats) {
          let champObj = yourChampionStats[champId];
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
          let champObj = enemyChampionStats[champId];
          champObj.currentWinRate = Math.round(100*(champObj.wins / champObj.totalGames)) / 100;
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

        mostPlayed.sort((a, b) => {
          if (a.numGames > b.numGames) {
            return -1;
          }
        }).slice(0, 3);

        setInfo({
          ...info,
          summonerName: summonerName,
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
          favoriteChamps: mostPlayed,
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

        console.log(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gamesUnder20 = Math.round(100*(info.winsUnder20 / info.gamesUnder20));
  const gamesUnder30 = Math.round(100*(info.winsUnder30 / info.gamesUnder30));
  const gamesUnder40 = Math.round(100*(info.winsUnder40 / info.gamesUnder40));
  const gamesPast40 = Math.round(100*(info.winsPast40 / info.gamesPast40));

  return (
    <div>
      {info.mostPlayedChampion != 0 && <Splash mostChampionName={info.mostPlayedChampion} />}
      <div>Summoner Name: {info.summonerName}</div>

      <div>We'll give the boring stuff first.</div>
      <div>Avg KDA: {Math.round(100*((info.kills + info.assists) / info.deaths)) / 100}</div>
      <div>Avg Kills: {Math.round(100*(info.kills / info.numGames)) / 100}</div>
      <div>Avg Deaths: {Math.round(100*(info.deaths / info.numGames)) / 100}</div>
      <div>Avg Assists: {Math.round(100*(info.assists / info.numGames)) / 100}</div>
      <div>Avg CS/min: {Math.round(100*(info.cs / (info.gameDuration / 60))) / 100}</div>

      <div>Now here are more mildly interesting stats</div>

      <div>You seem to like these champs a lot, but how good at them are you exactly?</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>

      <div>Are you good at last hitting?</div>
      <div>Double Kills:{info.doubleKills || 0} Triple Kill: {info.tripleKills || 0} QuadraKills: {info.quadraKills || 0} PentaKills: {info.pentaKills || 0}</div>

      <div>Early finisher, mid-game monster, or a late game degenerate</div>
      <div>Games won under 20 min: {gamesUnder20}%</div>
      <div>Games won from 20 to 30 min: {gamesUnder30}%</div>
      <div>Games won from 30 to 40 min: {gamesUnder40}%</div>
      <div>Games won past 40 min: {gamesPast40}%</div>

      <div>Just to show that supports are more than just wards these days. They are also this.</div>
      <div>Avg Vision Score: {Math.round(100*(info.visionScore / info.numGames)) / 100}</div>

      <div>Reminder: League is a team game.</div>
      <div>Avg KP: {Math.round(100*((info.kills + info.assists) / info.numTeamKills))}%</div>

      <div>Let's be honest about how much you contributed though.</div>
      <div>Avg Percentage of Team Damage: {Math.round(100*(info.totalDamageToChamps / info.totalTeamDamage))}%</div>

      <div>Longest time you went without seeing the gray screen</div>
      <div>Stayed Alive for {Math.floor(info.longestTimeSpentLiving / 60)} minutes and {Math.floor(info.longestTimeSpentLiving % 60)} seconds as {getChampionName(info.longestTimeSpentLivingChampId)}</div>
      <div>Glad to know you weren't that bad for one game. Here's the match history if you're curious: {info.longestTimeSpentLivingMatchId}</div>

      <div>What Riot should actually be putting in the loading screen.</div>
      <div>Fun fact: gold you don't spend doesn't transfer to the next game.</div>
      <div>Gold wasted: {info.goldEarned - info.goldSpent}</div>

      <div>This is the amount of time you didn't let others play League of Legends. Poor soul(s)</div>
      <div>Time Spent Ccing Others: {Math.floor(info.timeCCingOthers / 60)} minutes and {Math.floor(info.timeCCingOthers % 60)} seconds</div>
      <div>This is the equivalent to getting hit by {Math.floor(info.timeCCingOthers / 3)} Morgana Q's.</div>

      <div>Were you able to translate your first blood kill to a win?</div>
      <div>Amount of First Bloods that resulted in a win: {Math.round(100*(info.winsWithFirstBlood / info.numFirstBlood)) / 100}</div>

      <div>Did someone kill your puppy Mr. Wick?</div>
      <div>Largest Killing Spree: {info.largestKillingSpree} with {getChampionName(info.largestKillingSpreeChamp)}</div>
      <div>Check out your match history here: {info.largestKillingSpreeMatchId}</div>

      <div>We all have bad days. Yours start when you see someone lock in this champ</div>
      <div>Died to {getChampionName(info.mostDiedToChampionId)} the most. {info.mostDiedToChampionDeaths} times</div>
      <div>Worst Winrate Against {getChampionName(info.worstWinrateAgainstChampionId)} at {info.worstWinrateAgainstChampionPercentage}</div>

      <div>On the other hand, here are the times you can play with ONE hand... haha (I'm sorry)</div>
      <div>Killed {getChampionName(info.mostKilledChampionId)} the most. {info.mostKilledChampionKills} times</div>
      <div>Best Winrate Against {getChampionName(info.bestWinrateAgainstChampionId)} at {info.bestWinrateAgainstChampionPercentage}</div>

      <SearchBar />
    </div>
  );
}

export default App;
