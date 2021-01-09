import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getChampionName} from '../../../champion-library/helper.js';
import Splash from './Splash.jsx';
import SearchBar from './SearchBar.jsx';

const App = () => {
  const [summonerName, setSummonerName] = useState('');
  const [mostChampionName, setMostChampionName] = useState('');

  useEffect(() => {
    getSummonerInfo('HippoSnuggler');
  }, []);

  function getSummonerInfo(summonerName) {
    axios.get(`/summoner/${summonerName}`)
      .then(({data: {name, id, accountId}}) => {
        setSummonerName(name);
        return Promise.all([axios.get(`/numRankGames/${id}`), accountId]);
      })
      .then(([{data: {numRankGames}}, accountId]) => {
        if (numRankGames === '0') {
          throw new Error(`You don't have enough ranked solo games played`);
        }

        return axios.get(`/matchHistoryPage/${accountId}&0&10`);
      })
      .then(({data: {mostChampionId, gameIds}}) => {
        let mostChampionName = getChampionName(mostChampionId);
        setMostChampionName(mostChampionName);

        const matchStorage = gameIds.map(gameId => axios.get(`/individualMatch/${gameId}`));

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
