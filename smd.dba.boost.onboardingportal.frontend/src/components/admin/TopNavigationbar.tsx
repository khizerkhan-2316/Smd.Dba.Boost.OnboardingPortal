import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';

function TopNavigationbar({ onDrawerToggle }: { onDrawerToggle: () => void }) {
  return (
    <AppBar position="fixed" color="primary" style={{ zIndex: 1201 }}>
      <Toolbar>
        <IconButton
          onClick={onDrawerToggle}
          color="inherit"
          edge="start"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavigationbar;
