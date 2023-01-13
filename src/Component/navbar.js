import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { Avatar, IconButton } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const Navbar = ({funcsetmobile}) => {
 
 
  const settings = ['Profile', 'Logout'];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
 
 
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <div className='appbar'>
        <AppBar position='fixed'>
            <Toolbar className="navbarstyle"> 
               <div className="title">Dashboard</div>
            
            <IconButton 
                onClick={funcsetmobile} className="iconstyle">
                <MenuIcon/>
              </IconButton>
              <div >
              </div>
              <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} >
                <Avatar alt="Remy Sharp"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
          
                    <MenuItem  >
                Logout
              </MenuItem>
            </Menu>
          </Box>
            </Toolbar> 
        </AppBar>



       

    </div>
  )
}

export default Navbar