import React from 'react';
import styled, { keyframes } from 'styled-components';

const Splash = (props) => {
  const StyledSplash = styled.div`
    height: 500px;
    text-align: center;
    padding: 20% 0 10%;
    background: radial-gradient(transparent, #161b22 75%),
    url('https://nglol.s3-us-west-1.amazonaws.com/champion/splash/${props.mostChampionName}_0.jpg');
    background-repeat: no-repeat;
    background-size: 100% auto, 100% auto;
    background-position: center center;
    color: white;
    font-size: 40px;
    font-weight: 900;
  `;
  const animate = keyframes`
    0% {
      box-shadow: 0 0 50px white,
      filter: hue-rotate(0deg);
    }
    20% {
      box-shadow: 0 0 60px white;
    }

  `;
  const StyledProfilePic = styled.img`
    height: 150px;
    border-radius: 100%;
    border: 2px solid #FFD8DC;
    box-shadow: 0 0 50px #0c2d6b;
    -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0002);
    animation: ${animate} 5s linear infinite;
  `;

  return (
    <div id="splash">
      <StyledSplash>
        <StyledProfilePic src={`https://nglol.s3-us-west-1.amazonaws.com/profileicon/${props.profileIconId}.png`} />
        <div>{props.summonerName}</div>
      </StyledSplash>
    </div>
  );
}

export default Splash;
