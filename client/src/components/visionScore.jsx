import React, {useState} from 'react';
import styled from 'styled-components';
import {IoMdTrophy} from 'react-icons/io';
import Confetti from 'react-dom-confetti';
import Caption from './reuse/Caption.js';
import ContentWrapper from './reuse/ContentWrapper.js';
import SectionWrapper from './reuse/SectionWrapper.js';

const leftConfetti = {
  angle: 45,
  spread: 30,
};

const rightConfetti = {
  angle: 135,
  spread: 30,
}

const StyledTrophy = styled(IoMdTrophy)`
  color: #ecd610;
  font-size: 30rem;
`;

const StyledVisionScore = styled.div`
  color: #000;
  font-size: 4rem;
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

const ConfettiContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const TrophyName = styled.div`
  color: #000;
  font-size: 1.5rem;
  position: absolute;
  margin-top: 21.6rem;
`;


const VisionScore = ({children, visionScore, numGames}) => {
  const [confetti, setConfetti] = useState(false);

  const visibility = (boolean) => {
    if (boolean) {
      return <StyledVisionScore>{Math.round(100*(visionScore / numGames)) / 100}</StyledVisionScore>;
    }
  }
  return (
    <SectionWrapper>
      <ContentWrapper>
        <Caption>{children}</Caption>
        <Caption>Click on the Trophy!</Caption>
        <TrophyContainer onClick={() => setConfetti(true)}>
          <StyledTrophy></StyledTrophy>
          {visibility(confetti)}
          <TrophyName>AVG VISION SCORE</TrophyName>
        </TrophyContainer>
        <ConfettiContainer>
          <Confetti active={confetti} config={leftConfetti}></Confetti>
          <Confetti active={confetti} config={rightConfetti}></Confetti>
        </ConfettiContainer>
      </ContentWrapper>
    </SectionWrapper>
  )
}

export default VisionScore;