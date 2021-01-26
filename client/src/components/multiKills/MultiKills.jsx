import React from 'react';
import styled from 'styled-components';
import Caption from '../reuse/Caption.js';
import SectionWrapper from '../reuse/SectionWrapper.js';
import ContentWrapper from '../reuse/ContentWrapper.js';
import Ring from './Ring.jsx';

const MultiKillWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding-bottom: 2.5rem;
  background-color: var(--color-main);
`;

const MultiKills = ({children, doubleKills, tripleKills, quadraKills, pentaKills}) => {
  return (
    <SectionWrapper>
      <ContentWrapper>
        <Caption>{children}</Caption>
        <MultiKillWrapper>
          <Ring type={'DOUBLE KILLS'}>{doubleKills}</Ring>
          <Ring type={'TRIPLE KILLS'}>{tripleKills}</Ring>
          <Ring type={'QUADRA KILLS'}>{quadraKills}</Ring>
          <Ring type={'PENTA KILLS'}>{pentaKills}</Ring>
        </MultiKillWrapper>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default MultiKills;