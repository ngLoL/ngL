import React from 'react';
import styled from 'styled-components';
import {BsFillPersonFill} from 'react-icons/bs';


const StyledCard = styled.div`
  position: relative;
  width: 20rem;
  height: 20rem;
  margin: 4rem;
  border-radius: 50%;
  color: white;
  perspective: 100rem;
`;

const InnerCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: transform 1s;
  transform-style: preserve-3d;

  ${StyledCard}:hover & {
    transform: rotateY(180deg);
    transition: transform 0.5s;
  }
`;

const Front = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background: linear-gradient(to bottom left, rgba(243,204,189,1) 0%, rgba(238,188,187,1) 20%, rgba(231,172,194,1) 40%, rgba(214,181,212,1) 60%, rgba(201,188,218,1) 80%, rgba(178,201,233,1) 100%);
  text-align: center;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: ${(props) => props.bigger || props.big ? 'space-between' : 'center'};
  width: ${(props) => {
    if (props.bigger) {
      return '72%';
    } else if (props.big) {
      return '58%';
    }
  }};
`;

const Back = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background: linear-gradient(to bottom left, rgba(243,204,189,1) 0%, rgba(238,188,187,1) 20%, rgba(231,172,194,1) 40%, rgba(214,181,212,1) 60%, rgba(201,188,218,1) 80%, rgba(178,201,233,1) 100%);
  text-align: center;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #000;
`;

const Description = styled.div`
  font-weight: 500;
  font-size: 2rem;
`;

const Number = styled.div`
  font-size: 6rem;
  font-weight: 700;
`;

const StyledIcon = styled(BsFillPersonFill)`
  font-size: 5rem;
`;

const Card = ({children, type}) => {
  if (type === 'double') {
    return (
      <StyledCard>
        <InnerCard>
          <Front>
            <IconContainer>
              <StyledIcon></StyledIcon>
              <StyledIcon></StyledIcon>
            </IconContainer>
          </Front>
          <Back>
            <Number>{children}</Number>
            <Description>Double Kills</Description>
          </Back>
        </InnerCard>
      </StyledCard>
    );
  } else if (type === 'triple') {
    return (
      <StyledCard>
        <InnerCard>
          <Front>
            <IconContainer>
              <StyledIcon></StyledIcon>
            </IconContainer>
            <IconContainer>
              <StyledIcon></StyledIcon>
              <StyledIcon></StyledIcon>
            </IconContainer>
          </Front>
          <Back>
            <Number>{children}</Number>
            <Description>Triple Kills</Description>
          </Back>
        </InnerCard>
      </StyledCard>
    );
  } else if (type === 'quadra') {
    return (
      <StyledCard>
        <InnerCard>
          <Front>
            <IconContainer>
              <StyledIcon></StyledIcon>
              <StyledIcon></StyledIcon>
            </IconContainer>
            <IconContainer>
              <StyledIcon></StyledIcon>
              <StyledIcon></StyledIcon>
            </IconContainer>
          </Front>
          <Back>
            <Number>{children}</Number>
            <Description>Quadra Kills</Description>
          </Back>
        </InnerCard>
      </StyledCard>
    );
  } else if (type === 'penta') {
    return (
      <StyledCard>
        <InnerCard>
          <Front>
            <IconContainer>
              <StyledIcon></StyledIcon>
            </IconContainer>
            <IconContainer bigger>
              <StyledIcon></StyledIcon>
              <StyledIcon></StyledIcon>
            </IconContainer>
            <IconContainer big>
              <StyledIcon></StyledIcon>
              <StyledIcon></StyledIcon>
            </IconContainer>
          </Front>
          <Back>
            <Number>{children}</Number>
            <Description>Penta Kills</Description>
          </Back>
        </InnerCard>
      </StyledCard>
    );
  }
};

export default Card;