
import React from 'react'
import { Button, Comment, Form } from 'semantic-ui-react'
import Header from "../utils/header";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const drawerWidth = 320;
function Comments() {


  return (

  
  <>
      <Header/>
      <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(95% - ${drawerWidth}px)` } }}
                    >
                        <Toolbar />
                        <Typography paragraph>
    
                          <div className='col-sm-6 mx-auto mt-5'>
                            <textarea className='form-control'></textarea>
                            <button className='btn btn-primary mt-3'>Add Comment</button>
                          </div>
                          </Typography>
      </Box>

 
  </>
   );



  }

export default Comments
