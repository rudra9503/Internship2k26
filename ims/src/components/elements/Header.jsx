// import React from 'react';
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Box,
//   Button,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// const Header = ({ onDrawerOpen }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         backgroundColor: 'rgb(100, 149, 237)',
//         boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//         zIndex: theme.zIndex.drawer + 1,
//       }}
//     >
//       <Toolbar
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           gap: 2,
//         }}
//       >
//         {/* Left Side - Hamburger + Logo */}
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//           {/* <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={onDrawerOpen}
//             sx={{
//               '&:hover': {
//                 backgroundColor: 'rgba(255, 255, 255, 0.1)',
//               },
//             }}
//           >
//             <MenuIcon />
//           </IconButton> */}

//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 700,
//               letterSpacing: 0.5,
//               fontSize: isMobile ? '1.5rem' : '1.75rem',
//             }}
//           >
//             IMS
//           </Typography>
//         </Box>

//         {/* Center - Branch Name (Hidden on mobile) */}
//         {!isMobile && (
//           <Typography
//             variant="subtitle1"
//             sx={{
//               fontWeight: 500,
//               fontSize: '1rem',
//               flex: 1,
//               textAlign: 'center',
//             }}
//           >
//             Pune Branch
//           </Typography>
//         )}

//         {/* Right Side - Pay Button + Account Icon */}
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: isMobile ? 1 : 2,
//             ml: 'auto',
//           }}
//         >
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: 'white',
//               color: 'rgb(100, 149, 237)',
//               fontWeight: 600,
//               fontSize: isMobile ? '0.75rem' : '0.875rem',
//               padding: isMobile ? '6px 12px' : '8px 24px',
//               textTransform: 'none',
//               borderRadius: '8px',
//               '&:hover': {
//                 backgroundColor: '#f0f0f0',
//               },
//               whiteSpace: 'nowrap',
//             }}
//           >
//             {isMobile ? 'Pay' : 'Pay Now'}
//           </Button>

//           <IconButton
//             color="inherit"
//             sx={{
//               '&:hover': {
//                 backgroundColor: 'rgba(255, 255, 255, 0.1)',
//               },
//             }}
//           >
//             <AccountCircleIcon
//               sx={{
//                 fontSize: isMobile ? '1.75rem' : '2rem',
//               }}
//             />
//           </IconButton>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;


import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Sidebar from './Sidebar';

const Header = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Fixed Header */}
      <div className="header bg-[rgb(100,149,237)] fixed top-0 left-0 right-0 .z-[1300]">
        <nav className="flex items-center justify-between px-6 py-4 text-white">
          
          {/* Left Side - Hamburger + Logo */}
          <div className="flex items-center gap-3">
            {/* Hamburger Menu Button - controlled here */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                color: 'white',
                display: open ? 'none' : 'flex',
              }}
            >
              <MenuIcon />
            </IconButton>

            <h1 className="text-3xl font-bold tracking-tight">IMS</h1>
          </div>

          {/* Center - Branch Name */}
          <div className="text-lg font-medium">
            Pune Branch
          </div>

          {/* Right Side - Pay Button + Account Icon */}
          <div className="flex items-center gap-6">
            <button className="bg-white text-[rgb(100,149,237)] font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Pay Now
            </button>
            
            <AccountCircleIcon 
              fontSize="large" 
              className="cursor-pointer hover:text-gray-200 transition-colors" 
            />
          </div>
        </nav>
      </div>

      {/* Sidebar Drawer - positioned below header */}
      <Sidebar open={open} onClose={handleDrawerClose} />
    </>
  )
}

export default Header