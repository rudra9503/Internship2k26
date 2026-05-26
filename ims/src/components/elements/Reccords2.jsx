import { useState, useMemo, useCallback, useEffect } from 'react'
import {
  Box,
  Paper,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  IconButton,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Typography,
  Skeleton,
  Tooltip,
  TableSortLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import RefreshIcon from '@mui/icons-material/Refresh'

//  FETCH HOOK
// ═══════════════════════════════════════════════════════════════════

const useDataFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    if (!fetchFn) return
    setLoading(true)
    setError(null)
    try {
      const result = await fetchFn()
      setData(result || [])
    } catch (err) {
      setError(err.message || 'Failed to fetch data')
      setData([])
    } finally {
      setLoading(false)
    }
  }, deps)


  useEffect(() => {
    fetch()
  }, [fetch])

  return { data, loading, error, refetch: fetch, setData }
}

//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

const Reccords2 = ({
  title = 'Records',
  columns = [],
  fetchData,              // Required: async function returning data array
  onAdd,
  onEdit,
  onDelete,
  searchable = true,
  pageSizeOptions = [10, 25, 50],
  addButtonText = 'Add',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No records found',
  sx = {},
  confirmDelete = true,   // Show confirmation dialog before delete
}) => {

  // ── Data Fetching ──
  const { data, loading, error, refetch, setData } = useDataFetch(fetchData, [fetchData])

  // ── State ──
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(pageSizeOptions[0])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [deleteDialog, setDeleteDialog] = useState({ open: false, row: null })

  // ── Sorting ──
  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }, [])

  // ── Filtered + Sorted Data ──
  const processedData = useMemo(() => {
    let result = [...data]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter((row) =>
        columns.some((col) => {
          const value = row[col.key]
          if (value == null || value === '') return false
          return String(value).toLowerCase().includes(query)
        })
      )
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key]
        const bVal = b[sortConfig.key]
        if (aVal == null) return 1
        if (bVal == null) return -1
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal
        }
        const aStr = String(aVal).toLowerCase()
        const bStr = String(bVal).toLowerCase()
        return sortConfig.direction === 'asc'
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr)
      })
    }

    return result
  }, [data, searchQuery, columns, sortConfig])

  // ── Pagination ──
  const totalPages = Math.max(1, Math.ceil(processedData.length / rowsPerPage))
  const currentPage = Math.min(page, totalPages)

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return processedData.slice(start, start + rowsPerPage)
  }, [processedData, currentPage, rowsPerPage])

  const startItem = processedData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1
  const endItem = Math.min(currentPage * rowsPerPage, processedData.length)

  // ── Handlers ──
  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value)
    setPage(1)
  }, [])

  const handlePageChange = useCallback((_, value) => {
    setPage(value)
  }, [])

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(Number(event.target.value))
    setPage(1)
  }, [])

  const handleClearSearch = useCallback(() => {
    setSearchQuery('')
    setPage(1)
  }, [])

  const handleDeleteClick = useCallback((row) => {
    if (confirmDelete) {
      setDeleteDialog({ open: true, row })
    } else {
      onDelete?.(row.id)
    }
  }, [confirmDelete, onDelete])

  const handleConfirmDelete = useCallback(() => {
    onDelete?.(deleteDialog.row.id)
    setDeleteDialog({ open: false, row: null })
  }, [onDelete, deleteDialog.row])

  // ── Cell Renderer ──
  const renderCell = useCallback((row, column) => {
    if (column.render) {
      return column.render(row)
    }

    const value = row[column.key]

    switch (column.type) {
      case 'currency': {
        if (value == null || value === '') return '—'
        const num = Number(value)
        return isNaN(num) ? '—' : `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      }
      case 'date': {
        if (!value) return '—'
        try {
          const date = new Date(value)
          return isNaN(date.getTime()) ? '—' : date.toLocaleDateString('en-IN', {
            year: 'numeric', month: 'short', day: 'numeric'
          })
        } catch {
          return String(value)
        }
      }
      case 'number': {
        if (value == null || value === '') return '—'
        const num = Number(value)
        return isNaN(num) ? '—' : num.toLocaleString('en-IN')
      }
      case 'boolean': {
        return (
          <Chip
            label={value ? 'Yes' : 'No'}
            size="small"
            sx={{
              backgroundColor: value ? '#e8f5e9' : '#ffebee',
              color: value ? '#2e7d32' : '#c62828',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 24,
            }}
          />
        )
      }
      case 'badge': {
        const colors = {
          active: { bg: '#e8f5e9', color: '#2e7d32' },
          inactive: { bg: '#ffebee', color: '#c62828' },
          pending: { bg: '#fff3e0', color: '#ef6c00' },
          completed: { bg: '#e3f2fd', color: '#1565c0' },
        }
        const status = String(value).toLowerCase()
        const color = colors[status] || colors.inactive
        return (
          <Chip
            label={value || 'Unknown'}
            size="small"
            sx={{
              backgroundColor: color.bg,
              color: color.color,
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 24,
            }}
          />
        )
      }
      default:
        return value ?? '—'
    }
  }, [])

  //  RENDER
  // ═══════════════════════════════════════════════════════════════

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: '#f8fafc', borderRadius: 3, minHeight: '100%', ...sx }}>

      {/* ── Header Bar ── */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b', mr: 'auto' }}>
          {title}
        </Typography>

        {searchable && (
          <TextField
            placeholder={searchPlaceholder}
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: '#94a3b8', mr: 0.5, fontSize: '1.1rem' }} />,
            }}
            sx={{
              width: { xs: '100%', sm: 320 },
              backgroundColor: 'white',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                height: 40,
                '& fieldset': { borderColor: '#e2e8f0' },
                '&:hover fieldset': { borderColor: '#cbd5e1' },
                '&.Mui-focused fieldset': { borderColor: '#1976d2' },
              },
            }}
          />
        )}

        {onAdd && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
            sx={{
              backgroundColor: '#1565c0',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              height: 40,
              borderRadius: 1,
              boxShadow: '0 2px 8px rgba(21, 101, 192, 0.25)',
              '&:hover': { backgroundColor: '#0d47a1' },
            }}
          >
            {addButtonText}
          </Button>
        )}

        <Button
          size="small"
          startIcon={<RefreshIcon />}
          onClick={refetch}
          disabled={loading}
          sx={{ color: '#64748b', textTransform: 'none', fontSize: '0.875rem' }}
        >
          Refresh
        </Button>

        {searchQuery && (
          <Button
            size="small"
            onClick={handleClearSearch}
            sx={{ color: '#64748b', textTransform: 'none', fontSize: '0.875rem' }}
          >
            Clear
          </Button>
        )}
      </Box>

      {/* ── Error Alert ── */}
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* ── Table ── */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ borderRadius: 2, border: '1px solid #e2e8f0', overflow: 'hidden', backgroundColor: 'white' }}
      >
        <Table size="medium" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{
              backgroundColor: '#f8fafc',
              '& .MuiTableCell-root': {
                fontWeight: 700,
                color: '#334155',
                fontSize: '0.85rem',
                py: 1.5,
                px: 2,
                borderBottom: '2px solid #e2e8f0',
                whiteSpace: 'nowrap',
              },
            }}>
              <TableCell align="center" sx={{ width: '5%' }}>S.No.</TableCell>

              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align || 'left'}
                  sx={{ width: col.width, cursor: col.sortable !== false ? 'pointer' : 'default' }}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  {col.sortable !== false ? (
                    <TableSortLabel
                      active={sortConfig.key === col.key}
                      direction={sortConfig.key === col.key ? sortConfig.direction : 'asc'}
                      IconComponent={sortConfig.key === col.key && sortConfig.direction === 'desc' ? ArrowDownwardIcon : ArrowUpwardIcon}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}

              {(onEdit || onDelete) && (
                <TableCell align="center" sx={{ width: '8%' }}>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Loading Skeleton */}
            {loading && Array.from({ length: Math.min(rowsPerPage, 5) }).map((_, idx) => (
              <TableRow key={`sk-${idx}`}>
                <TableCell><Skeleton variant="text" width={30} /></TableCell>
                {columns.map((col) => (
                  <TableCell key={`sk-${col.key}`}>
                    <Skeleton variant="text" width={col.width ? parseInt(col.width) * 0.7 : 80} />
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell><Skeleton variant="circular" width={32} height={32} /></TableCell>
                )}
              </TableRow>
            ))}

            {/* Empty State */}
            {!loading && paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 2} align="center" sx={{ py: 8 }}>
                  <Typography variant="h6" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                    {emptyMessage}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 1 }}>
                    {searchQuery ? 'Try adjusting your search terms' : 'Data will appear once fetched'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {/* Data Rows */}
            {!loading && paginatedData.map((row, rowIdx) => (
              <TableRow
                key={row.id ?? rowIdx}
                sx={{
                  backgroundColor: rowIdx % 2 === 0 ? 'white' : '#fafafa',
                  '&:hover': { backgroundColor: '#f1f5f9 !important' },
                  transition: 'background-color 0.15s ease',
                  '&:last-child td': { borderBottom: 0 },
                }}
              >
                <TableCell align="center" sx={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500 }}>
                  {(currentPage - 1) * rowsPerPage + rowIdx + 1}
                </TableCell>

                {columns.map((col) => (
                  <TableCell
                    key={`${row.id}-${col.key}`}
                    align={col.align || 'left'}
                    sx={{ color: '#334155', fontSize: '0.875rem', fontWeight: col.key === 'productName' ? 500 : 400 }}
                  >
                    {renderCell(row, col)}
                  </TableCell>
                ))}

                {(onEdit || onDelete) && (
                  <TableCell align="center">
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      {onEdit && (
                        <Tooltip title="Edit" arrow>
                          <IconButton size="small" color="primary" onClick={() => onEdit(row)} sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onDelete && (
                        <Tooltip title="Delete" arrow>
                          <IconButton size="small" color="error" onClick={() => handleDeleteClick(row)} sx={{ '&:hover': { backgroundColor: '#ffebee' } }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ── Pagination ── */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-end' }, alignItems: 'center', mt: 2.5, gap: 2 }}>
        <Typography variant="body2" sx={{ color: '#64748b', whiteSpace: 'nowrap', fontSize: '0.875rem' }}>
          {processedData.length === 0 ? '0 results' : `${startItem.toLocaleString()}-${endItem.toLocaleString()} of ${processedData.length.toLocaleString()}`}
        </Typography>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          size="small"
          showFirstButton
          showLastButton
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#64748b',
              border: '1px solid #e2e8f0',
              minWidth: 32,
              height: 32,
              fontSize: '0.8rem',
              '&:hover': { backgroundColor: '#f1f5f9' },
            },
            '& .Mui-selected': {
              backgroundColor: '#1976d2 !important',
              color: 'white !important',
              borderColor: '#1976d2',
              fontWeight: 600,
            },
          }}
        />

        <FormControl size="small" sx={{ minWidth: 100 }}>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            sx={{ backgroundColor: 'white', height: 34, fontSize: '0.85rem' }}
          >
            {pageSizeOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>{opt} / page</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* ── Delete Confirmation Dialog ── */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, row: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this record?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, row: null })}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Reccords2