const themeOptions = {
  palette: {
    primary: {
      main: '#76CFDB',
    },
    primaryVariant: {
      main: '#48A0B3',
    },
    // tää on se beessi, täytyy kattoo joku muu väri!
    secondary: {
      main: '#D0AE8B',
    },
    secondaryVariant: {
      main: '#F5F2EB',
    },
    backgroundColor: {
      main: '#F7F7F7',
    },
    bodyTextColor: {
      main: '#05192C',
    },
    heart: {
      main: '#FF2222',
    },
  },
  typography: {
    // BODY FONT
    // Käyttö: body1=
    body1: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
      fontSize: '16px',
      fontWeight: '400',
    },

    // LOGO FONT
    // Käyttö: variant="logoFont"
    logoFont: {
      fontFamily: ['Fredoka One', 'cursive'].join(','),
      fontSize: '38px',
    },
    // H1 FONT (turha?)
    // Käyttö: variant="fontH1"
    fontH1: {
      fontFamily: ['Fredoka One', 'cursive'].join(','),
      fontSize: '36px',
    },
    // H2 FONT
    // Käyttö: variant="fontH2"
    fontH2: {
      fontFamily: ['Fredoka One', 'cursive'].join(','),
      fontSize: '32px',
    },
    // H3 FONT
    // Käyttö: variant="fontH3"
    fontH3: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
      fontSize: '24px',
      fontWeight: '900',
    },
    // H4 FONT
    // Käyttö: variant="fontH4"
    fontH4: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
      fontSize: '20px',
      fontWeight: '900',
    },
    // H5 FONT
    // Käyttö: variant="fontH5"
    fontH5: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
      fontSize: '16px',
      fontWeight: '700',
    },
    // H6 FONT
    // Käyttö: variant="fontH6"
    fontH6: {
      fontFamily: ['Lato', 'sans-serif'].join(','),
      fontSize: '12px',
      fontWeight: '400',
    },
  },
  shape: {
    borderRadius: 15,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#F7F7F7',
          backgroundColor: '#48A0B3',
          textTransform: 'none',
          fontFamily: ['Lato', 'sans-serif'].join(','),
        },
      },
    },
  },
};

export {themeOptions};
