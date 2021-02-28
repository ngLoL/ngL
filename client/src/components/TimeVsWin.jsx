import React from 'react';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import Caption from './reuse/Caption.js';
import ContentWrapper from './reuse/ContentWrapper.js';
import SectionWrapper from './reuse/SectionWrapper.js';

const ChartsContainer = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChartWrapper = styled.div`
  width: 30rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 700;
  color: #fff;
  font-size: 2.5rem;
`;

const TimeVsWin = ({
  children, winsUnder20, winsUnder30, winsUnder40, winsPast40, gamesUnder20, gamesUnder30, gamesUnder40, gamesPast40,
}) => {
  const under20 = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        label: 'Games',
        data: [winsUnder20, (gamesUnder20 - winsUnder20)],
        backgroundColor: ['rgba(30, 144, 255, 0.3)', 'rgba(255, 99, 71, 0.3)'],
        borderColor: ['rgba(30, 144, 255, 1)', 'rgba(255, 99, 71, 1)'],
        borderWidth: 2,
      },
    ],
  };

  const under30 = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        label: 'Games',
        data: [winsUnder30, (gamesUnder30 - winsUnder30)],
        backgroundColor: ['rgba(30, 144, 255, 0.3)', 'rgba(255, 99, 71, 0.3)'],
        borderColor: ['rgba(30, 144, 255, 1)', 'rgba(255, 99, 71, 1)'],
        borderWidth: 2,
      },
    ],
  };

  const under40 = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        label: 'Games',
        data: [winsUnder40, (gamesUnder40 - winsUnder40)],
        backgroundColor: ['rgba(30, 144, 255, 0.3)', 'rgba(255, 99, 71, 0.3)'],
        borderColor: ['rgba(30, 144, 255, 1)', 'rgba(255, 99, 71, 1)'],
        borderWidth: 2,
      },
    ],
  };

  const past40 = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        label: 'Games',
        data: [winsPast40, (gamesPast40 - winsPast40)],
        backgroundColor: ['rgba(30, 144, 255, 0.3)', 'rgba(255, 99, 71, 0.3)'],
        borderColor: ['rgba(30, 144, 255, 1)', 'rgba(255, 99, 71, 1)'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <SectionWrapper>
      <ContentWrapper>
        <Caption>{children}</Caption>
        <ChartsContainer>
          {gamesUnder20 > 0
            && (
              <div>
                <Title>Games Under 20 Min</Title>
                <ChartWrapper>
                  <Pie data={under20} />
                </ChartWrapper>
              </div>
            )}
          {gamesUnder30 > 0
            && (
              <div>
                <Title>Games From 20-30 Min</Title>
                <ChartWrapper>
                  <Pie data={under30} />
                </ChartWrapper>
              </div>
            )}
          {gamesUnder40 > 0
            && (
              <div>
                <Title>Games From 30-40 Min</Title>
                <ChartWrapper>
                  <Pie data={under40} />
                </ChartWrapper>
              </div>
            )}
          {gamesPast40 > 0
            && (
              <div>
                <Title>Games Past 40 Min</Title>
                <ChartWrapper>
                  <Pie data={past40} />
                </ChartWrapper>
              </div>
            )}
        </ChartsContainer>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default TimeVsWin;
