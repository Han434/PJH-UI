import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';

const CustomTable = ({ columns, data, onRowClick }) => {
  return (
    <TableContainer component={Box}>
      <Table>
        <TableHead
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'background.paper',
            zIndex: 10,

          }}
        >
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.field} style={{ width: col.width || 'auto' }}>
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              hover
              sx={{ cursor: 'pointer', backgroundColor: 'background.default' }}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col) => (
                <TableCell key={col.field}>{row[col.field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func,
};

export default CustomTable;