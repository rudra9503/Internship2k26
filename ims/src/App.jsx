import { useState } from 'react'
import './App.css'
import Header from './components/elements/Header'
import AppBar from './components/elements/Sidebar'
import Main from './components/pages/Main'
import { Box, Button, Grid, Paper, Tab, Table, Typography } from '@mui/material'
import Sidebar from './components/elements/Sidebar'
import { CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Height } from '@mui/icons-material';
import SwitcherTab from './components/elements/SwitcherTab'
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HoverMenu from './components/elements/Hovermenu'
import CompactIconCard from './components/elements/CompactIconCard'

function App() {
  

  return (
  <>

  <div className='col-span-full'>
    
  <Header/>

 </div>
 <div className='col-span-3 h-full'>

  {/* <Sidebar/> */}

  

    </div>
      <div className='col-end-3 p-30'>

      <CompactIconCard/>
     
 </div>
   

  </>
   
        
  )
}


export default App
