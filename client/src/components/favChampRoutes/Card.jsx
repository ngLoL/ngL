import React, {useState} from 'react';
import styled from 'styled-components';

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
  box-shadow: 0px 3px 18px 3px rgba(0, 0, 0, 0.2);
`;

const LoadingImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const StatsWrapper = styled.div`
  background-color: var(--bg);
  transform: rotateY(180deg);
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 2rem;
  box-shadow: 0px 3px 18px 3px rgba(0, 0, 0, 0.2);
`;


const Card = ({favChamp}) => {
  const [flip, setFlip] = useState(false);

  return (
    <StyledCard>
      <InnerCard front={flip} onClick={() => setFlip(!flip)}>
        <ImgWrapper>
          <LoadingImg src="https://loadingscreenimg.s3-us-west-1.amazonaws.com/Aatrox_0.jpg" alt="Loading Screen Image of Champion"></LoadingImg>
        </ImgWrapper>
        <StatsWrapper>hello</StatsWrapper>
      </InnerCard>
    </StyledCard>
  );
};

export default Card;