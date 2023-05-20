import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F1F7FD', // Replace with your desired color
    },
  },
});

function AdminNavigationbar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider theme={theme}></ThemeProvider>
    </>
  );
}

export default AdminNavigationbar;
