import React from 'react';
import styled from 'styled-components';
import {RiSwordFill, RiShieldCrossFill} from 'react-icons/ri';
import {FaSkullCrossbones} from 'react-icons/fa';
import {AiFillGold} from 'react-icons/ai';
import {GiSwordsEmblem} from 'react-icons/gi';


const Box = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem;
  transition: 0.5s;

  &:before {
    content: '';
    position: absolute;
    border-radius: 1rem;
    top: -0.28rem;
    left: -0.28rem;
    right: -0.28rem;
    bottom: -0.28rem;
  }

  &:after {
    content: '';
    position: absolute;
    border-radius: 1rem;
    top: -0.28rem;
    left: -0.28rem;
    right: -0.28rem;
    bottom: -0.28rem;
    z-index: -1;
    filter: blur(4rem);
  }

  &:before, &:after {
    background: linear-gradient(to bottom right, rgba(243,204,189,1) 0%, rgba(238,188,187,1) 20%, rgba(231,172,194,1) 40%, rgba(214,181,212,1) 60%, rgba(201,188,218,1) 80%, rgba(178,201,233,1) 100%);
  }

  &:nth-child(2n):before, &:nth-child(2n):after {
    background: linear-gradient(to bottom left, rgba(243,204,189,1) 0%, rgba(238,188,187,1) 20%, rgba(231,172,194,1) 40%, rgba(214,181,212,1) 60%, rgba(201,188,218,1) 80%, rgba(178,201,233,1) 100%);
  }

  &:hover {
    height: 20rem;
  }
`;

const IconHolder = styled.div`
  position: absolute;
  top: 0rem;
  left: 0rem;
  width: 15rem;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  text-align: center;
  transition: 0.5s;
  ${Box}:hover & {
    opacity: 1;
  }
`;

const Description = styled.div`
  font-size: 2rem;
`;

const Stat = styled.div`
  font-size: 3rem;
  font-weight: 700;
`;

const KDAIcon = styled(GiSwordsEmblem)`
  color: white;
  font-size: 7rem;
  max-width: 100%;
  transition: 0.5s;
`;

const KillsIcon = styled(RiSwordFill)`
  color: white;
  font-size: 7rem;
  max-width: 100%;
  transition: 0.5s;
`;

const DeathsIcon = styled(FaSkullCrossbones)`
  color: white;
  font-size: 7rem;
  max-width: 100%;
  transition: 0.5s;
`;

const AssistsIcon = styled(RiShieldCrossFill)`
  color: white;
  font-size: 7rem;
  max-width: 100%;
  transition: 0.5s;
`;

const CSPerMinIcon = styled(AiFillGold)`
  color: white;
  font-size: 7rem;
  max-width: 100%;
  transition: 0.5s;
`;


const Card = ({children, kda, kills, assists, deaths, csPerMin}) => {
  if (kda) {
    return (
      <Box>
        <IconHolder>
          <KDAIcon></KDAIcon>
        </IconHolder>
        <Content>
          <Stat>{children}</Stat>
          <Description>{kda}</Description>
        </Content>
      </Box>
    );
  } else if (kills) {
    return (
      <Box>
        <IconHolder>
          <KillsIcon></KillsIcon>
        </IconHolder>
        <Content>
          <Stat>{children}</Stat>
          <Description>{kills}</Description>
        </Content>
      </Box>
    );
  } else if (assists) {
    return (
      <Box>
        <IconHolder>
          <AssistsIcon></AssistsIcon>
        </IconHolder>
        <Content>
          <Stat>{children}</Stat>
          <Description>{assists}</Description>
        </Content>
      </Box>
    );
  } else if (deaths) {
    return (
      <Box>
        <IconHolder>
          <DeathsIcon></DeathsIcon>
        </IconHolder>
        <Content>
          <Stat>{children}</Stat>
          <Description>{deaths}</Description>
        </Content>
      </Box>
    );
  } else if (csPerMin) {
    return (
      <Box>
        <IconHolder>
          <CSPerMinIcon></CSPerMinIcon>
        </IconHolder>
        <Content>
          <Stat>{children}</Stat>
          <Description>{csPerMin}</Description>
        </Content>
      </Box>
    );
  }
};

export default Card;