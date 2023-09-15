import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"
import { Link } from 'react-router-dom';
import "../Login/styles.css"
import { useNavigate } from 'react-router-dom';
let eText="Make sure username, password aren't empty, and your email has '@gmail.com'. Action!"
export default function Register() {
  let register="false"
  const [username,setUsername]=useState("")
  const [mail,setMail]=useState("")
  const [password,setPassword]=useState("")
  const [errorText,seterrorText]=useState(false)
  let navigate=useNavigate()
  const myHeaders={
    "client_id": "0206f61000c84dd7a8a1fff87a6362c7",
    "client_secret": "064D86f632754cc1Be586EC4851a56FF"
  }
  const submitButton=()=>{
    console.log(username,password,mail)
    
    if (username.length !== 0 && password.length !== 0 && mail.includes("@gmail.com")){
        seterrorText(false)
      // POST request for New User Registration
      axios.post("http://ticket-movie-booking.us-e2.cloudhub.io/register", {
        username: username,
        password: password,
        mail: mail
      },{
        headers: myHeaders
      })
          .then((response) => {
            if(response.data === "User Exists , Try Logging in"){
              seterrorText(true)
            }
            else{
              console.log("Registration response:", response.data);
              navigate("/login")
            }
          })
          .catch((error) => {
            seterrorText(true)
              console.error("Registration Error:", error.message);
          });
        }
    else{
        seterrorText(true)
    }
  }
 
  const usernameChange=(e)=>{
    setUsername(e.target.value)
  }
  const passwordChange=(e)=>{
    setPassword(e.target.value)
  }
  const mailChange=(e)=>{
    setMail(e.target.value)
  }
  const onFormSubmit=(e)=>{
    e.preventDefault()
  }
  return (
    <div className='login-container'>
            <form onSubmit={onFormSubmit} className='form-container'>
              <h2>Register to Show Hub</h2>
              <div className='input-container'>
              <FontAwesomeIcon className='icon' icon={faUser} />
            <input onChange={usernameChange} value={username}  type="text" placeholder='Username' /> <br/>
              </div>
              <div className='input-container'>
            <FontAwesomeIcon className='icon' icon={faEnvelope} />
            <input onChange={mailChange} value={mail} type='email' placeholder='Enter Email'/> <br/>
            </div>
            <div className='input-container'>
            <FontAwesomeIcon className='icon' icon={faLock} />
            <input onChange={passwordChange} value={password} type='password' placeholder='Password'/> <br/>
            </div>
            {
                errorText && (<div style={{display: "flex",flexDirection:"column",justifyContent:"center",color:"wheat"}}>
                <p>{eText.slice(0,40)}</p>
                <span>{eText.slice(41,)}</span>
                </div>
                )
            }
           <div className='button'>
           <button onClick={submitButton}>Register</button>
            </div> 
            <p style={{color: "white",fontWeight: "500"}}>
          Already have an account? <Link style={{color:"greenyellow"}} to="/login">Login</Link>
        </p>
            </form>
    </div>
  )
}
