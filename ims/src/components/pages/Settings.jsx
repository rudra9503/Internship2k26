import { useMemo, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Reccords from '../elements/Reccords';
import CompactIconCard from '../elements/CompactIconCard';
import { SAMPLE_DATA } from '../settings/recordsData';

const COLLAPSE_ICON_WIDTH = 60;
const COLLAPSE_EXPANDED_WIDTH = 200;
const TABS_HEIGHT = 48;
const NAVBAR_HEIGHT = 48;

const SETTINGS_TABS = {
  '/settings': { label: 'Settings', type: 'employeeBy' },
  '/add-status': { label: 'Add Status', type: 'status' },
  '/add-type': { label: 'Add Type', type: 'type' },
  '/add-vendor': { label: 'Add Vendor', type: 'vendor' },
  '/add-sent-by': { label: 'Add Sent By', type: 'sentBy' },
  '/employee-by': { label: 'Employee By', type: 'employeeBy' },
};

const ROUTE_BY_LABEL = {
  'Add Status': '/add-status',
  'Add Type': '/add-type',
  'Add Vendor': '/add-vendor',
  'Add Sent By': '/add-sent-by',
  'Employee By': '/employee-by',
};

const createInitialRecords = () => {
  return Object.entries(SAMPLE_DATA).reduce((nextRecords, [type, rows]) => {
    nextRecords[type] = rows.map((row) => ({ ...row }));
    return nextRecords;
  }, {});
};

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [recordsByType, setRecordsByType] = useState(createInitialRecords);

  const col1Width = menuExpanded ? COLLAPSE_EXPANDED_WIDTH : COLLAPSE_ICON_WIDTH;
  const activeSettingsTab = SETTINGS_TABS[location.pathname] ?? SETTINGS_TABS['/settings'];
  const pageName = activeSettingsTab.label;
  const currentType = activeSettingsTab.type;
  const currentRecords = recordsByType[currentType] ?? [];

  const menuItems = useMemo(() => {
    return Object.entries(ROUTE_BY_LABEL).map(([label, route]) => {
      const type = SETTINGS_TABS[route].type;
      return {
        label,
        count: recordsByType[type]?.length ?? 0,
      };
    });
  }, [recordsByType]);

  const handleItemClick = (label) => {
    if (ROUTE_BY_LABEL[label]) {
      navigate(ROUTE_BY_LABEL[label]);
      return;
    }

    console.warn(`Unknown action: ${label}`);
  };

  const createRecord = (type, payload) => {
    setRecordsByType((current) => {
      const existingRows = current[type] ?? [];
      const nextId = existingRows.reduce((maxId, row) => Math.max(maxId, Number(row.id) || 0), 0) + 1;
      return {
        ...current,
        [type]: [...existingRows, { id: nextId, ...payload }],
      };
    });
  };

  const updateRecord = (type, id, payload) => {
    setRecordsByType((current) => ({
      ...current,
      [type]: (current[type] ?? []).map((row) =>
        row.id === id ? { ...row, ...payload } : row
      ),
    }));
  };

  const deleteRecord = (type, id) => {
    setRecordsByType((current) => ({
      ...current,
      [type]: (current[type] ?? []).filter((row) => row.id !== id),
    }));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#263238' }}>
          Settings
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 0.5 }}>
          {pageName}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: 2,
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', lg: col1Width },
            flexShrink: 0,
            transition: 'width 0.2s ease',
            overflow: 'hidden',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              position: { lg: 'sticky' },
              top: `${TABS_HEIGHT}px`,
              maxHeight: { lg: `calc(100vh - ${NAVBAR_HEIGHT + TABS_HEIGHT + 48}px)` },
              overflowY: 'auto',
              overflowX: 'hidden',
              bgcolor: 'transparent',
            }}
          >
            <CompactIconCard
              items={menuItems}
              title="Settings Menu"
              selectedLabel={pageName === 'Settings' ? 'Employee By' : pageName}
              onHoverChange={(expanded) => setMenuExpanded(expanded)}
              onItemClick={handleItemClick}
            />
          </Paper>
        </Box>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Reccords
            recordType={currentType}
            records={currentRecords}
            onCreate={createRecord}
            onUpdate={updateRecord}
            onDelete={deleteRecord}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
