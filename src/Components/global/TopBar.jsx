import React, { useEffect } from 'react'
import Logo from './assets/solver-logo.png'
import {Box,IconButton,InputBase} from '@mui/material'
import { useState } from 'react';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchBar from './SearchBar';
import {useNavigate} from 'react-router-dom'

const TopBar = ({RouteList}) => {
  const nav=useNavigate();
  const [userCredent,setUserCredent]=useState();
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelectedSuper = (event,value) => {
    console.log(value);
    const val=value.toLowerCase();
    let UserType='';
    console.log(userCredent.userType)
    if(userCredent.userType=='Admin'){
      UserType='admin';
    } else if(userCredent.userType=='Super Admin'){
      UserType='super-admin';
    } else{
      UserType='fresher';
    }
    console.log(UserType);
    nav(`/${UserType}/home/${val}`);
  };

  useEffect(()=>{
    const storedObject = localStorage.getItem('userCredent');
    if (storedObject) {
      const parsedObj = JSON.parse(storedObject);
      setUserCredent(parsedObj);
    }
  },[])

  return (
    <nav className="navbar sticky-top bg-white">
    <div className="container-fluid">
        <img src={Logo} alt="Logo" width="180" height='auto' class="d-inline-block"/>
        <div className='d-inline-flex'>
        <Box >
            {/* <InputBase placeholder='Search' className='ps-2' style={{minWidth:'0px'}}/>
            <IconButton type="Submit" >
                <SearchIcon />
            </IconButton> */}
            <SearchBar
              handleOptionSelectedSuper={handleOptionSelectedSuper}
              selectedOption={selectedOption}
              RouteList={RouteList}
            />
        </Box>
        <Box>
            <IconButton>
              <DarkModeOutlinedIcon/>
            </IconButton>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
        </Box>
        </div>
    </div>
    </nav>
  )
}

export default TopBar
