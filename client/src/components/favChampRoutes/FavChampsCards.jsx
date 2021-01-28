import React from 'react';
import styled from 'styled-components';
import Caption from '../reuse/Caption.js';
import ContentWrapper from '../reuse/ContentWrapper.js';
import SectionWrapper from '../reuse/SectionWrapper.js';
import Card from './Card.jsx';


const CardsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 2.5rem;
  width: 100%;
`;


const FavChampsCards = ({children, favoriteChamps}) => {
  return (
    <SectionWrapper>
      <ContentWrapper>
        <Caption>{children}</Caption>
        <CardsContainer>
          <Card favChamp={favoriteChamps[0]}></Card>
          <Card favChamp={favoriteChamps[1]}></Card>
          <Card favChamp={favoriteChamps[2]}></Card>
        </CardsContainer>
      </ContentWrapper>
    </SectionWrapper>
  )
};

export default FavChampsCards;