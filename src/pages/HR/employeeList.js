import React, { useEffect, useState } from "react";
import Header from "../utils/header";
import { useNavigate } from "react-router-dom";
import EmployeeLists from "../../components/employeeList";
import axios from "axios";
import { BASE_URL } from "../../baseUrl";
function EmployeeList() {

  const navigate = useNavigate();
  const [role, setRole] = useState('')
  const [show, setShow] = useState(false)


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
          if (res.data.role == 2 || res.data.role == 1) {
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
        <div>
          <Header />
          <EmployeeLists />
        </div>
        : ''
      }

    </>
  )
}
export default EmployeeList;