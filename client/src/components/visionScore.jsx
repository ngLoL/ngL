import React from 'react';
import styled from 'styled-components';
import {IoMdTrophy} from 'react-icons/io';
import Caption from './reuse/Caption.js';
import ContentWrapper from './reuse/ContentWrapper.js';
import SectionWrapper from './reuse/SectionWrapper.js';

const StyledTrophy = styled(IoMdTrophy)`
  color: #ecd610;
  font-size: 30rem;
`;

const StyledVisionScore = styled.div`
  color: #000;
  font-size: 5rem;
  position: absolute;
  margin-top: -10rem;
`;

const TrophyContainer = styled.div`
  height: 30rem;
  width: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VisionScore = ({children, visionScore, numGames}) => {
  return (
    <SectionWrapper>
      <ContentWrapper>
        <Caption>{children}</Caption>
        <Caption>AVG VISION SCORE</Caption>
        <TrophyContainer>
          <StyledTrophy></StyledTrophy>
          <StyledVisionScore>{Math.round(100*(visionScore / numGames)) / 100}</StyledVisionScore>
        </TrophyContainer>
      </ContentWrapper>
    </SectionWrapper>
  )
}

export default VisionScore;