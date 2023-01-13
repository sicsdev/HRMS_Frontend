import React, { useState, useEffect } from 'react';
import Navbar from '../Component/navbar';
import Sidebar from '../Component/sidebar';
const dashboardPage = () => {
 

  const [role, setRole] = useState('')
  const [show, setShow] = useState(false)

 

 
    
    const [isMobile, setIsMobile] = useState(false);
    const funcsetmobile = () => {
         setIsMobile(!isMobile);
    }
  return (
    <>
   
      <div className="rootstyle">
          <Sidebar isMobile={isMobile}  funcsetmobile ={funcsetmobile}/>
          <div className='side'>
            
          </div>
            <Navbar funcsetmobile ={funcsetmobile} />
      </div>
   
    </>
  )
}

export default dashboardPage