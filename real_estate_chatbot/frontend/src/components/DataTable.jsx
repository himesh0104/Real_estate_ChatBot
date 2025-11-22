import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Download } from 'react-feather';

const DataTable = ({ data, title, onDownload }) => {

  if (!data || data.length === 0) {
    return (
      <div className="alert alert-info">
        No data available for the selected filters.
      </div>
    );
  }

  // Get all unique keys from the data objects
  const allKeys = [...new Set(data.flatMap(item => Object.keys(item)))];

  // Filter out keys that we don't want to display
  const displayKeys = allKeys.filter(
    key => !['id', '_id', 'created_at', 'updated_at'].includes(key)
  );

  // Format cell value based on key
  const formatCellValue = (key, value) => {
    if (value === null || value === undefined) return '-';
    
    // Format currency values
    if (key.toLowerCase().includes('price') && typeof value === 'number') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(value);
    }
    
    // Format numbers with commas
    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        return value.toLocaleString();
      }
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    return value;
  };

  return (
    <div className="data-table">
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="mb-0">{title || 'Real Estate Data'}</h5>
        {onDownload && (
          <div className="btn-group" role="group">
            <button
              className="btn btn-sm btn-outline-primary d-flex align-items-center"
              onClick={() => onDownload('csv')}
            >
              <Download size={16} className="me-1" /> CSV
            </button>
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => onDownload('excel')}
            >
              XLSX
            </button>
          </div>
        )}
      </div>
      <div className="table-responsive">
        <Table hover className="mb-0">
          <thead className="table-light">
            <tr>
              {displayKeys.map(key => (
                <th key={key} className="text-nowrap">
                  {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {displayKeys.map(key => (
                  <td key={`${index}-${key}`} className="text-nowrap">
                    {formatCellValue(key, item[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  onDownload: PropTypes.func,
};

DataTable.defaultProps = {
  data: [],
};

export default DataTable;