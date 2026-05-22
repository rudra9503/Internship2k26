import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import IconButton from '@mui/material/IconButton';
import { Box, Typography, Button } from '@mui/material';

const Header = ({ onMenuToggle, sidebarOpen, onLogoClick }) => {
  return (
    <Box
      sx={{
        bgcolor: 'rgb(100,149,237)',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        px: 2,
      }}
    >
      {/* Left Side - Hamburger + Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        <IconButton
          color="inherit"
          onClick={onMenuToggle}
          sx={{ color: 'white' }}
        >
          {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>

        <Typography
          variant="h5"
          sx={{
            color: 'white',
            fontWeight: 700,
            letterSpacing: 0.5,
            cursor: 'pointer',
          }}
          onClick={onLogoClick}
        >
          IMS
        </Typography>
      </Box>

      {/* Center - Branch Name */}
      <Box sx={{ flex: 1, textAlign: 'center' }}>
        <Typography
          variant="subtitle1"
          sx={{ color: 'white', fontWeight: 500 }}
        >
          Pune Branch
        </Typography>
      </Box>

      {/* Right Side - Pay Button + Account Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'white',
            color: 'rgb(100,149,237)',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '8px',
            '&:hover': { bgcolor: '#f0f0f0' },
          }}
        >
          Pay Now
        </Button>

        <IconButton sx={{ color: 'white' }}>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
