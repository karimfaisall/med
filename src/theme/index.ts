import { createTheme } from '@mui/material/styles';
import { deDE } from '@mui/material/locale';

const palette = {
  primary: {
    main: '#1264a3', // Slack-inspired blue
    light: '#4285c4',
    dark: '#0f4c75',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#2eb67d', // Healthcare green
    light: '#5cc497',
    dark: '#1e7e5a',
    contrastText: '#ffffff',
  },
  success: {
    main: '#2eb67d',
    light: '#e8f5e8',
    dark: '#1e7e5a',
  },
  warning: {
    main: '#ecb22e',
    light: '#fdf4e3',
    dark: '#b8891f',
  },
  error: {
    main: '#e01e5a',
    light: '#fef2f2',
    dark: '#b71c1c',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff',
  },
  text: {
    primary: '#1d1c1d',
    secondary: '#616061',
    disabled: '#868686',
  },
  divider: '#e1e5e9',
};


export const medTheme = createTheme({
  palette,
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none' as const,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    // Custom component overrides
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#f8f9fa',
          borderRight: '1px solid #e1e5e9',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          margin: '2px 8px',
          '&:hover': {
            backgroundColor: '#f1f2f4',
          },
          '&.Mui-selected': {
            backgroundColor: '#e3f2fd',
            color: '#1264a3',
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
        elevation1: {
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1264a3',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          '&:hover': {
            boxShadow: '0 2px 4px 0 rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontSize: '0.75rem',
          minWidth: '16px',
          height: '16px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '0.75rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1d1c1d',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e1e5e9',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: '48px',
          '&.Mui-expanded': {
            minHeight: '48px',
          },
        },
        content: {
          '&.Mui-expanded': {
            margin: '12px 0',
          },
        },
      },
    },
  },
}, deDE);

export default medTheme;
