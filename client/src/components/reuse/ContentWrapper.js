import styled from 'styled-components';

const ContentWrapper = styled.div`
  width: ${(props) => props.short ? '100rem' : '120rem'};
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-main);
  padding-bottom: 2.5rem;
`;

export default ContentWrapper;