import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const Grid = ({ rowData }) => {
  const ThemeMode=useSelector(state=>state.Theme.mode);
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

  const defaultColDef=useMemo(()=>{
    return {
      filter:'agTextColumnFilter',
      floatingFilter:true,
    }
  },[]);

// const[rowData,setRowData]=useState([
//   {TestCode:'buhadsb',CreatedAt:'fdhjhdsj',Status:'jh fjds',CreatedBy:'hgvcga'}
// ])

return (
  <div className={`pl-3 ag-theme-quartz ${ThemeMode==='light'? 'ag-theme-quartz':'ag-theme-quartz-dark'}`} id="myGrid" style={{ height: '450px', width: '900px' }}>
    <AgGridReact
      rowData={rowData}
      columnDefs={colDef}
      defaultColDef={defaultColDef}
      pagination={true}
      paginationPageSize={10}
      paginationPageSizeSelector={[10, 25, 50]}
    />
  </div>
)
}

export default Grid
