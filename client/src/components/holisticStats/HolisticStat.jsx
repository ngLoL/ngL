import React from 'react';
import styled from 'styled-components';
import {RiSwordFill, RiShieldCrossFill} from 'react-icons/ri';
import {FaSkullCrossbones, FaCheckSquare} from 'react-icons/fa';
import {AiFillGold, AiOutlineNumber} from 'react-icons/ai';
import {GiSwordsEmblem, GiSwordSpade, GiSpinningSword, GiSwordArray} from 'react-icons/gi';

const Wrapper = styled.div`
  display: flex;
  height: ${(props) => {
    if (props.favChamps) {
      return '8.6rem';
    }
  }};
  width: ${(props) => props.favChamps ? '47.3rem' : '40rem'};
  justify-content: space-between;
  border-color: var(--color-turqoiseAccent);
  border-style: solid;
  border-width: ${(props) => {
    if (props.top) {
      return '0.05rem 0.05rem 0rem'
    } else if (props.bottom) {
      return '0rem 0.05rem 0.05rem'
    } else {
      return '0.05rem'
    }
  }};
  background-color: var(--color-mainDark);
`;

const Stat = styled.div`
  color: #fff;
  font-size: 3rem;
  margin: ${(props) => props.favChamps ? '1.811rem' : '2rem'};
`
const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`
const Text = styled.div`
  font-weight: 700;
  font-size: 2rem;
  color: #fff;
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

const DmgPerDeathIcon = styled(GiSwordSpade)`
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


const HolisticStat = ({children, favChamps, kda, kills, assists, deaths, csPerMin, games, winRate, dmgPerDeath, dmgPerGame, percentOfTeamDamage}) => {
  if (favChamps) {
    if (kda) {
      return (
        <Wrapper favChamps>
          <Stat favChamps>{children}</Stat>
          <InnerWrapper>
            <Text>{kda}</Text>
            <KDAIcon></KDAIcon>
          </InnerWrapper>
        </Wrapper>
      );
    } else if (kills) {
      return (
        <Wrapper favChamps>
          <Stat favChamps>{children}</Stat>
          <InnerWrapper>
            <Text>{kills}</Text>
            <KillsIcon></KillsIcon>
          </InnerWrapper>
        </Wrapper>
      );
    } else if (assists) {
      return (
        <Wrapper favChamps>
          <Stat favChamps>{children}</Stat>
          <InnerWrapper>
            <Text>{assists}</Text>
            <AssistsIcon></AssistsIcon>
          </InnerWrapper>
        </Wrapper>
      );
    } else if (deaths) {
      return (
        <Wrapper favChamps>
          <Stat favChamps>{children}</Stat>
          <InnerWrapper>
            <Text>{deaths}</Text>
            <DeathsIcon></DeathsIcon>
          </InnerWrapper>
        </Wrapper>
      );
    } else if (csPerMin) {
      return (
        <Wrapper favChamps>
          <Stat favChamps>{children}</Stat>
          <InnerWrapper>
            <Text>{csPerMin}</Text>
            <CSPerMinIcon></CSPerMinIcon>
          </InnerWrapper>
        </Wrapper>
      );
    } else if (games) {
      return (
        <Wrapper top favChamps>
          <Stat favChamps>{children}</Stat>
          <InnerWrapper>
            <Text>{games}</Text>
            <NumGamesIcon></NumGamesIcon>
          </InnerWrapper>
        </Wrapper>
      )
    } else if (winRate) {
      return (
        <Wrapper favChamps>
          <Stat favChamps>{children}</Stat>
          <InnerWrapper>
            <Text>{winRate}</Text>
            <WinRateIcon></WinRateIcon>
          </InnerWrapper>
        </Wrapper>
      )
    } else if (dmgPerDeath) {
      return (
        <Wrapper favChamps >
          <Stat favChamps>{children}</Stat>
          <InnerWrapper>
            <Text>{dmgPerDeath}</Text>
            <DmgPerDeathIcon></DmgPerDeathIcon>
          </InnerWrapper>
        </Wrapper>
      )
    } else if (dmgPerGame) {
      return (
        <Wrapper favChamps>
          <Stat favChamps>{children}</Stat>
          <InnerWrapper>
            <Text>{dmgPerGame}</Text>
            <DmgPerGameIcon></DmgPerGameIcon>
          </InnerWrapper>
        </Wrapper>
      )
    } else if (percentOfTeamDamage) {
      return (
        <Wrapper favChamps bottom>
          <Stat favChamps>{children}</Stat>
          <InnerWrapper>
            <Text>{percentOfTeamDamage}</Text>
            <PercentOfTeamDamageIcon></PercentOfTeamDamageIcon>
          </InnerWrapper>
        </Wrapper>
      )
    }
  } else {
    if (kda) {
      return (
        <Wrapper top>
          <Stat>{children}</Stat>
          <InnerWrapper>
            <Text>{kda}</Text>
            <KDAIcon></KDAIcon>
          </InnerWrapper>
        </Wrapper>
      );
    } else if (kills) {
      return (
        <Wrapper>
          <Stat>{children}</Stat>
          <InnerWrapper>
            <Text>{kills}</Text>
            <KillsIcon></KillsIcon>
          </InnerWrapper>
        </Wrapper>
      );
    } else if (assists) {
      return (
        <Wrapper>
          <Stat>{children}</Stat>
          <InnerWrapper>
            <Text>{assists}</Text>
            <AssistsIcon></AssistsIcon>
          </InnerWrapper>
        </Wrapper>
      );
    } else if (deaths) {
      return (
        <Wrapper>
          <Stat>{children}</Stat>
          <InnerWrapper>
            <Text>{deaths}</Text>
            <DeathsIcon></DeathsIcon>
          </InnerWrapper>
        </Wrapper>
      );
    } else if (csPerMin) {
      return (
        <Wrapper bottom>
          <Stat>{children}</Stat>
          <InnerWrapper>
            <Text>{csPerMin}</Text>
            <CSPerMinIcon></CSPerMinIcon>
          </InnerWrapper>
        </Wrapper>
      );
    }
  }








};

export default HolisticStat;