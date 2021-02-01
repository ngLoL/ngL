import React, {useState} from 'react';
import styled from 'styled-components';
import Stat from './Stat.jsx';

const StyledCard = styled.div`
  width: 30.8rem;
  height: 56rem;
  perspective: 100rem;
`;

const InnerCard = styled.div`
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
  transform: ${(props) => {
    if (props.front) {
      return 'rotateY(180deg)'
    } else {
      return 'rotateY(0deg)'
    }
  }};
`;

const ImgWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 2rem;
  box-shadow: 0px 3px 18px 3px var(--shadow);
`;

const LoadingImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const StatsWrapper = styled.div`
  transform: rotateY(180deg);
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    overflow: hidden;
    border-radius: 2rem;
    box-shadow: 0px 3px 18px 3px var(--shadow);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    -webkit-box-align: center;
    background-color: var(--bg);
    align-items: center;
`;


const Card = ({favChamp}) => {
  const [flip, setFlip] = useState(false);

  return (
    <StyledCard>
      <InnerCard front={flip} onClick={() => setFlip(!flip)}>
        <ImgWrapper>
          <LoadingImg src="https://loadingscreenimg.s3-us-west-1.amazonaws.com/Aatrox_0.jpg" alt="Loading Screen Image of Champion"></LoadingImg>
        </ImgWrapper>
        <StatsWrapper>
          <Stat games={'GAMES PLAYED'}>{favChamp.numGames}</Stat>
          <Stat winRate={'WIN RATE'}>{Math.round(100*(favChamp.numWins / favChamp.numGames))}%</Stat>
          <Stat kda={'AVG KDA'}>{Math.round(100*((favChamp.totalKills + favChamp.totalAssists) / favChamp.totalDeaths)) / 100}</Stat>
          <Stat kills={'AVG KILLS'}>{Math.round(100*(favChamp.totalKills / favChamp.numGames)) / 100}</Stat>
          <Stat deaths={'AVG DEATHS'}>{Math.round(100*(favChamp.totalDeaths / favChamp.numGames)) / 100}</Stat>
          <Stat assists={'AVG ASSISTS'}>{Math.round(100*(favChamp.totalAssists / favChamp.numGames)) / 100}</Stat>
          <Stat csPerMin={'AVG CS/MIN'}>{Math.round(100*(favChamp.totalCs / (favChamp.totalGameDuration / 60))) / 100}</Stat>
          <Stat dmgPerGame={'DMG/GAME'}>{Math.round(100*(favChamp.totalDamageToChamps / favChamp.numGames)) / 100}</Stat>
          <Stat percentOfTeamDamage={'% OF TEAM DMG'}>{Math.round(100*(favChamp.totalDamageToChamps / favChamp.totalTeamDamageToChamps))}%</Stat>
        </StatsWrapper>
      </InnerCard>
    </StyledCard>
  );
};

export default Card;