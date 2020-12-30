import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getChampionName} from '../../../champion-library/helper.js';
import Splash from './Splash.jsx';
import SearchBar from './SearchBar.jsx';

const App = () => {
  const [summonerName, setSummonerName] = useState('');
  const [summonerId, setSummonerId] = useState('');
  const [mostChampionName, setMostChampionName] = useState('');

  useEffect(() => {
    getSummonerInfo('Jeongmo');
  }, []);

  function getSummonerInfo(summonerName) {
    axios.get(`/summoner/${summonerName}`)
      .then((results) => {
        setSummonerName(results.data.name);
        return Promise.all([
          axios.get(`/gameModes/${results.data.id}`),
          results.data.accountId
        ]);
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
        matchHistoryPage.push(axiosGetMatches(0, Math.min(10, totalRankGames)));
        // let length = Math.floor(totalRankGames / 100);
        // for (let j = 0; j <= length; j++) {
        //   matchHistoryPage.push(axiosGetMatches(j * 100, Math.min(j * 100 + 100, totalRankGames)));
        // }

        return Promise.all(matchHistoryPage);
      })
      .then((results) => {
        let matchStorage = [];
        let playedChampions = {};
        for (let i = 0; i < results.length; i++) {
          let matchHistory = results[i].data.matches;
          for (let j = 0; j < matchHistory.length; j++) {
            // count how many times each champion was played
            let champion = matchHistory[j].champion;
            if (!playedChampions[champion]) {
              playedChampions[champion] = 1;
            } else {
              playedChampions[champion]++;
            }
            matchStorage.push(axios.get(`/individualMatch/${matchHistory[j].gameId}`));
          }
        }

        let mostChampionId = Object.keys(playedChampions).reduce((a, b) => playedChampions[a] > playedChampions[b] ? a : b);
        let mostChampionName = getChampionName(mostChampionId);
        setMostChampionName(mostChampionName);
        return Promise.all(matchStorage)
      })
      .then((results) => {
        let datas = results.map(({data}) => data);
        console.log(datas);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      {mostChampionName != '' && <Splash mostChampionName={mostChampionName}/>}
      <div>Summoner Name: {summonerName}</div>
      <div>Most Played Champion: {mostChampionName}</div>
    </div>
  );
}

export default App;
