import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const drawerWidth = 240;

interface Props {
 
  window?: () => Window;
}

export default function Header(props: Props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [login, setLogin] = React.useState('');
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [role, setRole] = useState('')
  const [show, setShow] = useState(false)
  const [profileval, setProfileVal] = useState('')

  useEffect(()=> {

    let authtokens = localStorage.getItem("authtoken");
    if(!authtokens){
        navigate('/login')
      }
      else{
      let display = {
        headers: {
            'token': authtokens, 
        }
      }
    

    axios.get(`http://localhost:8000/all`, display )
    .then((res) => {
      setRole(res.data.role)
     
    })
    .catch((err) => {
        console.log(err);
        
      });
    };
      
}, [])


useEffect(() => {


  let authtokens = localStorage.getItem("authtoken");
  let token = {
      headers: {
          token: authtokens,
      },
  };

  axios.get(`http://localhost:8000/profile`, token)
      .then((res) => {

          setProfileVal(res.data)
          setLogin(true)

      })
      .catch((err) => {
          console.log(err);
      });

}, [])


console.log(role, "dshjsbdka")

  const logout = () => {
    localStorage.removeItem('authtoken');
    setLogin(false);
    navigate('/login')
};


  const drawer = (
    <div>
      <Toolbar />
      <div className='logo'>
      <img src="logo.png" className='logo_img'></img></div>
      <Divider className='mt-4' />
  
        {role == 2 ?
            <List className='header_list'>
            {[<Link to="/dashboardpage">Dashboard</Link>,<Link to="/profile" className="header_toggle">Profile</Link>,  <Link to="/leaves">Leaves</Link>, <Link to="/leaverequest">Leave Request</Link>,  <Link to="/applyleave">Apply Leave</Link>, <Link to="/adduser">Add Employee</Link>, <Link to="/invite">Employee List</Link>].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
            : role == 1 ?  
        

            <List className='header_list'>
            {[<Link to="/dashboardpage">Dashboard</Link>,<Link to="/profile" className="header_toggle">Profile</Link>,   <Link to="/admin_leave_request">Leave Request</Link>, <Link to="/adduser">Add Employee</Link>, <Link to="/invite">Employee List</Link>].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

      :   
        <List className='header_list'>
          {[  <Link to="/dashboard">Dashboard</Link>, <Link to="/profile">Profile</Link>,  <Link to="/leaves">Leaves</Link>,  <Link to="/applyleave">Apply Leave</Link>].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      }

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className='header_menu'>
            
            <div className='row'>
                <div className='col-5 apply_logo'>
                   
                        
                        <img src="apply_Leave.svg" ></img>  &nbsp;    Apply Leave  &nbsp;
                </div>
                <div className='col-5'>
                    <div className='row header_setting'>
                                <div className='col-4'>
                                    <Avatar alt={profileval.name}   src={profileval.image}  sx={{ width: 50, height: 50 }} />
                                </div>
                                <div className='col-8 mt-2'>
                                
                                    <p>{profileval.name}</p>
                                
                                </div>
                                
                        </div>
                </div>
                <div className='col-2 mt-2'>
                        <Box sx={{ minWidth: 10 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select">
                                            <MenuItem value={10}>
                                                <Link className='header_dropdowm' to="/profile">Profile</Link></MenuItem>
                                            <MenuItem value={20} onClick={logout}>Logout</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                </div>
            </div>   
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    
    </Box>
  );
}