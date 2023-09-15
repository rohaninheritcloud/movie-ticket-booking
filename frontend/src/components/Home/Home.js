import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./home.css"
export default function Home() {
  let navigate=useNavigate()

  const logout=()=>{
    if(localStorage.getItem("login")){
      localStorage.removeItem("login")
      navigate("/login")
    }
  }
  return (
    <div className='main'>

    <div className='container'>
      <div className='screen2'>
        <h1>SCREEN 1</h1>
        <img src="https://assets.gadgets360cdn.com/pricee/assets/product/202303/Leo_1678967552.jpg
" alt='picScreen1' className='img' width={270}/>
 <Link to="/screen1">
        <button>Go to Screen 1</button>
        </Link>
              </div>
              <div className='screen2'>
        <h1>SCREEN 2</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQebPad4dGYyzAmjhFnUqXE2btxpY5SotQjN6BkNP9yWPvHuMiWLktqorXwc0nu3Fy-mBk&usqp=CAU" className="img" alt="picScreen2" width={270}/>
        <Link to="/screen2">
        <button>Go to Screen 2</button>
        </Link>
      </div>
    </div>
    <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
