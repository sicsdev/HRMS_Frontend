import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../utils/header";
import { BASE_URL } from "../../baseUrl";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 340;
const AddUser = () => {

  const navigate = useNavigate();
  const [role, setRole] = useState('')
  const [show, setShow] = useState(false)
  const [newuser, setNewUser] = useState({
    name: "",
    password: "",
    email: "",
    dob: "",
    phonenumber: "",
    date_of_joining: "",
    emp_id: "",
    designation: ""

  },
  )



  const handlesubmit = async (e) => {

    e.preventDefault();
  };


  const values = (e) => {

    setNewUser({ ...newuser, [e.target.name]: e.target.value });

  }


  useEffect(() => {

    let authtokens = localStorage.getItem("authtoken");
    let token = {
      headers: {
        token: authtokens,
        "Content-Type": "application/json",
      },
    };

    if (!authtokens) {
      navigate('/login')
    }
  }, [])


  const add = () => {

    const { name, email, password, dob, phonenumber, date_of_joining, emp_id, designation } = newuser;

    axios
      .post(`${BASE_URL}/add_user`, newuser)
      .then((res) => {
        console.log(res.data);
        setNewUser(res.data)
        navigate('/invite')
        // localStorage.setItem('authtoken', res.data.authtoken);


      })
      .catch((err) => {
        console.log(err);

      });
    setNewUser({ name: "", email: "", password: "", emp_id: "", phonenumber: "", dob: "", date_of_joining: "", designation: "" })
  }


  useEffect(() => {

    let authtokens = localStorage.getItem("authtoken");
    if (!authtokens) {
      navigate('/login')
    }
    else {
      let display = {
        headers: {
          'token': authtokens,
        }
      }


      axios.get(`${BASE_URL}/all`, display)
        .then((res) => {

          setRole(res.data.role)
          if (res.data.role == 2) {
            setShow(true)
          }
          else {
            navigate('/login')
          }
        })
        .catch((err) => {
          console.log(err);

        });
    };

  }, [])


  return (
    <>
      {show ?
        <>
          <Header />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(95% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <Typography paragraph>

              <div className="col-sm-6 mx-auto mt-4">
                <div className="card">
                  <div className="card-header">
                    <h4 className="text-center pt-2">Add New Employee </h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handlesubmit}>
                      <div className="form-login-wrapper">
                        <div className="form-group" align="left">
                          <label>Name*</label>
                          <input
                            type="text"
                            className="form-control formtext email"
                            onChange={values}
                            value={newuser.name}
                            placeholder="Name"
                            name="name"


                            required
                          />
                        </div>
                        <div className="form-group" align="left">
                          <label>Email*</label>
                          <input
                            type="email"
                            className="form-control formtext email"
                            onChange={values}
                            value={newuser.email}
                            placeholder="Email"
                            name="email"
                            id="Email"

                            required
                          />
                        </div>

                        <div className="form-group " align="left">
                          <label>Password*</label>
                          <input
                            type="text"
                            className="form-control formtext password"

                            placeholder="Password"
                            name="password"
                            id="Password"
                            onChange={values}
                            value={newuser.password}
                            required
                          />
                        </div>
                        <div className="form-group" align="left">
                          <label>Date Of Birth*</label>
                          <input
                            type="date"
                            className="form-control formtext email"
                            onChange={values}
                            value={newuser.dob}
                            placeholder="Date Of Birth"
                            name="dob"
                            id="DOB"

                            required
                          />
                        </div>
                        <div className="form-group" align="left">
                          <label>Phone number*</label>
                          <input
                            type="number"
                            className="form-control "
                            onChange={values}
                            value={newuser.phonenumber}
                            placeholder="Phonenumber"
                            name="phonenumber"
                            id="Phonenumber"

                            required
                          />
                        </div>
                        <div className="form-group" align="left">
                          <label>Employee Id*</label>
                          <input
                            type="text"
                            className="form-control "

                            placeholder="Employee Id"
                            name="emp_id"
                            onChange={values}
                            value={newuser.emp_id}

                            required
                          />
                        </div>
                        <div className="form-group" align="left">
                          <label>Date Of Joining*</label>
                          <input
                            type="date"
                            className="form-control "

                            placeholder="Phonenumber"
                            name="date_of_joining"

                            onChange={values}
                            value={newuser.date_of_joining}
                            required
                          />
                        </div>
                        <div className="form-group" align="left">
                          <label>Designation*</label>
                          <select class="form-select" aria-label="Default select example" name="designation" onChange={values}
                            value={newuser.designation}>
                            <option selected>Select Designation</option>
                            <option value="Full Stack Developer">Full Stack Developer</option>
                            <option value="Php Developer">Php Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="SEO">SEO</option>
                            <option value="BDE">BDE</option>
                            <option value="HR">HR</option>

                          </select>
                        </div>



                        <div className="submit-btn mt-2" align="right">
                          <input
                            type="submit"
                            name="submit"
                            value="Add"
                            className="btn btn-primary"
                            onClick={add}

                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Typography>

          </Box>

        </>
        : ""
      }
    </>

  );


};

export default AddUser;