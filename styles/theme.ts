export const theme = {
  palette: {
    black: '#000',
    white: '#fff',
    gray: '#6A7B8F',
    purple: '#4848d3',
    lightred: '#b01c2d',
    skyblue:
      'linear-gradient( 0deg,rgb(225,242,255) 0%,rgba(238,245,255,0) 100% ),rgb(255,255,255)',
  },

  button: {
    size: {
      XS: '20px',
      S: '40px',
      M: '60px',
      L: '120px',
      XL: '200px',
    },
  },

  font: {
    size: {
      XS: '12px',
      S: '14px',
      M: '16px',
      L: '24px',
      XL: '28px',
    },
    weight: [100, 200, 300, 400, 500, 'bold'],
    style: {
      h1: `
        font-size: 4.2rem;
        letter-spacing: -0.15rem;
        font-weight: 300;
      `,
      h2: `
        font-size: 3.4rem;
        letter-spacing: -0.05rem;
        font-weight: 300;
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
