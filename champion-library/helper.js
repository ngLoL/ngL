var championJson = require('./champion.json');

let championsData = JSON.parse(JSON.stringify(championJson)).data;

module.exports = {
  getChampionName: (championId) => {
    for (var champion in championsData) {
      if (championsData[champion].key == championId) {
        return champion;
      }
    }
  }
}