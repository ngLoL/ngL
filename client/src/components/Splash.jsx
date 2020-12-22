import React from 'react';
import styled from 'styled-components';

const Splash = () => {
  const StyledSplashHeaderSummonerName = styled.h2`
    font-family: 'Roboto', san-serif;
  `;
  return (
    <div id="splash">
      <img src="https://nglol.s3-us-west-1.amazonaws.com/champion/splash/Aatrox_0.jpg" />
      <StyledSplashHeaderSummonerName>Jeongmo</StyledSplashHeaderSummonerName>
    </div>
  );
}

export default Splash;
