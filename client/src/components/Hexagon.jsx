import React, { useState } from 'react';
import styled from 'styled-components';
import { Radar } from 'react-chartjs-2';
import Caption from './reuse/Caption.js';
import ContentWrapper from './reuse/ContentWrapper.js';
import SectionWrapper from './reuse/SectionWrapper.js';

const ButtonGroup = styled.div`
  display: flex;
`;

const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
`;

const proDataSets = [
  {
    label: "Faker",
    backgroundColor: "rgba(255, 89, 61, 0.2)",
    borderColor: "rgba(255, 99, 71, 0.3)",
    pointBackgroundColor: "rgba(255, 99, 71, 0.8)",
    data: [0.75, 0.75, 0.75, 0.75, 0.75, 0.75],
    stat: [4.98, 8.91, 61.2, 66.4, 26.2, 1.25],
  },
  {
    label: "Nuguri",
    backgroundColor: "rgba(68, 181, 185, 0.2)",
    borderColor: "rgba(68, 181, 185, 0.3)",
    pointBackgroundColor: "rgba(68, 181, 185, 0.8)",
    data: [0.75, 0.75, 0.75, 0.75, 0.75, 0.75],
    stat: [3.28, 8.71, 67.8, 61.5, 27.3, 1.04],
  },
  {
    label: "Beryl",
    backgroundColor: "rgba(75, 0, 130, 0.2)",
    borderColor: "rgba(75, 0, 130, 0.5)",
    pointBackgroundColor: "rgba(75, 0, 130, 0.8)",
    data: [0.75, 0.75, 0.75, 0.75, 0.75, 0.75],
    stat: [3.58, 1.98, 71.6, 60.8, 9.1, 2.8],
  },
  {
    label: "Canyon",
    backgroundColor: "rgba(62, 203, 67, 0.2)",
    borderColor: "rgba(62, 203, 67, 0.5)",
    pointBackgroundColor: "rgba(62, 203, 67, 0.8)",
    data: [0.75, 0.75, 0.75, 0.75, 0.75, 0.75],
    stat: [4.54, 5.81, 67.8, 67.4, 14.7, 1.73],
  },
  {
    label: "Ruler",
    backgroundColor: "rgba(229, 220, 89, 0.2)",
    borderColor: "rgba(229, 220, 89, 0.5)",
    pointBackgroundColor: "rgba(229, 220, 89, 0.8)",
    data: [0.75, 0.75, 0.75, 0.75, 0.75, 0.75],
    stat: [6.12, 9.82, 66.9, 67.8, 31.2, 1.58],
  },
];

// conditional rendering
// if (state == faker or 0 or key) { render that player's hexagon }
const Hexagon = (props) => {
  const { kda, cs, winRate, killParticipation, teamDamage, visionScore, summonerName } = props;
  const [ proDataSet, setProDataSet ] = useState(proDataSets[0]);
  const userData = [ kda, cs, winRate, killParticipation, teamDamage, visionScore ];

  const userDataSet = {
    label: summonerName,
    backgroundColor: "rgba(200, 200, 200, 0.2)",
    borderColor: "rgba(200, 200, 200, 0.3)",
    pointBackgroundColor: "rgba(200, 200, 200, 0.8)",
    data: userData.map((stat, key) => 0.75 * stat / proDataSet.stat[key]),
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
        <ButtonGroup>
          {proDataSets.map((proData, key) => (
            <Tab key={key} onClick={() => setProDataSet(proData)}>{proData.label}</Tab>
          ))}
        </ButtonGroup>
        {<Radar data={data} options={options}></Radar>}
      </div>
    </SectionWrapper>
  );
};

export default Hexagon;