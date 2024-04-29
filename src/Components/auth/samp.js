import React from 'react'
import Header from "../global/header.jsx"
import "./login.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const [user,setUser]=useState('Fresher');
    const [enteredEmail,setEnteredEmail]=useState('');
    const [isNextClicked,setIsNextClicked]=useState(false);

    const handleEmail=(event)=>{
        event.preventDefault();
        const url = new URL('https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/users');

        fetch(url, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => {
            if (data) {
                const foundUser = data.find(user => user.mailID === enteredEmail);
                if (foundUser) {
                    setUser(foundUser.userType);
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
        }

  return (
    <div className='SuperCont'>
        <Header/>
        <div id="cont">
        <div className="cont1">
            <h1>Welcome to Solverminds</h1>
            <form className="form">
                <div className="scont f1">
                    <label for="email">E-mail :</label>
                    <input type="email" id="email" placeholder="eg. johnwick@gmail.com" onChange={event=>setEnteredEmail(event.target.value)}/>
                </div>
                {isNextClicked===false?
                    <div className="loginBtn">
                        <button onClick={handleEmail}>Next</button>
                    </div>:''
                }
                {isNextClicked===true?
                <>
                    <div className="scont f1">
                        <label for="userType">User Type :</label>
                        <input type="text" id="userType" value={user} disabled/>
                    </div>

                    {user==='Fresher'?
                    <>
                        <div className="scont f2">
                            <label for="aadhar">Aadhar Number :</label>
                            <input type="number" id="aadhar" placeholder="eg. **** **** ****"/>
                        </div>
                        <div className="scont f3">
                            <label for="testCode">Test Code :</label>
                            <input type="text" id="testCode" placeholder="eg. test123"/>
                        </div>
                    </>:""
                    }

                    {user==='Super Admin'||user==='Admin'?
                    <>
                        <div className="scont f2">
                            <label for="password">Password :</label>
                            <input type="password" id="password" placeholder="eg. ********"/>
                        </div>
                    </>:""
                    }

                <div className="loginBtn">
                    <Link to={'/home'}><button type='submit' value="submit">Login</button></Link>
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