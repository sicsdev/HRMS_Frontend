import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {

  const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    })


    const handlesubmit = async (e) => {
        e.preventDefault();
      };


      const setdata = (e) => {
   
        setData({...data, [e.target.name]: e.target.value });
       
      }
   
      const add = () => {

        // const {email, password} = data

        
        axios
        .post(`http://localhost:8000/login`, data)
        .then((res) => {
          console.log(res.data);
          setData(res.data)
          localStorage.setItem("authtoken", res.data.authtoken);
          navigate('/dashboard')
         
        })
        .catch((err) => {
          console.log(err);
     
        });
        setData({email: "", password: "" })
      }
      
  return (
    <>
      <div className="container mt-4">
     
        <div className="col-sm-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center pt-5">Login </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handlesubmit}>
                <div className="form-login-wrapper">
                  <div className="form-group" align="left">
                    <label>Email*</label>
                    <input
                      type="email"
                      className="form-control formtext email"
                    
                      placeholder="Email"
                      name="email"
                      id="Email"
                      onChange={setdata}
                      value={data.email}
                    
                    />
                  </div>

                  <div className="form-group " align="left">
                    <label>Password*</label>
                    <input
                      type="password"
                      className="form-control formtext password"
                      placeholder="Password"
                      name="password"
                      value={data.password}
                      onChange={setdata}
                     
                    />
                  </div>

                  <div className="submit-btn mt-2" align="right">
                    <input
                      type="submit"
                      name="submit"
                      className="btn btn-danger"
                      value="Login" onClick={add}

                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;