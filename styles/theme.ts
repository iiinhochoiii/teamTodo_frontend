export const theme = {
  palette: {
    black: '#000',
    white: '#fff',
    red: '#d72b3f',
    whitesmoke: '#F8F8F8 ',
    gray: '#6A7B8F',
    lightgray: '#e5e5e5',
    purple: '#4848d3',
    lightpurple: '#ededff',
    green: '#00bf99',
    lightgreen: '#d9fcf5',
    lightred: '#b01c2d',
    lightbrown: '#F8F6F1',
    lightbrown_gradient:
      'linear-gradient( 0deg,rgb(248,246,241) 0%,rgba(238,245,255,0) 100% ),rgb(255,255,255)',
    skyblue_gradient:
      'linear-gradient( 0deg,rgb(225,242,255) 0%,rgba(238,245,255,0) 100% ),rgb(255,255,255)',
  },

  button: {
    size: {
      XS: '20px',
      S: '40px',
      M: '60px',
      L: '120px',
      XL: '200px',
      MAX: '100%',
    },
  },

  font: {
    size: {
      XS: '12px',
      S: '14px',
      M: '16px',
      ML: '20px',
      L: '24px',
      XL: '28px',
    },
    weight: [100, 200, 300, 400, 500, 600, 'bold'],
    style: {
      h1: `
        font-size: 34px;
        font-weight: 500;
      `,
      h2: `
        font-size: 30px;
        font-weight: 400;
      `,
      h3: `
        font-size: 2.8rem;
        font-weight: 400;
      `,
      h4: `
        font-size: 2.4rem;
        font-weight: bold;
      `,
      subtitle1: `
        font-size: 1.6rem;
        font-weight: 400;
        letter-spacing: 0.015rem;
      `,
      subtitle2: `
        font-size: 1.4rem;
        font-weight: 500;
        letter-spacing: 0.01rem;
      `,
    },
  },
};
