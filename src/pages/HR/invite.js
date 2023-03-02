import React, { useEffect, useState } from "react";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import Header from "../utils/header";
import CheckIcon from '@mui/icons-material/Check'; 


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;

const drawerWidth = 320;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



function Invite() {

    const navigate = useNavigate();
    const [request, setRequest] = useState([]);
 
    const [role, setRole] = useState('')
    const [show, setShow] = useState(false)
    


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
          if(res.data.role == 2 || res.data.role == 1){
              setShow(true)
          }
          else{
            navigate('/dashboard')
          }
        })
        .catch((err) => {
            console.log(err);
            
          });
        };
          
    }, [])

    useEffect(() => {

        axios.get(`http://localhost:8000/all_add_employee`)
        .then((res) => {
            setRequest(res.data)
            console.log(res.data, "checkresposne")
          
          
        })     
        .catch((err) => {
            console.log(err);
                   
        });

        
      

    }, [])

    const invite = (e,id) => {
        e.preventDefault();
        console.log(id, "checkid")
        axios.post(`http://localhost:8000/invite`, {_id: id})
        .then((res) => {
          
            toast.success('Invite Sent Successfully')
         

            console.log(res.data,"check1")
         
        })     
        .catch((err) => {
            console.log(err);
                   
        });

    }

   

 
    return (
        <>
          {show?
            <>
          <Header/>
          <ToastContainer></ToastContainer>
         
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(95% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Typography paragraph>
                        
                        <h5 className="mt-4"><b> Employee Invite</b></h5>
                        <div className="leave">
                           
                                <div className="col-sm-8 mt-4">
                                    <table class="table ">
                                            <thead>
                                                <th>Emp Id</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                               
                                                <th>Action</th>
                                            </thead>
                                    <tbody>
                                        {
                                            request.map((element, i) => {
                                                return (
                                                    <>
                                                    <tr  key={i}>
                                                    <td>{element.name}</td>
                                                    <td>{element.emp_id}</td>
                                                    <td>{element.email}</td>
                                                    <td>{element.invite_status === "true" ?  "sent"
                                                    :
                                                    <button className="btn btn-primary mt-1 invite_button" onClick={(e) => {invite(e,element._id)}}>Invite Link</button>
                                                      }
                                                      </td>
                                                    </tr>
                                                    </>
                                                )
                                            })
                                        }                       
                                        </tbody>
                                    </table>
                                    </div>
                            </div>
                        
                    </Typography>
                </Box>
        </>
        : ""
         }
        </>
        
    )
}
export default Invite;