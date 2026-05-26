import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  Tooltip,
  Box,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from '@mui/icons-material/Group';
const menuItems = [
  { label: 'Add Status', icon: BarChartIcon },
  { label: 'Add Type', icon: MenuBookIcon },
  { label: 'Add Vendor', icon: StoreIcon },
  { label: 'Add Sent By', icon: PersonIcon },
  { label: 'Employee By', icon: GroupIcon}
];

const ICON_ONLY_WIDTH = 50;
const EXPANDED_WIDTH = 200;

//const IconComponent = item.icon;

const CardContainer = styled(Paper)(({ theme, isHovered,  }) => {
  const itemHeight = 48;
  const padding = theme.spacing(1);
  const gap = theme.spacing(0.5);

  return {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
   // minHeight: totalHeight,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderRadius: '30px',
    boxShadow: isHovered
      ? '0 8px 24px rgba(100, 149, 237, 0.4)'
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    width: isHovered ? EXPANDED_WIDTH : ICON_ONLY_WIDTH,
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

// const StyledItemLabel = styled(Typography)(({ isHovered }) => ({
//   opacity: isHovered ? 1 : 0,
//   visibility: isHovered ? 'visible' : 'hidden',
//   transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
//   fontSize: '0.875rem',
//   fontWeight: 500,
//   whiteSpace: 'nowrap',
//   margin: 0,
// }));

const StyledItemLabel = styled(Typography)(({ isHovered }) => ({
  opacity: isHovered ? 1 : 0,
  maxWidth: isHovered ? 150 : 0,   // 0 width when collapsed
  overflow: 'hidden',               // hide the text overflow
  transition: 'opacity 0.2s ease-in-out, max-width 0.2s ease-in-out',
  fontSize: '0.875rem',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  margin: 0,
}));

const CompactIconCard = ({
  items = menuItems,
  //items, instead of default menu setup
  onItemClick = null,
  title = null,
  backgroundColor = 'rgb(41,128,185)',
  onHoverChange,
  selectedLabel = null,
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHoverChange) onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onHoverChange) onHoverChange(false);
  };

  const handleItemClick = (label) => {
    setSelectedItem(label);
    if (onItemClick) onItemClick(label);
  };

  const activeItem = selectedLabel ?? selectedItem;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {/* {title && (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: '#333',
            paddingLeft: '4px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s ease',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>
      )} */}

      <CardContainer
        isHovered={isHovered}
        elevation={isHovered ? 8 : 2}
        sx={{ backgroundColor }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <List
          sx={{
            padding: 0,
           // display: 'flex',
            //flexDirection: 'column',
           // gap: theme.spacing(0.5),
          }}
        >
          {items.map((item) => {
            const fallbackItem = menuItems.find((menuItem) => menuItem.label === item.label);
            const IconComponent = item.icon || fallbackItem?.icon;
            return (
              <Tooltip
                key={item.label}
                title={!isHovered ? item.label : ''}
                //placement="right"
                arrow
                enterDelay={300}
              >
                <ListItem  disablePadding sx={{ display: 'block', mb: 0.5 }}>
                  <StyledListItemButton
                    isHovered={isHovered}
                    selected={activeItem === item.label}
                    onClick={() => handleItemClick(item.label)
                    
                    }
                  >
                    {IconComponent && (
                      <StyledListItemIcon isHovered={isHovered}>
                        <IconComponent />
                      </StyledListItemIcon>
                    )}
                    <StyledItemLabel isHovered={isHovered}>
                      {item.label}
                    </StyledItemLabel>
                    {isHovered && item.count !== undefined && (
                      <Typography
                        variant="caption"
                        sx={{
                          ml: 'auto',
                          color: 'rgba(255,255,255,0.85)',
                          fontWeight: 700,
                        }}
                      >
                      </Typography>
                    )}
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




//api icon fteching method 

// {items.map((item) => {
//   const IconComponent = item.icon;  // ✅ Clean, no fallback needed
  
//   return (
//     <Tooltip
//       key={item.label}
//       title={!isHovered ? item.label : ''}
//       arrow
//       enterDelay={300}
//     >
//       <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
//         <StyledListItemButton
//           isHovered={isHovered}
//           selected={activeItem === item.label}
//           onClick={() => handleItemClick(item.label)}
//         >
//           {IconComponent && (
//             <StyledListItemIcon isHovered={isHovered}>
//               <IconComponent />
//             </StyledListItemIcon>
//           )}
//           <StyledItemLabel isHovered={isHovered}>
//             {item.label}
//           </StyledItemLabel>
//           {/* ... count badge ... */}
//         </StyledListItemButton>
//       </ListItem>
//     </Tooltip>
//   );
// })}