import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../utils/header";
import Dashboard from "../../Component/dashboard";
function Dashboards() {
    const navigate = useNavigate();
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
          {show?
              <div>
                  <Header/>
                  <Dashboard/>
              </div>
          : ''
          }
         
      </>





  )
}
export default Dashboards;