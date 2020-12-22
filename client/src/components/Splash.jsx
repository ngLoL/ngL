import React from 'react';
import styled from 'styled-components';

const Splash = () => {
  const StyledSplashHeading = styled.div`
    background-image: url('https://nglol.s3-us-west-1.amazonaws.com/champion/splash/Aatrox_0.jpg');
    background-repeat: no-repeat;
    height: 400px;
  `;
  const StyledSplashSummonerName = styled.h2`
    font-family: 'Roboto', san-serif;
  `;
  return (
    <div id="splash">
      <StyledSplashHeading>Aatrox</StyledSplashHeading>
      <StyledSplashSummonerName>Jeongmo</StyledSplashSummonerName>
    </div>
  );
}

export default Splash;
