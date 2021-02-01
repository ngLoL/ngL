import React, { useState } from 'react';
import styled from 'styled-components';
import { Radar } from 'react-chartjs-2';
import Caption from './reuse/Caption.js';
import ContentWrapper from './reuse/ContentWrapper.js';
import SectionWrapper from './reuse/SectionWrapper.js';

const proDataSets = [
  {
    label: "Faker",
    backgroundColor: "rgba(255, 89, 61, 0.2)",
    borderColor: "rgba(255, 99, 71, 0.3)",
    pointBackgroundColor: "rgba(255, 99, 71, 0.8)",
    data: [4.98, 8.91, 61.2, 66.4, 26.2, 1.25],
  },
  {
    label: "Nuguri",
    backgroundColor: "rgba(255, 89, 61, 0.2)",
    borderColor: "rgba(255, 99, 71, 0.3)",
    pointBackgroundColor: "rgba(255, 99, 71, 0.8)",
    data: [3.28, 8.71, 67.8, 61.5, 27.3, 1.04],
  }
];

// conditional rendering
// if (state == faker or 0 or key) { render that player's hexagon }
const Hexagon = (props) => {
  const { kda, cs, winRate, killParticipation, teamDamage, visionScore, summonerName } = props;
  const [ proDataSet, setProDataSet ] = useState(proDataSets[0]);

  const handleClick = () => {
    setProDataSet(proDataSets[1]);
  }

  const userDataSet = {
    label: summonerName,
    backgroundColor: "rgba(200, 200, 200, 0.2)",
    borderColor: "rgba(200, 200, 200, 0.3)",
    pointBackgroundColor: "rgba(200, 200, 200, 0.8)",
    data: [ kda, cs, winRate, killParticipation, teamDamage, visionScore ],
  }

  const data = {
    labels: ["KDA", "CS/min", "Win Rate", "Kill Participation", "Team Damage", "Vision Score per min"],
    datasets: [
      userDataSet,
      proDataSet,
    ],
  };

  const options = {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Your Hexagon',
    },
    scale: {
      gridLines: {
        color: "rgba(96, 96, 96, 0.8)"
      },
      angleLines: {
        color: "rgba(96, 96, 96, 0.8)"
      },
      ticks: {
        display: false,
        maxTicksLimit: 3
      },
      reverse: false,
    },
    ticks: {
      beginAtZero: true,
    },
  };

  return (
    <SectionWrapper>
      <Caption>Have you ever dreamed of becoming Faker?</Caption>
      <div id="hexagon">
        <button onClick={handleClick}>{proDataSet.label}</button>
        {<Radar data={data} options={options}></Radar>}
      </div>
    </SectionWrapper>
  );
};

export default Hexagon;