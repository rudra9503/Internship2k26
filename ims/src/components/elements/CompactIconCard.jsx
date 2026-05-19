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
  Box,
} from '@mui/material';
import statusbar from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';

const menuItems = [
  { label: 'Add Status', icon: statusbar },
  { label: 'Add Type', icon: EditIcon },
  { label: 'Add Vendor', icon: DeleteIcon },
  { label: 'Add Sent By', icon: SearchIcon },
];

const CardContainer = styled(Paper)(({ theme, isHovered, itemCount }) => {
  const itemHeight = 48; // Height of each item
  const padding = theme.spacing(1); // padding in px (8px per unit)
  const gap = theme.spacing(0.5); // gap between items in px (4px per unit)
  const totalHeight = itemCount * itemHeight + (itemCount - 1) * 4 + 16; // items + gaps + padding

  return {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    minHeight: totalHeight,
    backgroundColor: 'rgb(100, 149, 237)',
    color: 'white',
    borderRadius: '12px',
    boxShadow: isHovered 
      ? '0 8px 24px rgba(100, 149, 237, 0.4)' 
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    width: isHovered ? '200px' : '56px',
    overflow: 'hidden',
    padding: padding,
    gap: gap,
  };
});

const StyledListItemButton = styled(ListItemButton)(({ theme, isHovered }) => ({
  borderRadius: '8px',
  minHeight: '48px',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
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
  fontSize: '24px',
  marginRight: isHovered ? theme.spacing(1.5) : 0,
  transition: 'margin 0.2s ease-in-out',
  '& svg': {
    width: '24px',
    height: '24px',
  },
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
  margin: 0,
}));

const CompactIconCard = ({ 
  items = menuItems, 
  onItemClick = null,
  title = null,
  backgroundColor = 'rgb(100, 149, 237)',
}) => {
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {title && (
        <Box
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#333',
            paddingLeft: '4px',
          }}
        >
          {title}
        </Box>
      )}
      
      <CardContainer
        isHovered={isHovered}
        itemCount={items.length}
        elevation={isHovered ? 8 : 2}
        sx={{ backgroundColor: backgroundColor }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Menu Items */}
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
                enterDelay={300}
                sx={{
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    color: 'white',
                    fontSize: '0.75rem',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontWeight: 500,
                  },
                  '& .MuiTooltip-arrow': {
                    color: 'rgba(0, 0, 0, 0.85)',
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
      </CardContainer>
    </Box>
  );
};

export default CompactIconCard;