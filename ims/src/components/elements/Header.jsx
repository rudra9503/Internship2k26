import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Sidebar from './Sidebar';

const Header = () => {
  const [open, setOpen] = useState(false);

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