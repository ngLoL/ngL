import React from 'react';
import styled from 'styled-components';

const Splash = (props) => {
  const StyledSplashHeading = styled.div`
    background-image: url('https://nglol.s3-us-west-1.amazonaws.com/champion/splash/${props.mostChampionName}_0.jpg');
    background-repeat: no-repeat;
    height: 400px;
    color: white;
  `;
  const StyledSplashSummonerName = styled.h2`
    font-family: 'Roboto', san-serif;
  `;
  return (
    <div id="splash">
      <StyledSplashHeading></StyledSplashHeading>
      <StyledSplashSummonerName></StyledSplashSummonerName>
    </div>
  );
}

export default Splash;
