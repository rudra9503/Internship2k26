import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      position: 'relative',
      top: 0,
      height: '100%',
      bgcolor: 'rgb(100,149,237)',
    },
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': {
            ...openedMixin(theme),
            position: 'relative',
            top: 0,
            height: '100%',
          },
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': {
            ...closedMixin(theme),
            position: 'relative',
            top: 0,
            height: '100%',
          },
        },
      },
    ],
  }),
);

const menuItems = [
  { text: 'Transport', icon: <InboxIcon />, path: '/transport' },
  { text: 'Shipment', icon: <MailIcon />, path: '/shipment' },
  { text: 'Staff', icon: <InboxIcon />, path: '/staff' },
  { text: 'Vendors', icon: <MailIcon />, path: '/vendors' },
];

const Sidebar = ({ open, onToggle, onNavigate }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', height: '100%', bgcolor: 'rgb(100,149,237)' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'flex-end' : 'center',
            px: 1,
            py: 1,
            bgcolor: 'rgb(100,149,237)',
          }}
        >
          <IconButton onClick={onToggle} sx={{ color: 'white' }}>
            {theme.direction === 'rtl' ? (
              open ? <ChevronRightIcon /> : <ChevronLeftIcon />
            ) : (
              open ? <ChevronLeftIcon /> : <ChevronRightIcon />
            )}
          </IconButton>
        </Box>
        <List sx={{ bgcolor: 'rgb(100,149,237)', height: '100%' }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block', bgcolor: 'rgb(100,149,237)' }}>
              <ListItemButton
                onClick={() => onNavigate(item.path)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                  },
                  open
                    ? { justifyContent: 'initial' }
                    : { justifyContent: 'center', px: 2 },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                      color: 'white',
                    },
                    open ? { mr: 3 } : { mr: 'auto' },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={[open ? { opacity: 1, color: 'white' } : { opacity: 0 }]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;