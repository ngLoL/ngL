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
    mostDiedToChampion: 0,
    mostKilledChampion: 0,
    worstWinrateAgainst: 0,
    bestWinrateAgainst: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    cs: 0,
    gameDuration: 0,
    numOfGames: 0,
    totalPinkWardsBought: 0,
    doubleKills: 0,
    tripleKills: 0,
    quadraKills: 0,
    pentaKills: 0,
    visionScore: 0,
    numOfTeamKills: 0,
    totalDamageToChamps: 0,
    totalTeamDamage: 0,
    longestTimeSpentLiving: 0,
    goldSpent: 0,
    goldEarned: 0,
    timeCCingOthers: 0,
    numOfFirstBlood: 0,
    largestKillingSpree: 0,
    largestKillingSpreeChamp: 0,
    largestKillingSpreeMatchId: 0,
    favoriteChamps: {
      '1': {
        totalNumberOfGames: 0,
        numberOfGamesWon: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        cs: 0,
        gameDuration: 0,
        totalDamageToChamps: 0,
      },
      '2': {
        totalNumberOfGames: 0,
        numberOfGamesWon: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        cs: 0,
        gameDuration: 0,
        totalDamageToChamps: 0,
      },
      '3': {
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
    numOfExecutions: 0,
    gamesUnder20: 0,
    gamesUnder30: 0,
    gamesUnder40: 0,
    gamesPast40: 0,
    gamesWonUnder20: 0,
    gamesWonUnder30: 0,
    gamesWonUnder40: 0,
    gamesWonPast40: 0,
  });


  useEffect(() => {
    getSummonerInfo('Iceh');
  }, []);

  const getSummonerInfo = (summonerName) => {
    axios.get(`/summoner/${summonerName}`)
      .then((results) => {
        const championName = getChampionName(results.data.mostChampionId);
        setInfo({mostPlayedChampionName: championName})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {info.mostPlayedChampion != 0 && <Splash mostChampionName={info.mostPlayedChampion} />}
      <div>Summoner Name: {summonerName}</div>
      <div>Most Played Champion: {mostChampionName}</div>

      <div>We'll give the boring stuff first.</div>
      <div>Avg KDA: {Math.round(100*((info.kills + info.assists) / info.deaths)) / 100}</div>
      <div>Avg Kills: {Math.round(100*(info.kills / info.numOfGames)) / 100}</div>
      <div>Avg Deaths: {Math.round(100*(info.deaths / info.numOfGames)) / 100}</div>
      <div>Avg Assits: {Math.round(100*(info.assists / info.numOfGames)) / 100}</div>
      <div>Avg CS/min: {Math.round(100*(info.cs / (info.gameDuration / 60))) / 100}</div>

      <div>Now here are more mildly interesting stats</div>

      <div>Are you good at last hitting?</div>
      <div>Double Kills:{info.doubleKills} Triple Kill: {info.tripleKills} QuadraKills: {info.quadraKills} PentaKills: {info.pentaKills}</div>

      <div>Just to show that supports are more than just wards these days. They are also this.</div>
      <div>Avg Vision Score: {Math.round(100*(info.visionScore / info.numOfGames)) / 100}</div>

      <div>Reminder: League is a team game.</div>
      <div>Avg KP: {Math.round(100*((info.kills + info.assists) / info.numOfTeamKills)) / 100}%</div>

      <div>Let's be honest about how much you contributed though.</div>
      <div>Avg Percentage of Team Damage: {Math.round(100*(info.totalDamageToChamps / info.totalTeamDamage)) / 100}%</div>

      <div>Longest time you went without seeing the gray screen</div>
      <div>Stayed Alive for {Math.floor(info.longestTimeSpentLiving / 60)} minutes and {Math.floor(info.longestTimeSpentLiving % 60)} seconds</div>
      <div>Glad to know you weren't that bad for one game</div>

      <div>We all have bad days. Yours are when you play these champs.</div>
      <div></div>

      <div>What Riot should actually be putting in the loading screen.</div>
      <div>Fun fact: gold you don't spend doesn't transfer to the next game.</div>
      <div>Gold wasted: {info.goldEarned - info.goldSpent}</div>

      <div>This is the amount of time you didn't let others play League of Legends. Poor soul(s)</div>
      <div>Time Spent Ccing Others: {info.timeCCingOthers}</div>
      <div>This is the equivalent to getting hit by {Math.round(100*(info.timeCCingOthers / 3)) / 100} Morgana Q's.</div>

      <div>Friendly reminder that killing champions isn't the only way to obtain gold</div>
      <div>Percentage of First Bloods: {Math.round(100*(info.numOfFirstBlood / info.numOfGames)) / 100}</div>

      <div>Did someone kill your puppy Mr. Wick?</div>
      <div>Largest Killing Spree: {info.largestKillingSpree} with {info.largestKillingSpreeChamp}</div>

      <div>Stop shaking when you see these champs</div>

      <div>Here are the times you can play with one hand</div>

      <div>You seem to like these champs a lot, but how good at them are you exactly?</div>

    </div>
  );
}

export default App;
