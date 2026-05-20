import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const OrderManagement = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Order Management
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Orders List</Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            New Order
          </Button>
        </Box>
        {/* Add your order table or content here */}
        <Typography color="text.secondary">Order management content goes here...</Typography>
      </Paper>
    </Box>
  );
};

export default OrderManagement;