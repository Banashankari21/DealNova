// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#0f172a' },   // Dark blue
    secondary: { main: '#64748b' }, // Slate gray
    success: { main: '#22c55e' },   // Green
    error: { main: '#ef4444' },     // Red
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h1: { fontWeight: 600, fontSize: '2.25rem' },
    h2: { fontWeight: 600, fontSize: '1.875rem' },
    body1: { fontSize: '1rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: '0.5rem', textTransform: 'none' },
      },
    },
  },
});

export default theme;
