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
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import {toggleTheme} from '../../Store/Slices/ThemeSlice'

const TopBar = ({RouteList}) => {
  
  const ThemeMode=useSelector(store=>store.Theme.mode);
  const dispatch=useDispatch();

  const nav=useNavigate();
  const [userCredent,setUserCredent]=useState();
  const [selectedOption, setSelectedOption] = useState('');

  const handleThemeToggle=()=>{
    dispatch(toggleTheme());
    console.log(ThemeMode);
  }

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
    <nav className="bg-white sticky top-0 z-10 dark:bg-slate-800 dark:text-white">
      <div className="px-4 py-2 flex justify-between items-center">
        <img src={Logo} alt="Logo" className="w-40" />

        <div className="flex items-center ">
          <SearchBar
            handleOptionSelectedSuper={handleOptionSelectedSuper}
            selectedOption={selectedOption}
            RouteList={RouteList}
            
          />

          <IconButton onClick={handleThemeToggle}className='text-black dark:text-white'>
            {ThemeMode==='dark'?<LightModeOutlinedIcon />:<DarkModeOutlinedIcon />}
          </IconButton>

          <IconButton className='text-black dark:text-white'>
            <NotificationsOutlinedIcon />
          </IconButton>

          <IconButton className='text-black dark:text-white'  >
            <PersonOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </nav>
  )
}

export default TopBar
