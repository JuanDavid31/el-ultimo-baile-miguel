import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function AppBarTitle() {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="fixed" color="primary" style={{ width: '100%' }}>
          <Toolbar>
            <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
              El último baile
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
}