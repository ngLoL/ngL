import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import HolisticStat from '../holisticStats/HolisticStat.jsx';
import Caption from '../reuse/Caption.js';
import ContentWrapper from '../reuse/ContentWrapper.js';
import SectionWrapper from '../reuse/SectionWrapper.js';
import {getChampionName} from '../../../../champion-library/helper.js';


const ChampWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  background-color: var(--color-main);
`;

const StatWrapper = styled.div`
  width: 50rem;
  height: 86rem;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-main);
`;

const Tab = styled.button`
  width: 30%;
  background-color: var(--color-main);
  color: var(--color-textColor);
  font-size: 2.5rem;
  border-top: none;
  text-transform: uppercase;
  border-right: none;
  border-left: none;
  border-bottom: ${(props) => {
    if (props.index === props.active) {
      return '0.2rem solid var(--color-turqoiseAccent)';
    } else {
      return '0.2rem solid transparent';
    }
  }};
  transition: all 0.2s;

  &:hover {
    border-bottom: 0.2rem solid var(--color-turqoiseAccent);
  }
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--color-main);
  margin-bottom: 2rem;
  width: 70rem;
`;

const ImgWrapper = styled.div`
  width: 50rem;
  height: 86rem;
  display: flex;
  justify-content: flex-end;
`;

const LoadingImg = styled.img`
  height: 100%;
  object-fit: contain;
`;


const FavChamps = ({children, favoriteChamps}) => {

  const [champStats, setChampStats] = useState(0);

  const handleClick = (i) => {
    let button
  };

  const nav = favoriteChamps.map((champ, i) => {
    return (
      <Tab key={i} index={i} active={champStats} onClick={() => setChampStats(i)}>{getChampionName(champ.champId)}</Tab>
    );
  });

  const top3 = favoriteChamps.map((champ, i) => {
    return (
      <ChampWrapper key={i}>
        <ImgWrapper>
          <LoadingImg src="https://loadingscreenimg.s3-us-west-1.amazonaws.com/Aatrox_0.jpg" alt="Loading Screen Image of Champion"></LoadingImg>
        </ImgWrapper>
        <StatWrapper>
          <HolisticStat favChamps={'favChamps'} games={'GAMES PLAYED'}>{champ.numGames}</HolisticStat>
          <HolisticStat favChamps={'favChamps'} winRate={'WIN RATE'}>{Math.round(100*(champ.numWins / champ.numGames))}%</HolisticStat>
          <HolisticStat favChamps={'favChamps'} kda={'AVG KDA'}>{Math.round(100*((champ.totalKills + champ.totalAssists) / champ.totalDeaths)) / 100}</HolisticStat>
          <HolisticStat favChamps={'favChamps'} kills={'AVG KILLS'}>{Math.round(100*(champ.totalKills / champ.numGames)) / 100}</HolisticStat>
          <HolisticStat favChamps={'favChamps'} deaths={'AVG DEATHS'}>{Math.round(100*(champ.totalDeaths / champ.numGames)) / 100}</HolisticStat>
          <HolisticStat favChamps={'favChamps'} assists={'AVG ASSISTS'}>{Math.round(100*(champ.totalAssists / champ.numGames)) / 100}</HolisticStat>
          <HolisticStat favChamps={'favChamps'} csPerMin={'AVG CS/MIN'}>{Math.round(100*(champ.totalCs / (champ.totalGameDuration / 60))) / 100}</HolisticStat>
          <HolisticStat favChamps={'favChamps'} dmgPerDeath={'DMG/DEATH'}>{Math.round(100*(champ.totalDamageToChamps / champ.totalDeaths)) / 100}</HolisticStat>
          <HolisticStat favChamps={'favChamps'} dmgPerGame={'DMG/GAME'}>{Math.round(100*(champ.totalDamageToChamps / champ.numGames)) / 100}</HolisticStat>
          <HolisticStat favChamps={'favChamps'} percentOfTeamDamage={'% OF TEAM DMG'}>{Math.round(100*(champ.totalDamageToChamps / champ.totalTeamDamageToChamps))}%</HolisticStat>
        </StatWrapper>
      </ChampWrapper>
    )
  });

  const renderOneChamp = (i) => {
    return top3[i];
  };

  return (
    <SectionWrapper>
      <ContentWrapper>
        <Caption>{children}</Caption>
        <NavWrapper>
          {nav}
        </NavWrapper>
        {renderOneChamp(champStats)}
      </ContentWrapper>
    </SectionWrapper>
  )
};

export default FavChamps;