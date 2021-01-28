import React from 'react';
import styled from 'styled-components';
import Card from './Card.jsx';
import Caption from '../reuse/Caption.js';
import ContentWrapper from '../reuse/ContentWrapper.js';
import SectionWrapper from '../reuse/SectionWrapper.js';


const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;


const HolisticStatsCard = ({children, kills, deaths, assists, cs, gameDuration, numGames}) => {
  return (
    <SectionWrapper odd>
      <ContentWrapper>
        <Caption>{children}</Caption>
        <CardWrapper>
          <Card kda={'AVG KDA'}>{Math.round(100*((kills + assists) / deaths)) / 100}</Card>
          <Card kills={'AVG KILLS'}>{Math.round(100*(kills / numGames)) / 100}</Card>
          <Card deaths={'AVG DEATHS'}>{Math.round(100*(deaths / numGames)) / 100}</Card>
          <Card assists={'AVG ASSISTS'}>{Math.round(100*(assists / numGames)) / 100}</Card>
          <Card csPerMin={'AVG CS/MIN'}>{Math.round(100*(cs / (gameDuration / 60))) / 100}</Card>
        </CardWrapper>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default HolisticStatsCard;