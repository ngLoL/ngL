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
  const favChamps = favoriteChamps.map((champ, i) => {
    return (
      <Card key={i} favChamp={champ}></Card>
    );
  })
  return (
    <SectionWrapper>
      <ContentWrapper>
        <Caption>{children}</Caption>
        <CardsContainer>
          {favChamps}
        </CardsContainer>
      </ContentWrapper>
    </SectionWrapper>
  )
};

export default FavChampsCards;