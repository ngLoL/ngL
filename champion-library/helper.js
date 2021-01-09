var championJson = require('./champIdToName.json');

module.exports = {
  getChampionName: (championId) => {
    return championJson[championId];
  }
}