import React from 'react';
import styled from 'styled-components';
import HolisticStat from './HolisticStat.jsx';
import Caption from '../reuse/Caption.js';
import ContentWrapper from '../reuse/ContentWrapper.js';
import SectionWrapper from '../reuse/SectionWrapper.js';

const HolisticStats = ({children, kills, deaths, assists, cs, gameDuration, numGames}) => {
  return (
    <SectionWrapper>
      <ContentWrapper short>
        <Caption>{children}</Caption>
        <HolisticStat kda={'AVG KDA'}>{Math.round(100*((kills + assists) / deaths)) / 100}</HolisticStat>
        <HolisticStat kills={'AVG KILLS'}>{Math.round(100*(kills / numGames)) / 100}</HolisticStat>
        <HolisticStat deaths={'AVG DEATHS'}>{Math.round(100*(deaths / numGames)) / 100}</HolisticStat>
        <HolisticStat assists={'AVG ASSISTS'}>{Math.round(100*(assists / numGames)) / 100}</HolisticStat>
        <HolisticStat csPerMin={'AVG CS/MIN'}>{Math.round(100*(cs / (gameDuration / 60))) / 100}</HolisticStat>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default HolisticStats;