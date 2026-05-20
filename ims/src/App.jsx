import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/elements/Header';
import { Box, Paper } from '@mui/material';
import Sidebar from './components/elements/Sidebar';
import SwitcherTab from './components/elements/SwitcherTab';
import CompactIconCard from './components/elements/CompactIconCard';

// ========== IMPORT YOUR PAGE COMPONENTS ==========
import Dashboard from './components/pages/Dashboard';
import ShipmentReport from './components/pages/ShipmentReport';
import OrderManagement from './components/pages/OrderManagement';
import TransportReport from './components/pages/TransportReport';
import AddProduct from './components/pages/AddProduct';
import Settings from './components/pages/Settings';
import Transport from './components/pages/Transport';
import Shipment from './components/pages/Shipment';
import Staff from './components/pages/Staff';
import Vendor from './components/pages/Vendor';

const DRAWER_WIDTH_OPEN = 240;
const DRAWER_WIDTH_CLOSED = 60;
const NAVBAR_HEIGHT = 48;
const TABS_HEIGHT = 50;
const COLLAPSE_ICON_WIDTH = 50;
const COLLAPSE_EXPANDED_WIDTH = 200;

// Route configuration
const ROUTES = {
  dashboard: '/',
  shipmentReport: '/shipment-report',
  orderManagement: '/order-management',
  transportReport: '/transport-report',
  addProduct: '/add-product',
  settings: '/settings',
  transport: '/transport',
  shipment: '/shipment',
  staff: '/staff',
  vendors: '/vendors',
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuExpanded, setMenuExpanded] = useState(false);

  const drawerWidth = sidebarOpen ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED;
  const col1Width = menuExpanded ? COLLAPSE_EXPANDED_WIDTH : COLLAPSE_ICON_WIDTH;

  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path === ROUTES.shipmentReport) return 1;
    if (path === ROUTES.orderManagement) return 2;
    if (path === ROUTES.transportReport) return 3;
    if (path === ROUTES.addProduct) return 4;
    if (path === ROUTES.settings) return 5;
    return 0;
  };

  const activeTab = getActiveTabFromPath();

  const handleTabChange = (index) => {
    const routes = [
      ROUTES.dashboard,
      ROUTES.shipmentReport,
      ROUTES.orderManagement,
      ROUTES.transportReport,
      ROUTES.addProduct,
      ROUTES.settings,
    ];
    navigate(routes[index]);
  };

  const handleSidebarNav = (path) => {
    navigate(path);
  };

  const handleCompactIconClick = (label) => {
    console.log(`Action: ${label}`);
    // Example: navigate based on label
    switch (label) {
      case 'Add Status':
        navigate('/add-status');
        break;
      case 'Add Type':
        navigate('/add-type');
        break;
      case 'Add Vendor':
        navigate('/add-vendor');
        break;
      case 'Add Sent By':
        navigate('/add-sent-by');
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* ==================== FIXED NAVBAR ==================== */}
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: NAVBAR_HEIGHT,
          zIndex: 1300,
        }}
      >
        <Header 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
          sidebarOpen={sidebarOpen}
          onLogoClick={() => navigate(ROUTES.dashboard)}
        />
      </Box>

      {/* ==================== FIXED SIDEBAR ==================== */}
      <Box
        component="aside"
        sx={{
          position: 'fixed',
          top: NAVBAR_HEIGHT,
          left: 0,
          bottom: 0,
          width: drawerWidth,
          zIndex: 1200,
          overflowY: 'auto',
          transition: 'width 0.3s ease',
        }}
      >
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={handleSidebarNav}
        />
      </Box>

      {/* ==================== MAIN CONTENT ==================== */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          mt: `${NAVBAR_HEIGHT}px`,
          p: 0,
          paddingTop: 0,
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          transition: 'margin-left 0.3s ease',
          bgcolor: 'background.default',
        }}
      >
        {/* ==================== FIXED TABS ==================== */}
        <Paper
          elevation={1}
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            mb: 0,
            width: '100%',
          }}
        >
          <SwitcherTab activeTab={activeTab} onTabChange={handleTabChange} />
        </Paper>

        {/* ==================== TWO COLUMNS ==================== */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 2,
          }}
        >
          {/* ===== COLUMN 1: HOVER-EXPANDABLE MENU ===== */}
          <Box
            sx={{
              width: { xs: '100%', lg: col1Width },
              flexShrink: 0,
              transition: 'width 0.2s ease',
              overflow: 'hidden',
              paddingInlineStart: 1,
            }}
          >
            <Paper
              sx={{
                paddingInlineStart: 0,
                position: { lg: 'sticky' },
                top: `${TABS_HEIGHT + 0}px`,
                maxHeight: { lg: `calc(100vh - ${NAVBAR_HEIGHT + TABS_HEIGHT + 48}px)` },
                overflowY: 'auto',
                overflowX: 'auto',
              }}
            >
              <CompactIconCard
                onHoverChange={(expanded) => setMenuExpanded(expanded)}
                onItemClick={handleCompactIconClick}
              />
            </Paper>
          </Box>

          {/* ===== COLUMN 2: CONTENT ===== */}
          <Box sx={{ flexGrow: 1, minWidth: 0, paddingBlockEnd: 2, p: 3 }}>
            {/* ========== ROUTES WITH REAL COMPONENTS ========== */}
            <Routes>
              <Route path={ROUTES.dashboard} element={<Dashboard />} />
              <Route path={ROUTES.shipmentReport} element={<ShipmentReport />} />
              <Route path={ROUTES.orderManagement} element={<OrderManagement />} />
              <Route path={ROUTES.transportReport} element={<TransportReport />} />
              <Route path={ROUTES.addProduct} element={<AddProduct />} />
              <Route path={ROUTES.settings} element={<Settings />} />
              <Route path={ROUTES.transport} element={<Transport />} />
              <Route path={ROUTES.shipment} element={<Shipment />} />
              <Route path={ROUTES.staff} element={<Staff />} />
              <Route path={ROUTES.vendors} element={<Vendor />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;