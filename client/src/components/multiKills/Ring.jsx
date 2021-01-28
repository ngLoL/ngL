import React from 'react';
import styled from 'styled-components';

const RingLight = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  width: 30rem;
  height: 30rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: '';
    position: absolute;
    top: 5rem;
    left: 5rem;
    right: 5rem;
    bottom: 5rem;
    border: 2rem solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 5rem #0f0,
                inset 0 0 5rem #0f0;
    animation: fire 5s linear infinite;
  }

  &:after {
    content: '';
    position: absolute;
    top: 5rem;
    left: 5rem;
    right: 5rem;
    bottom: 5rem;
    border: 2rem solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 1rem #fff,
                inset 0 0 2rem #fff;
  }

  @keyframes fire {
    0% {
      box-shadow: 0 0 5rem #0f0,
                  inset 0 0 5rem #0f0;
      filter: hue-rotate(0deg);
    }
    20% {
      box-shadow: 0 0 6rem #0f0,
                  inset 0 0 6rem #0f0;
    }
    40% {
      box-shadow: 0 0 4rem #0f0,
                  inset 0 0 4rem #0f0;
    }
    60% {
      box-shadow: 0 0 8rem #0f0,
                  inset 0 0 8rem #0f0;
    }
    80% {
      box-shadow: 0 0 10rem #0f0,
                  inset 0 0 10rem #0f0;
    }
    100% {
      box-shadow: 0 0 5rem #0f0,
                  inset 0 0 5rem #0f0;
      filter: hue-rotate(360deg);
    }
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Tag = styled.div`
  text-align: center;
  color: #fff;
  font-size: 2rem;
`;

const Number = styled.div`
  text-align: center;
  color: #fff;
  font-size: 6rem;
  width: 50%;
  height: auto;
  margin: 0 auto;
  position: relative;
`;

const Ring = ({children, type}) => {
  return (
    <>
      <InnerWrapper>
        <RingLight>
          <Number>{children}</Number>
        </RingLight>
        <Tag>{type}</Tag>
      </InnerWrapper>
    </>
  );
};

export default Ring;