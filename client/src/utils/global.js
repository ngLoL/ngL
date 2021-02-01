import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }
  *:focus {
  outline: 0;
  outline: none;
  }
  html {
    font-size: 62.5%;
    box-sizing: border-box;
    --bg: ${(props) => props.theme.colors.bg};
    --pale: ${(props) => props.theme.colors.pale};
    --peach: ${(props) => props.theme.colors.peach};
    --pink: ${(props) => props.theme.colors.pink};
    --lavendar: ${(props) => props.theme.colors.lavendar};
    --purple: ${(props) => props.theme.colors.purple};
    --blue: ${(props) => props.theme.colors.blue};
    --shadow: ${(props) => props.theme.colors.shadow};
    @media ${(props) => props.theme.mediaQueries.small} {
      font-size: 60%;
    }
    @media ${(props) => props.theme.mediaQueries.smallest} {
      font-size: 55%;
    }
  }
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.6;
  }
  a, button {
    cursor: pointer;
  }
  a, input, textarea, button {
    outline: none;
    text-decoration: none;
    font-family: inherit;
  }
`;
