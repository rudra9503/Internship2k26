import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Switch } from '@mui/material';

const Settings = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Settings
      </Typography>
      
      <Paper>
        <List>
          <ListItem>
            <ListItemText primary="Email Notifications" secondary="Receive email alerts" />
            <Switch defaultChecked />
          </ListItem>
          <ListItem>
            <ListItemText primary="Dark Mode" secondary="Toggle dark theme" />
            <Switch />
          </ListItem>
          <ListItem>
            <ListItemText primary="Auto-save" secondary="Save changes automatically" />
            <Switch defaultChecked />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Settings;