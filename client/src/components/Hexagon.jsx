import React, { useState } from 'react';
import styled from 'styled-components';
import { Radar } from 'react-chartjs-2';
import Caption from './reuse/Caption.js';
import ContentWrapper from './reuse/ContentWrapper.js';
import SectionWrapper from './reuse/SectionWrapper.js';

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  height: 5rem;
`;

const Tab = styled.button`
  font-size: 2rem;
  color: white;
  padding: 1rem 6rem;
  cursor: pointer;
  opacity: ${(props) => {
    if (props.index === props.active) {
      return '1';
    }
    return '0.6';
  }};
  background: transparent;
  border: none;
  border-bottom: ${(props) => {
    if (props.index === props.active) {
      return '0.2rem solid white';
    }
    return 'none';
  }};
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const RadarContainer = styled.div`
  width: 100%;
  height: 60rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const proDataSets = [
  {
    label: 'Nuguri',
    position: 'TOP',
    backgroundColor: 'rgba(68, 181, 185, 0.2)',
    borderColor: 'rgba(68, 181, 185, 0.3)',
    pointBackgroundColor: 'rgba(68, 181, 185, 0.8)',
    data: [0.85, 0.85, 0.85, 0.85, 0.85, 0.85],
    stat: [3.28, 8.71, 67.8, 61.5, 27.3, 1.04],
  },
  {
    label: 'Canyon',
    position: 'JUNGLE',
    backgroundColor: 'rgba(62, 203, 67, 0.2)',
    borderColor: 'rgba(62, 203, 67, 0.5)',
    pointBackgroundColor: 'rgba(62, 203, 67, 0.8)',
    data: [0.75, 0.75, 0.75, 0.75, 0.75, 0.75],
    stat: [4.54, 5.81, 67.8, 67.4, 14.7, 1.73],
  },
  {
    label: 'Faker',
    position: 'MID',
    backgroundColor: 'rgba(255, 89, 61, 0.2)',
    borderColor: 'rgba(255, 99, 71, 0.3)',
    pointBackgroundColor: 'rgba(255, 99, 71, 0.8)',
    data: [0.75, 0.75, 0.75, 0.75, 0.75, 0.75],
    stat: [4.98, 8.91, 61.2, 66.4, 26.2, 1.25],
  },
  {
    label: 'Ruler',
    position: 'ADC',
    backgroundColor: 'rgba(229, 220, 89, 0.2)',
    borderColor: 'rgba(229, 220, 89, 0.5)',
    pointBackgroundColor: 'rgba(229, 220, 89, 0.8)',
    data: [0.75, 0.75, 0.75, 0.75, 0.75, 0.75],
    stat: [6.12, 9.82, 66.9, 67.8, 31.2, 1.58],
  },
  {
    label: 'BeryL',
    position: 'SUPPORT',
    backgroundColor: 'rgba(75, 0, 130, 0.2)',
    borderColor: 'rgba(75, 0, 130, 0.5)',
    pointBackgroundColor: 'rgba(75, 0, 130, 0.8)',
    data: [0.75, 0.75, 0.75, 0.75, 0.75, 0.75],
    stat: [3.58, 1.98, 71.6, 60.8, 9.1, 2.8],
  },
];

const Hexagon = ({
  children, kda, cs, winRate, killParticipation, teamDamage, visionScore, summonerName,
}) => {
  const [proDataSet, setProDataSet] = useState(proDataSets[0]);
  const [select, setSelect] = useState(0);
  const userData = [kda, cs, winRate, killParticipation, teamDamage, visionScore];

  const userDataSet = {
    label: summonerName,
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
    borderColor: 'rgba(200, 200, 200, 0.3)',
    pointBackgroundColor: 'rgba(200, 200, 200, 0.8)',
    data: userData.map((stat, key) => 0.85 * stat / proDataSet.stat[key]),
  };

  const data = {
    labels: ['KDA', 'CS/min', 'Win Rate', 'Kill Participation', 'Team Damage', 'Vision Score per min'],
    datasets: [
      userDataSet,
      proDataSet,
    ],
  };

  const options = {
    legend: {
      position: 'top',
    },
    scale: {
      gridLines: {
        color: 'rgba(96, 96, 96, 0.8)',
      },
      angleLines: {
        color: 'rgba(96, 96, 96, 0.8)',
      },
      ticks: {
        display: false,
        maxTicksLimit: 3,
      },
      reverse: false,
    },
    ticks: {
      beginAtZero: true,
    },
  };

  return (
    <SectionWrapper>
      <ContentWrapper>
        <Caption>{children}</Caption>
        <ButtonGroup>
          {proDataSets.map((proData, i) => (
            <Tab
              key={i}
              index={i}
              active={select}
              onClick={() => { setProDataSet(proData); setSelect(i); }}
            >
              {proData.position}
            </Tab>
          ))}
        </ButtonGroup>
        <RadarContainer>
          <Radar data={data} options={options} />
        </RadarContainer>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default Hexagon;
