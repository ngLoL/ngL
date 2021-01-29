import React from 'react';
import styled from 'styled-components';
import Caption from '../reuse/Caption.js';
import SectionWrapper from '../reuse/SectionWrapper.js';
import ContentWrapper from '../reuse/ContentWrapper.js';
import Card from './Card.jsx';

const CardsContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 2.5rem;
  flex-wrap: wrap;
  transform-style: preserve-3d;
`;

const MultiKillsCards = ({children, doubleKills, tripleKills, quadraKills, pentaKills}) => {
  return (
    <SectionWrapper>
      <ContentWrapper>
        <Caption>{children}</Caption>
        <CardsContainer>
          <Card type="double">{doubleKills}</Card>
          <Card type="triple">{tripleKills}</Card>
          <Card type="quadra">{quadraKills}</Card>
          <Card type="penta">{pentaKills}</Card>
        </CardsContainer>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default MultiKillsCards;