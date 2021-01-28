import styled from 'styled-components';

const SectionWrapper = styled.section`
  width: 100%;
  margin: 0 auto;
  background-color: ${(props) => props.odd ? 'var(--color-bgNavyBlue)' : 'var(--color-bgGray)'};
`;

export default SectionWrapper;