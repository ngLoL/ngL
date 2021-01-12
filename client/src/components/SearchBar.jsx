import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 3.5rem;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 1.2rem 2rem;
  width: 100%;
  background-color: var(--color-mainLight);
  color: var(--color-white);
  font-weight: 500;
  font-size: 1.2rem;
  border-radius: 2rem;
  border: none;
  &::placeholder {
    color: var(--color-white);
  }
`;

const Input = () => (
  <InputWrapper>
    <StyledInput />
  </InputWrapper>
);

export default Input;