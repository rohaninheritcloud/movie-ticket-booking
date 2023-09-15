import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './styles.css';
import { useNavigate, Link } from 'react-router-dom';

let eText = "Make sure username, password aren't empty, and your email has '@gmail.com'. Action!";

export default function Login() {
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(false);
  const navigate = useNavigate();
  const myHeaders={
    "client_id": "0206f61000c84dd7a8a1fff87a6362c7",
    "client_secret": "064D86f632754cc1Be586EC4851a56FF"
  }
  
  const submitButton = () => {
    console.log(username, password, mail);
    if (password.length !== 0 && mail.includes('@gmail.com')) {
      setErrorText(false);
      axios.post("http://ticket-movie-booking.us-e2.cloudhub.io/login", {
        password: password,
        mail: mail
      },{
        headers: myHeaders
      })
          .then((response) => {
            if(response.data==="Invalid Credentials, Try Again"){
              setErrorText("Login Failed")
            }
            else{
              localStorage.setItem('login', true);
              navigate("/")
              console.log("Login response:", response.data);
            }
              
          })
          .catch((error) => {
              console.error("Login Error:", error.message);
          });
        }
  };

  useEffect(() => {
    let login = localStorage.getItem('login');
    if (login) {
      navigate('/');
    }
  }, [navigate]);

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const mailChange = (e) => {
    setMail(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-container">
      <form onSubmit={onFormSubmit} className="form-container">
        <h2>Login to Show Hub</h2>

        <div className="input-container">
          <FontAwesomeIcon className="icon" icon={faEnvelope} />
          <input onChange={mailChange} value={mail} type="email" placeholder="Enter Email" /> <br />
        </div>
        <div className="input-container">
          <FontAwesomeIcon className="icon" icon={faLock} />
          <input onChange={passwordChange} value={password} type="password" placeholder="Password" /> <br />
        </div>
        {errorText && (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'wheat' }}>
            <p>{eText.slice(0, 40)}</p>
            <span>{eText.slice(41)}</span>
          </div>
        )}
        <div className="button">
          <button onClick={submitButton}>Login</button>
        </div>
        <p style={{color: "white",fontWeight: "500"}}>
          Don't have an account? <Link style={{color:"greenyellow"}} to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
