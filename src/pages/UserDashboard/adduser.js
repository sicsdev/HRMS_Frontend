import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import Header from "../utils/header";
const drawerWidth = 320;
const AddUser = () => {

   const navigate = useNavigate();
    const [newuser, setNewUser] = useState({
      name: "",
      first_login: "",
      email: "",
       dob: "",
       phonenumber: "",
       date_of_joining: "",
       emp_id: "",
       designation: ""

    },

    )
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
   
      let authtokens = localStorage.getItem("authtoken");
      let token = {
          headers: {
              token: authtokens,
          },
      };

      if(!authtokens){
          navigate('/login')
      }
    }, [])
    

    const handlesubmit = async (e) => {  
        e.preventDefault();
      };


      const values = (e) => {
   
        setNewUser({...newuser, [e.target.name]: e.target.value });
       
      }
   
      const add = () => {

        const { name, email, first_login,dob,phonenumber, date_of_joining,emp_id, designation } = newuser;

        console.log(first_login, "first_login")
      
        axios
        .post(`http://localhost:8000/add_user`, newuser)
        .then((res) => {
          console.log(res.data);
          setNewUser(res.data)
          navigate('/invite')
          // localStorage.setItem('authtoken',res.data.authtoken);
          
         
        })
        .catch((err) => {
          console.log(err);
     
        });
        setNewUser({name: "", email: "", first_login: "" , emp_id: "", phonenumber: "", dob: "", date_of_joining: "",designation: ""})
      }


  return (
    <>
   


<Header />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(95% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography paragraph>

          <div className=" layout add-UserLayout">
            <div className="container">
              <h2 className="add-user-heading"><b>Add Employee</b></h2>


              <div className="row justify-content-between custom-row">
                <div className="col-md-4">
                  <label className="addUserLabel">Employee Name</label><br/>
                  <input type="text" name="name"  value={newuser.name} onChange={values} className="form-control add_userInput" placeholder="Enter Employee Name" />
                </div>
                <div className="col-md-4">
                  <label className="addUserLabel">Email Id</label><br/>
                  <input   type="email" name="email"  value={newuser.email} onChange={values}  className=" form-control add_userInput" placeholder="Enter Email Id" />
                </div>
                <div className="col-md-4">
                  <label className="addUserLabel">Password</label><br/>
                  <input type="text" name="first_login" value={newuser.first_login} onChange={values}  className=" form-control add_userInput" placeholder="Enter Password" />
                </div>
              </div>
              <div className="row justify-content-between custom-row">
                <div className="col-md-4">
                  <label className="addUserLabel">Date Of Birth</label><br/>
                  <input className="form-control add_userInput"  value={newuser.dob} onChange={values} placeholder="Enter Date Of Birth" type="date" name="dob" />
                </div>
                <div className="col-md-4">
                  <label className="addUserLabel">Phone No</label><br/>
                  <input  type="number"   onChange={values}  value={newuser.phonenumber} name="phonenumber" className=" form-control add_userInput" placeholder="Enter Phone No" />
                </div>
                <div className="col-md-4">
                  <label className="addUserLabel">Employee ID</label><br/>
                  <input type="string" name="emp_id"  value={newuser.emp_id}  onChange={values} className=" form-control add_userInput" placeholder="Enter Employee ID" />
                </div>
              </div>
              <div className="row  custom-row">
                <div className="col-md-4">
                  <label className="addUserLabel">Date Of Joining</label><br/>
                  <input  type="date"  name="date_of_joining"  value={newuser.date_of_joining} onChange={values} className="form-control add_userInput" placeholder="Enter Date Of Joining" />
                </div>
                <div className="col-md-4">
                  <label className="addUserLabel">Designation</label><br/>
                  <select className="form-control add_userInput"  value={newuser.designation} onChange={values} name="designation">
                  
                        <option selected>Select Designation</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="Php Developer">Php Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="SEO">SEO</option>
                        <option value="BDE">BDE</option>
                        <option value="HR">HR</option>
                     
                    </select>
                </div>
              </div>
              <input type="submit" className="add-employee-btn" value="Add Employee" onClick={add}/>
            </div>

          </div>
        </Typography>
      </Box >

  </>
    
  );
};

export default AddUser;