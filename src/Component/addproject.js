

import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link, useNavigate} from 'react-router-dom';

const drawerWidth = 320;
const AddProject = () => {
  const navigate=useNavigate()


  const [openaddteam, setOpenAddTeam] = useState(false)
  const [openHandleOk, setOpenHandleOk] = useState('')
  const [openCancel, setOpenCancel] = useState('')
  const [addproject, setAddProject] = useState({
    project_name: "",
    department: "",
    status: "",
    client_name: "",
    launch_date: ""
  })

  const [teamname, setTeamName] = useState('')
  const [teamleader, setTeamLeader] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const showAddTeam = () => {
    setOpenAddTeam(true)
  }
  const showCancel = () => {
    setOpenAddTeam(false);
  };
  const showHandleOk = () => {

  }

  const [selectedOptions, setSelectedOptions] = useState();
  const [employee, setEmployee] = useState([])


  function handleSelect(data) {
    // for(let x of data){
    //   console.log(x.value, "x.value")
    //   setSelectedOptions(x.value);
    // }
    setSelectedOptions(data)

  }


  useEffect(() => {

    axios.get(`http://localhost:8000/all_employee`)
      .then((res) => {
        setEmployee(res.data)
        console.log(res.data, "alllrecords")

      })
      .catch((err) => {
        console.log(err);
      });
  }, [])


  const handlesubmit = async (e) => {  
    e.preventDefault();
  };

  const values = (e) => {
   
    setAddProject({...addproject, [e.target.name]: e.target.value });
   
  }

  const setValue = (e) => {
   
    setTeamName({...teamname, [e.target.name]: e.target.value });
   
  }

  const add_project = () => {

      const {project_name, department, status, client_name, launch_date } = addproject;


      console.log(addproject)
     
      axios.post(`http://localhost:8000/add_project`, addproject)
            .then((res) => {

               console.log(res.data.data.code, "ttttttttttttttttttttttttttt")
              // navigate("/addteam",{prokec:res.data.data.project_name})
                navigate(`/project/${res.data.data.code}`);
             

            })
            .catch((err) => {
                console.log(err);
            });
            setAddProject({project_name: "", department: "", launch_date: "" , status: "", client_name: ""})
  }


  

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(95% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography paragraph className="add_project">
          <h4 className="pt-3"><b>New Project</b></h4>
          <input type="file" className="pt-4"
            placeholder="Upload Logo"
          ></input>



          <div className="layout mt-5">
            <form onSubmit={handleSubmit}>
              <div className="row mt-4">
              <div className="col-md-4">
                <label className="addUserLabel">Project Name</label><br />
                <input type="text" name="project_name"  value={addproject.project_name} onChange={values}className="form-control add_userInput" placeholder="Enter Project Name" />
              </div>
              <div className="col-md-4">
                <label className="addUserLabel">Department</label><br />
                <select className="form-control add_userInput" value={addproject.department} onChange={values} name="department">

                  <option selected>Select Department</option>
                  <option value="Development">Development</option>
                  <option value="Designing">Designing</option>
                  <option value="SEO">SEO</option>
                  <option value="BDE">BDE</option>
                  <option value="HR">HR</option>

                </select>
              </div>
              <div className="col-md-4">
                <label className="addUserLabel">Status</label><br />
                <select className="form-control add_userInput"  value={addproject.status} onChange={values} name="status">

                  <option selected>Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>


                </select>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4 mt-4">
                <label className="addUserLabel">Client Name</label><br />
                <input className="form-control add_userInput"  value={addproject.client_name} onChange={values} placeholder="Enter Client Name" type="text" name="client_name" />
              </div>
              <div className="col-md-4 mt-4">
                <label className="addUserLabel">Launch Date</label><br />
                <input type="date" name="launch_date" className=" form-control add_userInput"
                   value={addproject.launch_date} onChange={values} placeholder="Enter Launch Date" />
              </div>

            </div>
            <div className="submit-project">

              <input type="submit" className="add-project-btn" value="Add Project" onClick={add_project}/>
            </div>
          </form>
          </div>


        </Typography>
        {/* <Typography paragraph className="add_teams">
          <form onSubmit={handleSubmit}>
          <h5>Teams
            <button className="add_team_button" onClick={showAddTeam}>Add Team</button>
            <Modal
              open={openaddteam}
              title="add team"
              onOk={showHandleOk}
              onCancel={showCancel}
              footer={[

                <Button key="submit" type="primary" onClick={add_team} >
                  Add Team
                </Button>,

              ]}
            >
              <label className="mb-2">Team Name</label>
              <input type="text" className="form-control"onChange={setValue}  name="team_name" placeholder="Enter Team Name" />
              <label className="mt-2 pb-2">Member</label>

              <div className="app_team">

                <div className="dropdown-container ">
                  <Select
                    options={employee}
                    placeholder="Select Member"
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                  />
                </div>
              </div>

              <label className="mt-2 pb-2">Team Leader</label>
              <select className="form-control" name="team_leader_id" onChange={(e) => setTeamLeader(e.target.value)} value={teamleader}>
                <option>Select Team Leader</option>
                {
                  employee.map((element, index) => {
                    return (
                      <>

                        <option value={element.value}>{element.label}</option>
                      </>
                    )
                  })
                }

              </select>

            </Modal>
          </h5>
          <div className="row mt-5 add-team_border">
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6">
                  <h5><b>Development Team</b></h5>
                  <h6>3 Members</h6>
                  <h6>Edit Members</h6>
                </div>
                <div className="col-md-6">
                  <Avatar></Avatar>
                  <Avatar></Avatar>
                  <Avatar></Avatar>
                </div>
              </div>
            </div>
          </div>
          </form>
        </Typography> */}
      </Box>
    </>
  )
}
export default AddProject