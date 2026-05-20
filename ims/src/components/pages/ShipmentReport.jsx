import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Reccords from '../elements/Reccords'; // Reuse your table


const ShipmentReport = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Shipment Report
      </Typography>
      <Button>Add</Button>
      <Reccords /> {/* Your existing table component */}
    </Box>
  );
};

export default ShipmentReport;