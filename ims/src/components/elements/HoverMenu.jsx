import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';

const menuItems = [
  { label: 'Add Status', icon: AddIcon },
  { label: 'Add Type', icon: AnalyticsIcon },
  { label: 'Add Vendor', icon: SettingsIcon },
];

const MenuContainer = styled(Paper)(({ theme, isHovered }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  backgroundColor: 'rgb(100, 149, 237)',
  color: 'white',
  borderRadius: '12px',
  boxShadow: isHovered ? '0 8px 24px rgba(100, 149, 237, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  width: isHovered ? '240px' : '70px',
  overflow: 'hidden',
  padding: theme.spacing(1),
  gap: theme.spacing(0.5),
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, isHovered }) => ({
  borderRadius: '8px',
  minHeight: '48px',
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  color: 'white',
  justifyContent: isHovered ? 'flex-start' : 'center',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateX(2px)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme, isHovered }) => ({
  minWidth: 0,
  justifyContent: 'center',
  color: 'white',
  marginRight: isHovered ? theme.spacing(2) : 0,
  transition: 'margin 0.2s ease-in-out',
}));

const StyledListItemText = styled(ListItemText)(({ isHovered }) => ({
  opacity: isHovered ? 1 : 0,
  visibility: isHovered ? 'visible' : 'hidden',
  transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
  '& .MuiListItemText-primary': {
    fontSize: '0.875rem',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
}));

const HoverMenu = ({ items = menuItems, onItemClick = null }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (label) => {
    setSelectedItem(label);
    if (onItemClick) {
      onItemClick(label);
    }
    console.log(`Clicked: ${label}`);
  };

  return (
    <MenuContainer
      isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      elevation={isHovered ? 8 : 2}
    >
      {/* Main Menu Items */}
      <List
        sx={{
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(0.5),
        }}
      >
        {items.map((item) => {
          const IconComponent = item.icon;
          return (
            <Tooltip
              key={item.label}
              title={!isHovered ? item.label : ''}
              placement="right"
              arrow
              enterDelay={500}
              sx={{
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'rgba(1, 100, 200, 0.9)',
                  color: 'white',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontWeight: 500,
                },
                '& .MuiTooltip-arrow': {
                  color: 'rgba(1, 100, 200, 0.9)',
                },
              }}
            >
              <ListItem disablePadding sx={{ display: 'block' }}>
                <StyledListItemButton
                  isHovered={isHovered}
                  selected={selectedItem === item.label}
                  onClick={() => handleItemClick(item.label)}
                >
                  <StyledListItemIcon isHovered={isHovered}>
                    <IconComponent />
                  </StyledListItemIcon>
                  <StyledListItemText
                    primary={item.label}
                    isHovered={isHovered}
                  />
                </StyledListItemButton>
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
    </MenuContainer>
  );
};

export default HoverMenu;