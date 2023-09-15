import React from 'react'
import "./styl.css"
import { Link } from 'react-router-dom'
export default function Screen1() {
  return (
    <div className='containerr'>
<div> <img src="https://linksind.net/leo/featured.jpg

" alt='leo_jpg' height={300}/>
    </div>
    <div className='shows'>
        <Link to="/screen1/book">
        <button>4:00 AM</button>
        </Link>
    </div>
    </div>
    
  )
}
