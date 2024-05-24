import React, { useEffect, useState } from 'react'
import { useSidebar } from '../../../ContextStore/SideBarContextSuper'
import { Tabs } from 'antd';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import QuestionListing from '../../AllQuestionsAdmin/QuestionListing';
import Grid from '../../AllQuestionsAdmin/Grid';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import '../../AllQuestionsAdmin/allQuestions.css'
import { red } from '@mui/material/colors';
import { useSelector } from 'react-redux';

const AllQuestions = () => {
    const { isCollapsedSuper } = useSidebar();
    const [questionType,setQuestionType]=useState('Manual Entry');
    const ThemeMode=useSelector(store=>store.Theme.mode);
    
    const items = [
        {
            key: '1',
            label: 'All',
            children: <QuestionListing type='nothing'/>,
        },
        {
            key: '2',
            label: 'Pending',
            children: <QuestionListing type='review'/>
        },
        {
            key: '3',
            label: 'Published',
            children: <Grid/>
        },
        {
            key: '4',
            label: 'Rejected',
            children: <QuestionListing type='rejected'/>
        }
    ];

    const ListItem=[
        {label:'Manual Entry'},
        {label:'AI Generator'},
        {label:'AI Generator With Sample'},
    ];

    const defaultValue = ListItem.find(item => item.label === "Manual Entry");

    const handleOptionChange=(event,value)=>{
        setQuestionType(value.label);
        console.log(value.label);
    }

  return (
    <div className='pl-3 dark:bg-slate-800' style={{ width: isCollapsedSuper ? `calc(100% - 80px)` : `calc(100% - 200px)`, marginLeft: isCollapsedSuper ? '80px' : '200px', height:'92.8vh'}}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={ListItem}
                sx={{ width: 300 ,
                    '& .MuiOutlinedInput-root': {
                        color: `${ThemeMode==='light'?'gray':'white'}`,
                        '& fieldset': {
                            borderColor: `${ThemeMode==='light'?'gray':'white'}`,
                        },
                        '&:hover fieldset': {
                            borderColor: `${ThemeMode==='light'?'gray':'white'}`,
                        },
                        
                    },
                    '& .MuiInputLabel-root': {
                        color:`${ThemeMode==='light'?'gray':'white'}`,
                    },
                    '& .MuiAutocomplete-popupIndicator': {
                        color: `${ThemeMode==='light'?'gray':'white'}`
                    },
                }}
                onChange={handleOptionChange}
                renderInput={(params) => <TextField {...params} label="Select Type" />}
                size='small'
                style={{width:'200px'}}
                className='pt-2'
                defaultValue={defaultValue}

            />
            <Tabs
                defaultActiveKey='1'
                items={items}
                size='small'
                tabPosition='top'
                sx={{
                    
                    '& .ant-tabs-tab-btn' :{
                        color: 'white !important',
                        },
                    '& .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn':{
                        color: 'white !important',
                    }
                }}
                style={{
                    color: ThemeMode === 'light' ? 'black' : 'white',
                }}
               
            />
        </div>
  )
}

export default AllQuestions
