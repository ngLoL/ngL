import React from 'react';
import styled, { keyframes } from 'styled-components';
import SectionWrapper from './reuse/SectionWrapper.js';
import ContentWrapper from './reuse/ContentWrapper.js';

const StyledSplash = styled.div`
  width: 100%;
  height: 60rem;
  background: ${(props) => `radial-gradient(transparent, #161b22 70%),
  url('https://nglol.s3-us-west-1.amazonaws.com/champion/splash/${props.favChamp}_0.jpg')`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
`;

const animate = keyframes`
  0% {
    box-shadow: 0 0 5rem white,
    filter: hue-rotate(0deg);
  }
  50% {
    box-shadow: 0 0 5rem white;
  }
`;

const StyledProfilePic = styled.img`
  height: 15rem;
  border-radius: 100%;
  border: 0.2rem solid #FFD8DC;
  -webkit-box-reflect: below 1rem linear-gradient(transparent, transparent, #0002);
  animation: ${animate} 3s linear infinite;
`;

const Name = styled.div`
  text-align: center;
  font-size: 4rem;
  font-weight: 900;
  color: white;
`;

const Splash = ({ mostPlayedChamp, profileIconId, summonerName }) => (
  <SectionWrapper>
    <StyledSplash favChamp={mostPlayedChamp}>
      <ContentWrapper>
        <StyledProfilePic src={`https://nglol.s3-us-west-1.amazonaws.com/profileicon/${profileIconId}.png`} />
        <Name>{summonerName}</Name>
      </ContentWrapper>
    </StyledSplash>
  </SectionWrapper>
);

export default Splash;
