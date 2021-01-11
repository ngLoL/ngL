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
    numOfGames: 0,
    doubleKills: 0,
    tripleKills: 0,
    quadraKills: 0,
    pentaKills: 0,
    visionScore: 0,
    numOfTeamKills: 0,
    totalDamageToChamps: 0,
    totalTeamDamage: 0,
    longestTimeSpentLiving: 0,
    longestTimeSpentLivingChampId: 0,
    longestTimeSpentLivingGameId: 0,
    goldSpent: 0,
    goldEarned: 0,
    timeCCingOthers: 0,
    numOfFirstBlood: 0,
    gamesWonWithFirstBlood: 0,
    largestKillingSpree: 0,
    largestKillingSpreeChamp: 0,
    largestKillingSpreeMatchId: 0,
    favoriteChamps: {
      first: {
        champId: 0,
        totalNumberOfGames: 0,
        numberOfGamesWon: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        cs: 0,
        gameDuration: 0,
        totalDamageToChamps: 0,
      },
      second: {
        champId: 0,
        totalNumberOfGames: 0,
        numberOfGamesWon: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        cs: 0,
        gameDuration: 0,
        totalDamageToChamps: 0,
      },
      third: {
        champId: 0,
        totalNumberOfGames: 0,
        numberOfGamesWon: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        cs: 0,
        gameDuration: 0,
        totalDamageToChamps: 0,
      },
    },
    gamesUnder20: 0,
    gamesUnder30: 0,
    gamesUnder40: 0,
    gamesPast40: 0,
    gamesWonUnder20: 0,
    gamesWonUnder30: 0,
    gamesWonUnder40: 0,
    gamesWonPast40: 0,
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
        const championName = getChampionName(results.data.mostChampionId);
        setInfo({ ...info, mostPlayedChampion: championName})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {info.mostPlayedChampion != 0 && <Splash mostChampionName={info.mostPlayedChampion} />}
      <div>Summoner Name: {info.summonerName}</div>
      <div>Most Played Champion: {info.mostPlayedChampion}</div>

      <div>We'll give the boring stuff first.</div>
      <div>Avg KDA: {Math.round(100*((info.kills + info.assists) / info.deaths)) / 100}</div>
      <div>Avg Kills: {Math.round(100*(info.kills / info.numOfGames)) / 100}</div>
      <div>Avg Deaths: {Math.round(100*(info.deaths / info.numOfGames)) / 100}</div>
      <div>Avg Assits: {Math.round(100*(info.assists / info.numOfGames)) / 100}</div>
      <div>Avg CS/min: {Math.round(100*(info.cs / (info.gameDuration / 60))) / 100}</div>

      <div>Now here are more mildly interesting stats</div>

      <div>You seem to like these champs a lot, but how good at them are you exactly?</div>
      <div>{info.favoriteChamps.first.champId}</div>
      <div>{info.favoriteChamps.second.champId}</div>
      <div>{info.favoriteChamps.third.champId}</div>

      <div>Are you good at last hitting?</div>
      <div>Double Kills:{info.doubleKills} Triple Kill: {info.tripleKills} QuadraKills: {info.quadraKills} PentaKills: {info.pentaKills}</div>

      <div>Early finisher, mid-game monster, or a late game degenerate</div>
      <div>Games won under 20 min: {info.gamesWonUnder20} / {info.gamesUnder20}</div>
      <div>Games won from 20 to 30 min: {info.gamesWonUnder30} / {info.gamesUnder30}</div>
      <div>Games won from 30 to 40 min: {info.gamesWonUnder40} / {info.gamesUnder40}</div>
      <div>Games won past 40 min: {info.gamesWonPast40} / {info.gamesPast40}</div>

      <div>Just to show that supports are more than just wards these days. They are also this.</div>
      <div>Avg Vision Score: {Math.round(100*(info.visionScore / info.numOfGames)) / 100}</div>

      <div>Reminder: League is a team game.</div>
      <div>Avg KP: {Math.round(100*((info.kills + info.assists) / info.numOfTeamKills)) / 100}%</div>

      <div>Let's be honest about how much you contributed though.</div>
      <div>Avg Percentage of Team Damage: {Math.round(100*(info.totalDamageToChamps / info.totalTeamDamage)) / 100}%</div>

      <div>Longest time you went without seeing the gray screen</div>
      <div>Stayed Alive for {Math.floor(info.longestTimeSpentLiving / 60)} minutes and {Math.floor(info.longestTimeSpentLiving % 60)} seconds as {info.longestTimeSpentLivingChampId}</div>
      <div>Glad to know you weren't that bad for one game. Here's the match history if you're curious: {info.longestTimeSpentLivingGameId}</div>

      <div>What Riot should actually be putting in the loading screen.</div>
      <div>Fun fact: gold you don't spend doesn't transfer to the next game.</div>
      <div>Gold wasted: {info.goldEarned - info.goldSpent}</div>

      <div>This is the amount of time you didn't let others play League of Legends. Poor soul(s)</div>
      <div>Time Spent Ccing Others: {info.timeCCingOthers}</div>
      <div>This is the equivalent to getting hit by {Math.round(100*(info.timeCCingOthers / 3)) / 100} Morgana Q's.</div>

      <div>Were you able to translate your first blood kill to a win?</div>
      <div>Amount of First Bloods that resulted in a win: {Math.round(100*(info.gamesWonWithFirstBlood / info.numOfFirstBlood)) / 100}</div>

      <div>Did someone kill your puppy Mr. Wick?</div>
      <div>Largest Killing Spree: {info.largestKillingSpree} with {info.largestKillingSpreeChamp}</div>

      <div>We all have bad days. Yours start when you see someone lock in this champ</div>
      <div>Died to {info.mostDiedToChampionId} the most. {info.mostDiedToChampionDeaths} times</div>
      <div>Worst Winrate Against {info.worstWinrateAgainstChampionId} at {info.worstWinrateAgainstChampionPercentage}</div>

      <div>On the other hand, here are the times you can play with ONE hand... haha (I'm sorry)</div>
      <div>Killed {info.mostKilledChampionId} the most. {info.mostKilledChampionKills} times</div>
      <div>Best Winrate Against {info.bestWinrateAgainstChampionId} at {info.bestWinrateAgainstChampionPercentage}</div>
    </div>
  );
}
// maybe include number of executions

export default App;
