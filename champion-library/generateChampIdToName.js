const { data } = require('./champion.json');
const fs = require('fs');

const champIdToName = {};

for (const champion in data) {
  let key = data[champion]['key'];
  champIdToName[key] = champion;
}

let strChampIdToName = JSON.stringify(champIdToName);
fs.writeFileSync('./champion-library/champIdToName.json', strChampIdToName);
