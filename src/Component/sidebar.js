import { Hidden } from '@material-ui/core';
import { Drawer } from '@mui/material';
import Sidebardata from './sidebardata';
import React from 'react';


const Sidebar = ({isMobile, funcsetmobile, heading}) => {
  

  return (
    <div className='sidebar'>
        <Hidden xsDown implementation='Sidebardata'> 
        <Drawer variant='permanent' open anchor='left' className='drawerPaper' >
            <Sidebardata />

        </Drawer>
        </Hidden> 

        <Drawer variant='temporary' open ={isMobile} anchor='left' className='drawerPaper' onClick={funcsetmobile} >
           <Sidebardata  />

        </Drawer>


      
    </div>
  )
}

export default Sidebar