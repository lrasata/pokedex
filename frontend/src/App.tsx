import {Container, createTheme, ThemeProvider} from "@mui/material";
import '@fontsource/press-start-2p';
import '@fontsource/montserrat';
import MainLayout from "./components/MainLayout.tsx";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#FFCB05',
        },
        secondary: {
            main: '#3B4CCA',
        },
        error: {
            main: '#D62828',
        },
        success: {
            main: '#3AA655',
        },
        info: {
            main: '#30A7D7',
        },
        background: {
            default: '#F2F2F2',
            paper: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: '"Montserrat", sans-serif',
        h1: {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '2rem',
            color: '#3B4CCA',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    padding: '8px 16px',
                    boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    boxShadow: '0px 5px 10px rgba(0,0,0,0.15)',
                    background: '#FFF',
                },
            },
        }
    }
});

function App() {

  return (
      <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
              <MainLayout />
          </Container>
      </ThemeProvider>
  )
}

export default App
