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
      .then(results => {
        setSummonerName(results.data.name);
        return axios.get(`/gameModes/${results.data.id}&${results.data.accountId}`)
      })
      .then(results => {
        const totalRankGames = results.data.totalRankGames;
        const accountId = results.data.accountId;
        const start = 0;
        const end = 10;

        if (!totalRankGames) {
          throw new Error(`You don't have any ranked solo games played`)
        }

        return axios.get(`/matchHistoryPage/${accountId}&${start}&${end}`);
      })
      .then((results) => {
        let mostChampionName = getChampionName(results.data.mostChampionId);
        setMostChampionName(mostChampionName);

        const matchStorage = results.data.gameIds.map(gameId => axios.get(`/individualMatch/${gameId}`));

        return Promise.all(matchStorage);
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
      {mostChampionName != '' && <Splash mostChampionName={mostChampionName} />}
      <div>Summoner Name: {summonerName}</div>
      <div>Most Played Champion: {mostChampionName}</div>
    </div>
  );
}

export default App;
