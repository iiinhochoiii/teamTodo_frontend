import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Lilita One', cursive;
    font-family: 'Noto Sans KR', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height:100%;
    margin:0;
    padding:0;
    width:100%;
    background-color: #fff;
    color:#333333;
    font-weight:300;
    font-family: 'Noto Sans KR', sans-serif;
  }

  a {
    color: #000;
    cursor: pointer;
    text-decoration: none;
  }
`;
