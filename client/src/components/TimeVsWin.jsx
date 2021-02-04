import React, { useState } from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import Caption from './reuse/Caption.js';
import SectionWrapper from './reuse/SectionWrapper.js';

const BarWrapper = styled.div`
  width: 50%;
  margin: 10 auto;
`;

const TimeVsWin = (props) => {
  const data = {
    labels: ['0 min - 20 min', '20 min - 30 min', '30 min - 40 min', 'Past 40 min'],
    datasets: [
      {
        label: 'Game Wins',
        backgroundColor: 'rgba(30, 144, 255, 0.9)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 2,
        data: props.timeVsWins
      }
    ]
  };

  const options = {
    title: {
      display: true,
      text: 'Time vs Wins',
      fontSize: 12
    },
    legend: {
      display: true,
      position: 'right'
    }
  }

  return (
    <BarWrapper>
      <Caption>Early finisher, mid-game monster, or a late game degenerate</Caption>
      <Bar data={data} options={options} />
    </BarWrapper>
  );
};

export default TimeVsWin;
