import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getChampionName} from '../../../champion-library/helper.js';
import Splash from './Splash.jsx';
import SearchBar from './SearchBar.jsx';

const App = () => {
  const [summonerName, setSummonerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mostPlayedChampionName, setMostPlayedChampionName] = useState('');
  const [kills, setKills] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [assists, setAssists] = useState(0);
  const [cs, setCs] = useState(0);
  const [gameLength, setGameLength] = useState(0);
  const [numOfGames, setNumOfGames] = useState(0);
  const [totalPinkWards, setTotalPinkWards] = useState(0);
  const [doubleKills, setDoubleKills] = useState(0);
  const [tripleKills, setTripleKills] = useState(0);
  const [quadraKills, setQuadraKills] = useState(0);
  const [pentaKills, setPentaKills] = useState(0);
  const [visionScore, setVisionScore] = useState(0);
  const [numOfObjectives, setNumOfObjectives] = useState(0);
  const [totalTeamKills, setTotalTeamKills] = useState(0);
  const [totalDamageToChamps, setTotalDamageToChamps] = useState(0);
  const [teamDamage, setTeamDamage] = useState(0);
  const [stayingAlive, setStayingAlive] = useState(0);

  //ez opponents and dreaded enemies

  //most kills and best winrate against
  //most deaths and worst winrate against

  // how many times you have been executed
  // type of drake killed

  // we need champion specific information for top 3 most played
  // totalNumberOfGames, numberOfGamesWon, kills, deaths, assists

  // also need best champion for each category
  // avg cs/min, damage per death, kda, win rate

  //game time avg vs win rate


  //firstBlood percentage

  //timeCCing others

  //kill participation
  // totalDamageDealtToChampions
  //largestKillingSpree
  //goldSpent goldEarned
  //damageDealtToObjectives




  useEffect(() => {
    getSummonerInfo('Iceh');
  }, []);

  function getSummonerInfo(summonerName) {
    axios.get(`/summoner/${summonerName}`)
      .then((results) => {
        const championName = getChampionName(results.data.mostChampionId);
        setMostPlayedChampionName(championName)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {mostPlayedChampionName != '' && <Splash mostPlayedChampionName={mostPlayedChampionName} />}
      <div>Avg KDA: {Math.round(100*((kills + assists) / deaths)) / 100}</div>
      <div>Avg CS/min: {Math.round(100*(cs / (gameLength / 60))) / 100}</div>
      <div>Just to show that supports are more than just wards these days. They are also this stat.</div>
      <div>Avg Vision Score: {Math.round(100*(visionScore / numOfGames)) / 100}</div>
      <div>Reminder: League is a team game</div>
      <div>Avg KP: {Math.round(100*((kills + assists) / totalTeamKills)) / 100}%</div>
      <div>Sure you previous stat may have you bragging to your friends, but let's be honest about how much contributed</div>
      <div>Avg Percentage of Team Damage: {Math.round(100*(totalDamageToChamps / teamDamage)) / 100}%</div>
      <div>Longest time you went without seeing the gray screen</div>
      <div>Stayed Alive for {Math.floor(stayingAlive / 60)} minutes and {Math.floor(stayingAlive % 60)} seconds</div>
      <div>You are the god of last hitting. Here are your multikills</div>
      <div>Double Kills:{doubleKills} Triple Kill: {tripleKills} QuadraKills: {quadraKills} PentaKills: {pentaKills}</div>
      <div>We all have bad days. Yours are when you play these champs.</div>
      <div>Summoner Name: {summonerName}</div>
      <div>Most Played Champion: {mostPlayedChampionName}</div>
    </div>
  );
}

export default App;
