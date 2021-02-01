import React, {useState} from 'react';
import styled from 'styled-components';
import {RiSwordFill, RiShieldCrossFill} from 'react-icons/ri';
import {FaSkullCrossbones, FaCheckSquare} from 'react-icons/fa';
import {AiFillGold, AiOutlineNumber} from 'react-icons/ai';
import {GiSwordsEmblem, GiSpinningSword, GiSwordArray} from 'react-icons/gi';

const Wrapper = styled.div`
  width: 100%;
  line-height: 6rem;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  color: #fff;
  padding: 0px 1.5rem;
  background-color: #000;
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Number = styled.div`
  font-size: 3rem;
`;

const Description = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const KDAIcon = styled(GiSwordsEmblem)`
  color: white;
  font-size: 2.5rem;
`;

const KillsIcon = styled(RiSwordFill)`
  color: white;
  font-size: 2.5rem;
`;

const DeathsIcon = styled(FaSkullCrossbones)`
  color: white;
  font-size: 2.5rem;
`;

const AssistsIcon = styled(RiShieldCrossFill)`
  color: white;
  font-size: 2.5rem;
`;

const CSPerMinIcon = styled(AiFillGold)`
  color: white;
  font-size: 2.5rem;
`;

const WinRateIcon = styled(FaCheckSquare)`
  color: white;
  font-size: 2.5rem;
`;

const NumGamesIcon = styled(AiOutlineNumber)`
  color: white;
  font-size: 2.5rem;
`;

const DmgPerGameIcon = styled(GiSpinningSword)`
  color: white;
  font-size: 2.5rem;
`;

const PercentOfTeamDamageIcon = styled(GiSwordArray)`
  color: white;
  font-size: 2.5rem;
`;

const Stat = ({children, kda, kills, assists, deaths, csPerMin, games, winRate, dmgPerGame, percentOfTeamDamage}) => {
  if (kda) {
    return (
      <Wrapper>
        <Number>{children}</Number>
        <InnerWrapper>
          <Description>{kda}</Description>
          <KDAIcon></KDAIcon>
        </InnerWrapper>
      </Wrapper>
    );
  } else if (kills) {
    return (
      <Wrapper>
        <Number>{children}</Number>
        <InnerWrapper>
          <Description>{kills}</Description>
          <KillsIcon></KillsIcon>
        </InnerWrapper>
      </Wrapper>
    );
  } else if (assists) {
    return (
      <Wrapper>
        <Number>{children}</Number>
        <InnerWrapper>
          <Description>{assists}</Description>
          <AssistsIcon></AssistsIcon>
        </InnerWrapper>
      </Wrapper>
    );
  } else if (deaths) {
    return (
      <Wrapper>
        <Number>{children}</Number>
        <InnerWrapper>
          <Description>{deaths}</Description>
          <DeathsIcon></DeathsIcon>
        </InnerWrapper>
      </Wrapper>
    );
  } else if (csPerMin) {
    return (
      <Wrapper>
        <Number>{children}</Number>
        <InnerWrapper>
          <Description>{csPerMin}</Description>
          <CSPerMinIcon></CSPerMinIcon>
        </InnerWrapper>
      </Wrapper>
    );
  } else if (games) {
    return (
      <Wrapper top>
        <Number>{children}</Number>
        <InnerWrapper>
          <Description>{games}</Description>
          <NumGamesIcon></NumGamesIcon>
        </InnerWrapper>
      </Wrapper>
    )
  } else if (winRate) {
    return (
      <Wrapper>
        <Number>{children}</Number>
        <InnerWrapper>
          <Description>{winRate}</Description>
          <WinRateIcon></WinRateIcon>
        </InnerWrapper>
      </Wrapper>
    )
  } else if (dmgPerGame) {
    return (
      <Wrapper>
        <Number>{children}</Number>
        <InnerWrapper>
          <Description>{dmgPerGame}</Description>
          <DmgPerGameIcon></DmgPerGameIcon>
        </InnerWrapper>
      </Wrapper>
    )
  } else if (percentOfTeamDamage) {
    return (
      <Wrapper bottom>
        <Number>{children}</Number>
        <InnerWrapper>
          <Description>{percentOfTeamDamage}</Description>
          <PercentOfTeamDamageIcon></PercentOfTeamDamageIcon>
        </InnerWrapper>
      </Wrapper>
    )
  }
};

export default Stat;