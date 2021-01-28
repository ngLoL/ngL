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
    --color-bgNavyBlue: ${(props) => props.theme.colors.bgNavyBlue};
    --color-bgGray: ${(props) => props.theme.colors.bgGray};
    --color-mainDark: ${(props) => props.theme.colors.mainDark};
    --color-mainLight: ${(props) => props.theme.colors.mainLight};
    --color-pinkAccent: ${(props) => props.theme.colors.pinkAccent};
    --color-purpleAccent: ${(props) => props.theme.colors.purpleAccent};
    --color-turqoiseAccent: ${(props) => props.theme.colors.turqoiseAccent};
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
