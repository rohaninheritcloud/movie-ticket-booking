import React from 'react'
import { Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Screen2() {
  return (
    <div className='containerr'>

    <div> <img src="https://static.toiimg.com/thumb/msid-102081347,width-1070,height-580,imgsize-66838,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg
    
    " alt='leo_jpg' height={300}/>
        </div>
        <div className='shows'>
          <Link to="/screen2/book">
          <button>8:00 AM</button>
          </Link>
        </div>
        </div>
        
  )
}
