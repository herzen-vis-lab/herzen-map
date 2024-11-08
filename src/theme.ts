import { createTheme, ThemeOptions } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark') => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
  };
  return createTheme(themeOptions);
};

export default getTheme;
