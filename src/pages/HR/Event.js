import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Events from "../../Component/event";
import Header from "../utils/header";
function Event() {
   
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
      if(res.data.role == 2){
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
                    <Header />
                    <Events/>
                </div>
            : ''
            }
           
        
         
      </>





  )
}
export default Event;