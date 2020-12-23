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
    axios.get(`/summoner/${summonerName}`)
      .then((results) => {
        return Promise.all([
          axios.get(`/gameModes/${results.data.id}`),
          results.data.accountId
        ])
      })
      .then(([queueType, accountId]) => {
        let totalRankGames = 0;
        const queueTypeArr = queueType.data;

        for (let i = 0; i < queueTypeArr.length; i++) {
          if (queueTypeArr[i].queueType === "RANKED_SOLO_5x5") {
            totalRankGames = queueTypeArr[i].wins + queueTypeArr[i].losses;
          }
        }

        if (!totalRankGames) {
          throw new Error(`You don't have any ranked solo games played`)
        }

        function axiosGetMatches(start, end) {
          return axios.get(`/matchHistoryPage/${accountId}&${start}&${end}`);
        }

        let matchHistoryPage = [];
        let length = Math.floor(totalRankGames / 100);
        for (let j = 0; j <= length; j++) {
          matchHistoryPage.push(axiosGetMatches(j * 100, Math.min(j * 100 + 100, totalRankGames)));
        }

        return Promise.all(matchHistoryPage);
      })
      .then((results) => console.log(results))
      .catch ((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <Splash />
      <div>Summoner ID: {summonerId}</div>
    </div>
  );
}

export default App;
