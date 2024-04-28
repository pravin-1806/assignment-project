import React from 'react'
import Header from "../global/Header.jsx"
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { colors } from '@mui/material'

const Login = () => {
    const [user,setUser]=useState('Fresher')
    const [enteredEmail,setEnteredEmail]=useState('')
    const [isEmailValid,setIsEmailValid]=useState(true)
    const [isNextClicked,setIsNextClicked]=useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [isPasswordEmpty,setIsPasswordEmpty]=useState(false)
    const [enteredPass,setEntredPass]=useState('')
    const [actualPass,setActualPass]=useState('')
    const navigate=useNavigate();

    const handleEmail=(event)=>{
        if(isValidEmail(enteredEmail)){
            event.preventDefault();
            const url = new URL('https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/users');

            fetch(url, {
                method: 'GET',
                headers: {'content-type':'application/json'}
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(data => {
                if (data) {
                    const foundUser = data.find(user => user.mailID === enteredEmail);
                    if (foundUser) {
                        setUser(foundUser.userType);
                        setActualPass(foundUser.password);

                        //Storing user credentail at local storage
                        localStorage.setItem('userCredent',JSON.stringify(foundUser));
                    } else {
                        setUser('Fresher');
                    }
                } else {
                    setUser('Fresher');
                }
            }).catch(error=>{
                console.log("error spoted on fetching data using mail"+error);
                setUser('Fresher')
            }).finally(() => {
                setIsNextClicked(true);
            });
        } else{
            alert('Enter valid Email')
        }

    }

    const handleEmailChange=(event)=>{
        const email=event.target.value;
        setEnteredEmail(email);
        setIsEmailValid(isValidEmail(enteredEmail));
    }
    
    const isValidEmail=(email)=> {
        const emailval = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailval.test(email);
    }

    const handlePasswordChange=(event)=>{
        setEntredPass(event.target.value)
        if(!enteredPass.length){
            setIsPasswordEmpty(true);
        } else{
            setIsPasswordEmpty(false);
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const handlePasswordChange=(event)=>setEntredPass(event.target.value);
    const handleLogin=()=>{
        if(enteredPass===actualPass && user==='Admin'){
            navigate('/admin/home')
        }else if(enteredPass===actualPass && user==='Super Admin'){
            navigate('/super-admin/home')
        } else if(enteredPass===''){
            alert('Please Enter the password')
        }else {
            alert('wrong password')
        }
    }

  return (
    <div className='SuperCont'>
        <div id="cont">
        <div className="cont1">
            <h1>Welcome to Solverminds</h1>
            <form className="form">
                <div className="scont">
                    <TextField className="txt-field inp" id="inp-email" error={!isEmailValid} label="Email" placeholder="eg. johnwick@gmail.com" variant="standard" onChange={handleEmailChange}/>
                </div>
                {isNextClicked===false?
                    <div className="loginBtn">
                        <button onClick={handleEmail}>Next</button>
                    </div>:''
                }
                {isNextClicked===true?
                <>
                    <div className="scont">
                        <TextField className="txt-field" label="User Type" placeholder="eg. johnwick@gmail.com" disabled variant="standard" value={user} />
                    </div>

                    {user==='Fresher'?
                    <>
                        <div className="scont">
                            <TextField className="txt-field" label="Aadhar Number" placeholder="eg. **** **** ****" variant="standard"/>
                        </div>
                        <div className="scont">
                            <TextField className="txt-field" label="Test Code" placeholder="eg. test123" variant="standard"/>
                        </div>
                    </>:""
                    }

                    {user==='Super Admin'||user==='Admin'?
                    <>
                        <div className="scont">
                            <FormControl sx={{ m: 1, width: '25ch' }} id="p1" variant="standard" className='p1'>
                            <InputLabel htmlFor="standard-adornment-password" >Password</InputLabel>
                                <Input onChange={handlePasswordChange}
                                className='password'
                                error={isPasswordEmpty}
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                      <InputAdornment position="end" className='p4'>
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                        //   onMouseDown={handleMouseDownPassword}
                                        >
                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                      </InputAdornment>
                                    }
                              />
                            </FormControl>
                        </div>
                    </>:""
                    }

                <div className="loginBtn">
                    <button type='submit' value="submit" onClick={handleLogin}>Login</button>
                </div>
                </>:''
                }
            </form>
        </div>
        </div>
    </div>
  )
}

export default Login