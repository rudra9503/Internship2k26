import { Box, Button } from '@mui/material';

const tabs = [
  'Dashboard',
  'Shipment Report',
  'Order Management',
  'Transport Report',
  'Add Product',
  'Settings',
];

const SwitcherTab = ({ activeTab, onTabChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        flexWrap: 'wrap',
        bgcolor: 'rgb(41,128,185)',
        borderRadius: 30,
        p: '8px 16px',
        //boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {tabs.map((label, index) => (
        <Button
          key={label}
          onClick={() => onTabChange(index)}
          sx={{
            color: 'white',
            fontWeight: activeTab === index ? 600 : 400,
            px: 2,
            py: 1,
            borderRadius: 30,
            bgcolor: activeTab === index ? 'rgba(0,0,0,0.2)' : 'transparent',
            '&:hover': {
              bgcolor: 'rgba(84, 84, 84, 0.9)',
              borderRadius: 30,
            },
            textTransform: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default SwitcherTab;
