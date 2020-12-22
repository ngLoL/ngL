import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Splash from './Splash.jsx';
import SearchBar from './SearchBar.jsx';

const App = () => {
  const [summonerName, setSummonerName] = useState('');
  const [summonerId, setSummonerId] = useState('');

  useEffect(() => {
    getSummonerInfo('Jeongmo');
  }, []);

  function getSummonerInfo(summonerName) {
    axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=RGAPI-a7d80df9-cb0c-4deb-9cbe-1c22e5a73be1`)
      .then((results) => {
        setSummonerId(results.id);
      })
      .catch((err) => {
        console.error(err);
      });
  }


  // axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`)
  // .then((results) => {
  //   return axios.all([axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${results.id}`), axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${results.accountId}?queue=420&beginIndex=0`)])
  // })
  // .then(axios.spread(...resultsArr) => {
  //   const queueTypeArr = resultsArr[0];
  //   let totalRankGames = 0;
  //   const matchesArr = resultsArr[1].matches;

  //   for (let i = 0; i < queueTypeArr.length; i++) {
  //     if (queueTypeArr[i].queueType === "RANKED_SOLO_5x5") {
  //       totalRankGames = queueTypeArr[i].wins + queueTypeArr[i].losses;
  //     }
  //   }

  //   if (!totalRankGames) {
  //     throw new Error(`You don't have any ranked solo games played`)
  //   }


  //   // to access every
  //   let matchRequests = [];
  //   let time = Math.floor(totalRankGames / 100); // totalRankGames = 708, time = 7
  //   let remainder = totalRankGames % 100; // remainder = 8
  //   for (let j = 0; j < time; j++) {
  //     axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${results.accountId}?queue=420&endIndex=${j * 100 + 100}&beginIndex=${j * 100}`)
  //   }
  //   axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${results.accountId}?queue=420&endIndex=${j * 100 + remainder}&beginIndex=${j * 100}`)
  // });

  return (
    <div>
      <Splash />
      <div>Summoner ID: {summonerId}</div>
    </div>
  );
}

export default App;
