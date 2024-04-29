import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from 'react';

const Grid = ({ rowData }) => {
  const [colDef, setColDef] = useState([
    { field: 'TestCode' },
    { field: 'CreatedAt' },
    {
      field: 'Status',
      cellStyle: params => {
        if (params.value === 'review') {
          return { color: 'orange' };
        } else if (params.value === 'rejected') {
          return { color: 'red' };
        } else if (params.value === 'published') {
          return { color: 'green' };
        } else {
          return {};
        }
      }
    },
  { field: 'CreatedBy' },
  ]);

// const[rowData,setRowData]=useState([
//   {TestCode:'buhadsb',CreatedAt:'fdhjhdsj',Status:'jh fjds',CreatedBy:'hgvcga'}
// ])

return (
  <div className='ps-3 ag-theme-quartz' id="myGrid" style={{ height: '450px', width: '900px' }}>
    <AgGridReact
      rowData={rowData}
      columnDefs={colDef}
    />
  </div>
)
}

export default Grid
