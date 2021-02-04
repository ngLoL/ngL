import React from 'react';
import styled, { keyframes } from 'styled-components';
import SectionWrapper from './reuse/SectionWrapper.js';
import ContentWrapper from './reuse/ContentWrapper.js';

const StyledSplash = styled.div`
  width: 100%;
  height: 60rem;
  background: ${(props) => `radial-gradient(transparent, #161b22 75%),
  url('https://nglol.s3-us-west-1.amazonaws.com/champion/splash/${props.favChamp}_0.jpg')`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

const StyledProfilePic = styled.img`
  height: 150px;
  border-radius: 100%;
  border: 2px solid #FFD8DC;
  -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0002);
  animation: ${animate} 3s linear infinite;
`;

const animate = keyframes`
  0% {
    box-shadow: 0 0 50px white,
    filter: hue-rotate(0deg);
  }
  50% {
    box-shadow: 0 0 60px white;
  }
`;

const Name = styled.div`
  text-align: center;
  font-size: 4rem;
  font-weight: 900;
  color: white;
`;

const Splash = (props) => {
  return (
    <SectionWrapper>
      <StyledSplash favChamp={props.mostPlayedChamp}>
        <ContentWrapper>
          <StyledProfilePic src={`https://nglol.s3-us-west-1.amazonaws.com/profileicon/${props.profileIconId}.png`} />
          <Name>{props.summonerName}</Name>
        </ContentWrapper>
      </StyledSplash>
    </SectionWrapper>
  );
}

export default Splash;
