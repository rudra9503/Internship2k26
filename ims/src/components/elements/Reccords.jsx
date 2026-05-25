import { useMemo, useState } from 'react'
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Stack,
  Grow
} from '@mui/material'
import { useLocation } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { SAMPLE_DATA } from '../settings/recordsData'

// ── Types ──────────────────────────────────────────────────────────
/**
 * @typedef {Object} RecordItem
 * @property {string|number} id
 * @property {string} [first_name]
 * @property {string} [last_name]
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [status]
 * @property {string} [department]
 * @property {Date|string} [created_at]
 */

// ── Table Config by Type ───────────────────────────────────────────
const TABLE_CONFIG = {
  employeeBy: {
    title: 'Employee',
    columns: [
      { key: 'sno', label: 'S.No.', align: 'center', width: '8%' },
      //{ key: 'name', label: 'Employee Name', align: 'left', width: '22%' },
      { key: 'email', label: 'Email', align: 'left', width: '25%' },
     // { key: 'department', label: 'Department', align: 'center', width: '15%' },
    //  { key: 'status', label: 'Status', align: 'center', width: '12%' },
     // { key: 'created_at', label: 'Joined Date', align: 'center', width: '18%' },
    ],
    renderCell: (row, colKey) => {
      switch (colKey) {
        case 'sno':
          return row._index + 1
        case 'name':
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2', fontSize: '0.70rem' }}>
                {(row.first_name?.[0] ?? '?')}{(row.last_name?.[0] ?? '')}
              </Avatar>
              <Typography sx={{ fontWeight: 500 }}>
                {row.first_name ?? 'N/A'} {row.last_name?.charAt(0) ?? ''}.
              </Typography>
            </Box>
          )
        case 'status': {
          const statusColors = {
            Active: { bg: '#e8f5e9', color: '#2e7d32', border: '#4caf50' },
            Inactive: { bg: '#ffebee', color: '#c62828', border: '#ef5350' },
            'On Leave': { bg: '#fff3e0', color: '#ef6c00', border: '#ff9800' },
            Probation: { bg: '#e3f2fd', color: '#1565c0', border: '#2196f3' },
            Suspended: { bg: '#f5f5f5', color: '#616161', border: '#9e9e9e' },
          }
          const sc = statusColors[row.status] || statusColors.Inactive
          return (
            <Chip
              label={row.status ?? 'Unknown'}
              size="small"
              sx={{
                backgroundColor: sc.bg,
                color: sc.color,
                border: `1px solid ${sc.border}`,
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 20,
              }}
            />
          )
        }
        case 'created_at':
          return row.created_at
            ? new Date(row.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
              })
            : '—'
        default:
          return row[colKey] ?? '—'
      }
    }
  },
  status: {
    title: 'Status',
    columns: [
      { key: 'sno', label: 'S.No.', align: 'center', width: '8%' },
      { key: 'name', label: 'Status Name', align: 'left', width: '25%' },
      { key: 'description', label: 'Description', align: 'left', width: '40%' },
      { key: 'count', label: 'Count', align: 'center', width: '12%' },
      { key: 'badge', label: 'Badge', align: 'center', width: '15%' },
    ],
    renderCell: (row, colKey) => {
      switch (colKey) {
        case 'sno': return row._index + 1
        case 'badge':
          return <Chip label={row.name} color={row.color || 'default'} size="small" variant="outlined" />
        default: return row[colKey] ?? '—'
      }
    }
  },
  type: {
    title: 'Type',
    columns: [
      { key: 'sno', label: 'S.No.', align: 'center', width: '8%' },
      { key: 'name', label: 'Type Name', align: 'left', width: '25%' },
      { key: 'description', label: 'Description', align: 'left', width: '35%' },
      { key: 'category', label: 'Category', align: 'center', width: '15%' },
      { key: 'count', label: 'Count', align: 'center', width: '17%' },
    ],
    renderCell: (row, colKey) => {
      switch (colKey) {
        case 'sno': return row._index + 1
        default: return row[colKey] ?? '—'
      }
    }
  },
  vendor: {
    title: 'Vendor',
    columns: [
      { key: 'sno', label: 'S.No.', align: 'center', width: '6%' },
      { key: 'name', label: 'Vendor Name', align: 'left', width: '22%' },
      { key: 'contact', label: 'Contact Person', align: 'left', width: '18%' },
      { key: 'email', label: 'Email', align: 'left', width: '22%' },
      { key: 'phone', label: 'Phone', align: 'center', width: '15%' },
      { key: 'category', label: 'Category', align: 'center', width: '10%' },
      { key: 'status', label: 'Status', align: 'center', width: '12%' },
    ],
    renderCell: (row, colKey) => {
      switch (colKey) {
        case 'sno': return row._index + 1
        case 'status':
          return (
            <Chip
              label={row.status ?? 'Unknown'}
              size="small"
              color={row.status === 'Active' ? 'success' : 'default'}
              variant={row.status === 'Active' ? 'filled' : 'outlined'}
            />
          )
        default: return row[colKey] ?? '—'
      }
    }
  },
  sentBy: {
    title: 'Sent By',
    columns: [
      { key: 'sno', label: 'S.No.', align: 'center', width: '8%' },
      { key: 'name', label: 'Sender Name', align: 'left', width: '25%' },
      { key: 'email', label: 'Email', align: 'left', width: '30%' },
      { key: 'role', label: 'Role', align: 'center', width: '15%' },
      { key: 'department', label: 'Department', align: 'center', width: '22%' },
    ],
    renderCell: (row, colKey) => {
      switch (colKey) {
        case 'sno': return row._index + 1
        case 'name':
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ width: 30, height: 30, bgcolor: '#7b1fa2', fontSize: '0.8rem' }}>
                {(row.first_name?.[0] ?? '?')}
              </Avatar>
              <Typography>{row.first_name ?? 'N/A'} {row.last_name ?? ''}</Typography>
            </Box>
          )
        default: return row[colKey] ?? '—'
      }
    }
  },
}

const FORM_FIELDS = {
  employeeBy: [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' },
    { key: 'status', label: 'Status' },
    { key: 'created_at', label: 'Joined Date', type: 'date' },
  ],
  status: [
    { key: 'name', label: 'Status Name' },
    { key: 'description', label: 'Description' },
    { key: 'color', label: 'Badge Color' },
    { key: 'count', label: 'Count', type: 'number' },
  ],
  type: [
    { key: 'name', label: 'Type Name' },
    { key: 'description', label: 'Description' },
    { key: 'category', label: 'Category' },
    { key: 'count', label: 'Count', type: 'number' },
  ],
  vendor: [
    { key: 'name', label: 'Vendor Name' },
    { key: 'contact', label: 'Contact Person' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' },
  ],
  sentBy: [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department' },
  ],
}

const PATH_TYPE_MAP = {
  '/add-status': 'status',
  '/add-type': 'type',
  '/add-vendor': 'vendor',
  '/add-sent-by': 'sentBy',
  '/employee-by': 'employeeBy',
}

const getEmptyFormState = (type) => {
  return (FORM_FIELDS[type] || FORM_FIELDS.employeeBy).reduce((form, field) => {
    form[field.key] = ''
    return form
  }, {})
}

// ── Main Component ─────────────────────────────────────────────────
const Records = ({
  recordType,
  records,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({})

  const type = useMemo(() => {
    return recordType || PATH_TYPE_MAP[location.pathname] || 'Add Status'
  }, [location.pathname, recordType])

  const config = TABLE_CONFIG[type] || TABLE_CONFIG.employeeBy
  const fields = FORM_FIELDS[type] || FORM_FIELDS.employeeBy
  const rawData = useMemo(() => {
    return (records || SAMPLE_DATA[type] || SAMPLE_DATA.employeeBy).map((item, idx) => ({
      ...item,
      _index: idx,
    }))
  }, [records, type])

  const resetForm = () => {
    setFormData(getEmptyFormState(type))
    setEditingId(null)
    setFormOpen(false)
  }

  const handleAdd = () => {
    setFormData(getEmptyFormState(type))
    setEditingId(null)
    setFormOpen(true)
  }

  const handleEdit = (row) => {
    const nextForm = getEmptyFormState(type)
    fields.forEach((field) => {
      nextForm[field.key] = row[field.key] ?? ''
    })
    setFormData(nextForm)
    setEditingId(row.id)
    setFormOpen(true)
  }

  const handleFormChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = fields.reduce((nextPayload, field) => {
      const value = formData[field.key]
      nextPayload[field.key] = field.type === 'number' ? Number(value || 0) : value
      return nextPayload
    }, {})

    if (editingId !== null) {
      onUpdate?.(type, editingId, payload)
    } else {
      onCreate?.(type, payload)
    }

    resetForm()
  }

  const handleDelete = (id) => {
    onDelete?.(type, id)
  }

  // ── Filtering ────────────────────────────────────────────────────
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return rawData
    const q = searchQuery.toLowerCase()
    return rawData.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(q)
      )
    )
  }, [rawData, searchQuery])

  // ── Pagination ───────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage))
  const currentPage = Math.min(page, totalPages)
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredData.slice(start, start + rowsPerPage)
  }, [filteredData, currentPage, rowsPerPage])

  const startItem = filteredData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1
  const endItem = Math.min(currentPage * rowsPerPage, filteredData.length)

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: '#f5f5f5', maxHeight: 'auto', borderRadius:3, borderColor:'black'}}>
      {/* Top Controls */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          height:'auto',
          
        }}
      >
        <TextField
          placeholder={`Search ${config.title}...`}
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
          sx={{
            width: { xs: '100%', sm: 280 },
            backgroundColor: 'white',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              height: 40,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            backgroundColor: '#1976d2',
            textTransform: 'uppercase',
            fontWeight: 600,
            px: 3,
            height: 40,
            borderRadius: 1,
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          Add
        </Button>
        <Chip
          label={`Total ${config.title}: ${filteredData.length}`}
          variant="outlined"
          sx={{
            height: 40,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: '#1976d2',
            color: '#1976d2',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        />
      </Box>

      {formOpen && (
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2,
            border: '1px solid #e0e0e0',
            boxShadow: 'none',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            {editingId !== null ? `Edit ${config.title}` : `Add ${config.title}`}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
              gap: 2,
            }}
          >
            {fields.map((field) => (
              <TextField
                key={field.key}
                label={field.label}
                type={field.type || 'text'}
                value={formData[field.key] ?? ''}
                onChange={(event) => handleFormChange(field.key, event.target.value)}
                size="small"
                fullWidth
                required={field.key === 'name' || field.key === 'first_name'}
                InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
              />
            ))}
          </Box>
          <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              {editingId !== null ? 'Update' : 'Save'}
            </Button>
            <Button variant="outlined" startIcon={<CloseIcon />} onClick={resetForm}>
              Cancel
            </Button>
          </Stack>
        </Paper>
      )}

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}
      >
        <Table aria-label={`${config.title.toLowerCase()} table`} sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e8e8e8' }}>
              {config.columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align}
                  sx={{
                    fontWeight: 700,
                    color: '#333',
                    fontSize: '0.9rem',
                    py: 1,
                    borderBottom: '2px solid #ddd',
                    width: col.width,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  color: '#333',
                  fontSize: '0.9rem',
                  py: 1.5,
                  borderBottom: '2px solid #ddd',
                  whiteSpace: 'nowrap',
                  width: 120,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={config.columns.length + 1}
                  align="center"
                  sx={{ py: 6, color: '#888', fontSize: '0.95rem' }}
                >
                  No records found{searchQuery ? ' matching your search' : ''}.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => (
                <TableRow
                  key={row.id ?? row._index}
                  sx={{
                    backgroundColor: row._index % 2 === 0 ? '#fafafa' : 'white',
                    '&:hover': { backgroundColor: '#f0f0f0' },
                    '&:last-child td': { borderBottom: 0 },
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  {config.columns.map((col) => (
                    <TableCell
                      key={`${row.id}-${col.key}`}
                      align={col.align}
                      sx={{
                        py: 1.6,
                        borderBottom: '1px solid #f0f0f0',
                        color: '#444',
                        fontSize: '0.88rem',
                        fontWeight: col.key === 'name' ? 500 : 400,
                      }}
                    >
                      {config.renderCell(row, col.key)}
                    </TableCell>
                  ))}
                  <TableCell align="center" sx={{ borderBottom: '1px solid #f0f0f0' }}>
                    <IconButton
                      size="small"
                      color="primary"
                      aria-label={`Edit ${config.title}`}
                      onClick={() => handleEdit(row)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      aria-label={`Delete ${config.title}`}
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', sm: 'flex-end' },
          alignItems: 'center',
          mt: 2.5,
          gap: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: '#666', whiteSpace: 'nowrap' }}>
          {filteredData.length === 0 ? '0' : `${startItem}-${endItem}`} of {filteredData.length}
        </Typography>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, val) => setPage(val)}
          shape="rounded"
          size="small"
          showFirstButton
          showLastButton
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#666',
              border: '1px solid #ddd',
              minWidth: 32,
              height: 32,
              fontSize: '0.8rem',
            },
            '& .Mui-selected': {
              backgroundColor: '#e3f2fd !important',
              color: '#1976d2',
              borderColor: '#1976d2',
              fontWeight: 600,
            },
          }}
        />

        <FormControl size="small" sx={{ minWidth: 110 }}>
          <Select
            value={rowsPerPage}
            onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1) }}
            sx={{
              backgroundColor: 'white',
              height: 34,
              fontSize: '0.85rem',
              '& .MuiOutlinedInput-notchedOutline': { borderRadius: 2 },
            }}
          >
            <MenuItem value={5}>5 / page</MenuItem>
            <MenuItem value={10}>10 / page</MenuItem>
            <MenuItem value={25}>25 / page</MenuItem>
            <MenuItem value={50}>50 / page</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default Records
