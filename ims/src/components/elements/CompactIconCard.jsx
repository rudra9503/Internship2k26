import { useState, useEffect } from 'react';
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
  //items = menuItems,
  //items, instead of default menu setup
  //onItemClick = null,
  title = null,
  backgroundColor = 'rgb(41,128,185)',
  onHoverChange,
  selectedLabel = null,
  isLoading: externalLoading = false,  // ✅ Renamed
  error: externalError = null,         // ✅ Renamed
  items: externalItems,           // ✅ Renamed to allow internal OR external
  fetchItems,                     // ✅ NEW: async function for API
  refreshInterval = null,         // ✅ NEW: auto-refresh
  onFetchSuccess = null,          // ✅ NEW
  onFetchError = null,            // ✅ NEW
  onItemClick = null,
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [internalItems, setInternalItems] = useState([]);
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState(null);

  // Determine if using external or internal data
  const isExternal = externalItems !== undefined;
  const items = isExternal ? externalItems : internalItems;
  const isLoading = isExternal ? externalLoading : internalLoading;
  const error = isExternal ? externalError : internalError;

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

    useEffect(() => {
    // Skip if using external items or no fetchItems provided
    if (isExternal || !fetchItems) return;

    const loadData = async () => {
      setInternalLoading(true);
      setInternalError(null);
      try {
        const data = await fetchItems();
        setInternalItems(data);
        if (onFetchSuccess) onFetchSuccess(data);
      } catch (err) {
        setInternalError(err);
        if (onFetchError) onFetchError(err);
      } finally {
        setInternalLoading(false);
      }
    };

    loadData();

    // Auto-refresh if interval set
    if (refreshInterval) {
      const intervalId = setInterval(loadData, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [fetchItems, refreshInterval, isExternal]); // eslint-disable-line




  const activeItem = selectedLabel ?? selectedItem;

  //  loader handling..
if (isLoading) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <CardContainer
        isHovered={false}
        elevation={2}
        sx={{ backgroundColor, minHeight: 200 }}
      >
        <List sx={{ padding: 0 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <ListItem key={i} disablePadding sx={{ display: 'block', mb: 0.5 }}>
              <StyledListItemButton isHovered={false} disabled>
                <StyledListItemIcon isHovered={false}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      animation: 'pulse 1.5s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { opacity: 0.4 },
                        '50%': { opacity: 0.8 },
                      },
                    }}
                  />
                </StyledListItemIcon>
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContainer>
    </Box>
  );
}

// error state handling
if (error) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <CardContainer
        isHovered={false}
        elevation={2}
        sx={{ backgroundColor, minHeight: 200, justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            px: 1,
            fontSize: '0.75rem',
          }}
        >
          {typeof error === 'string' ? error : error.message || 'Something went wrong'}
        </Typography>
      </CardContainer>
    </Box>
  );
}

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


      {/* Static Icon list fetching */}

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

    {/* // api icon fteching method define here */}      
      

        </List>
      </CardContainer>
    </Box>
  );
};

export default CompactIconCard;


//Complete ready component with api dat fetching..

// import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import {
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   Paper,
//   Tooltip,
//   Box,
//   Typography,
//   IconButton,
// } from '@mui/material';
// import RefreshIcon from '@mui/icons-material/Refresh';

// const ICON_ONLY_WIDTH = 50;
// const EXPANDED_WIDTH = 200;

// const CardContainer = styled(Paper)(({ theme, isHovered }) => {
//   const padding = theme.spacing(1);
//   const gap = theme.spacing(0.5);

//   return {
//     display: 'flex',
//     flexDirection: 'column',
//     height: 'auto',
//     backgroundColor: theme.palette.primary.main,
//     color: 'white',
//     borderRadius: '30px',
//     boxShadow: isHovered
//       ? '0 8px 24px rgba(100, 149, 237, 0.4)'
//       : '0 2px 8px rgba(0, 0, 0, 0.1)',
//     transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//     width: isHovered ? EXPANDED_WIDTH : ICON_ONLY_WIDTH,
//     overflow: 'hidden',
//     padding: padding,
//     gap: gap,
//   };
// });

// const StyledListItemButton = styled(ListItemButton)(({ theme, isHovered }) => ({
//   borderRadius: '8px',
//   minHeight: '48px',
//   paddingLeft: theme.spacing(1),
//   paddingRight: theme.spacing(1),
//   color: 'white',
//   justifyContent: isHovered ? 'flex-start' : 'center',
//   transition: 'all 0.2s ease-in-out',
//   '&:hover': {
//     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//     transform: 'translateX(2px)',
//   },
//   '&.Mui-selected': {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     '&:hover': {
//       backgroundColor: 'rgba(255, 255, 255, 0.25)',
//     },
//   },
// }));

// const StyledListItemIcon = styled(ListItemIcon)(({ theme, isHovered }) => ({
//   minWidth: 0,
//   justifyContent: 'center',
//   color: 'white',
//   fontSize: '24px',
//   marginRight: isHovered ? theme.spacing(1.5) : 0,
//   transition: 'margin 0.2s ease-in-out',
//   '& svg': {
//     width: '24px',
//     height: '24px',
//   },
// }));

// const StyledItemLabel = styled(Typography)(({ isHovered }) => ({
//   opacity: isHovered ? 1 : 0,
//   maxWidth: isHovered ? 150 : 0,
//   overflow: 'hidden',
//   transition: 'opacity 0.2s ease-in-out, max-width 0.2s ease-in-out',
//   fontSize: '0.875rem',
//   fontWeight: 500,
//   whiteSpace: 'nowrap',
//   margin: 0,
// }));

// const CompactIconCard = forwardRef(({
//   items: externalItems,
//   fetchItems,
//   itemKey = 'label',
//   itemLabel = 'label',
//   itemIcon = 'icon',
//   itemCount = 'count',
//   refreshInterval = null,
//   onFetchSuccess = null,
//   onFetchError = null,
//   isLoading: externalLoading = false,
//   error: externalError = null,
//   onItemClick = null,
//   onHoverChange = null,
//   selectedKey = null,
//   title = null,
//   backgroundColor = 'rgb(41,128,185)',
// }, ref) => {
//   const theme = useTheme();
//   const [isHovered, setIsHovered] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
  
//   const [internalItems, setInternalItems] = useState([]);
//   const [internalLoading, setInternalLoading] = useState(false);
//   const [internalError, setInternalError] = useState(null);

//   const isExternal = externalItems !== undefined;
//   const items = isExternal ? externalItems : internalItems;
//   const isLoading = isExternal ? externalLoading : internalLoading;
//   const error = isExternal ? externalError : internalError;

//   // ✅ IMPERATIVE REFRESH HANDLE
//   const refresh = async () => {
//     if (!fetchItems || isExternal) return;
//     setInternalLoading(true);
//     setInternalError(null);
//     try {
//       const data = await fetchItems();
//       setInternalItems(data);
//       if (onFetchSuccess) onFetchSuccess(data);
//       return data;
//     } catch (err) {
//       setInternalError(err);
//       if (onFetchError) onFetchError(err);
//       throw err;
//     } finally {
//       setInternalLoading(false);
//     }
//   };

//   useImperativeHandle(ref, () => ({
//     refresh,
//   }));

//   useEffect(() => {
//     if (isExternal || !fetchItems) return;
//     refresh();
//     if (refreshInterval) {
//       const intervalId = setInterval(refresh, refreshInterval);
//       return () => clearInterval(intervalId);
//     }
//   }, [fetchItems, refreshInterval, isExternal]); // eslint-disable-line

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//     if (onHoverChange) onHoverChange(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     if (onHoverChange) onHoverChange(false);
//   };

//   const handleItemClick = (key) => {
//     setSelectedItem(key);
//     const clickedItem = items.find(item => item[itemKey] === key);
//     if (onItemClick) onItemClick(key, clickedItem);
//   };

//   const activeItem = selectedKey ?? selectedItem;

//   if (isLoading) {
//     return (
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//         <CardContainer isHovered={false} elevation={2} sx={{ backgroundColor, minHeight: 200 }}>
//           <List sx={{ padding: 0 }}>
//             {[1, 2, 3, 4, 5].map((i) => (
//               <ListItem key={i} disablePadding sx={{ display: 'block', mb: 0.5 }}>
//                 <StyledListItemButton isHovered={false} disabled>
//                   <StyledListItemIcon isHovered={false}>
//                     <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', animation: 'pulse 1.5s ease-in-out infinite', '@keyframes pulse': { '0%, 100%': { opacity: 0.4 }, '50%': { opacity: 0.8 } } }} />
//                   </StyledListItemIcon>
//                 </StyledListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </CardContainer>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//         <CardContainer isHovered={false} elevation={2} sx={{ backgroundColor, minHeight: 200, justifyContent: 'center', alignItems: 'center' }}>
//           <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', px: 1, fontSize: '0.75rem', mb: 1 }}>
//             {typeof error === 'string' ? error : error.message || 'Something went wrong'}
//           </Typography>
//           {!isExternal && (
//             <IconButton onClick={refresh} sx={{ color: 'white' }}>
//               <RefreshIcon />
//             </IconButton>
//           )}
//         </CardContainer>
//       </Box>
//     );
//   }

//   if (!items || items.length === 0) {
//     return (
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//         <CardContainer isHovered={false} elevation={2} sx={{ backgroundColor, minHeight: 100, justifyContent: 'center', alignItems: 'center' }}>
//           <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>
//             No items
//           </Typography>
//         </CardContainer>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//       <CardContainer isHovered={isHovered} elevation={isHovered ? 8 : 2} sx={{ backgroundColor }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//         <List sx={{ padding: 0 }}>
//           {items.map((item) => {
//             const key = item[itemKey];
//             const label = item[itemLabel];
//             const IconComponent = item[itemIcon];
//             const count = item[itemCount];

//             return (
//               <Tooltip key={key} title={!isHovered ? label : ''} arrow enterDelay={300}>
//                 <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
//                   <StyledListItemButton isHovered={isHovered} selected={activeItem === key} onClick={() => handleItemClick(key)}>
//                     {IconComponent && (
//                       <StyledListItemIcon isHovered={isHovered}>
//                         <IconComponent />
//                       </StyledListItemIcon>
//                     )}
//                     <StyledItemLabel isHovered={isHovered}>{label}</StyledItemLabel>
//                     {isHovered && count !== undefined && (
//                       <Typography variant="caption" sx={{ ml: 'auto', color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>
//                         {count}
//                       </Typography>
//                     )}
//                   </StyledListItemButton>
//                 </ListItem>
//               </Tooltip>
//             );
//           })}
//         </List>
//       </CardContainer>
//     </Box>
//   );
// });

// CompactIconCard.displayName = 'CompactIconCard';
// export default CompactIconCard;