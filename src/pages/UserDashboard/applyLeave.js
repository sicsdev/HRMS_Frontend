import React, { useEffect, useState } from "react";
import Header from "../../utils/header";
import axios from "axios";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;

const drawerWidth = 240;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function ApplyLeave() {

    const [leavevalue, setLeaveValue] = useState([]);

    const [submitval, setSubmitVal] = useState({
        leave: "",
        reason: "",
        from_date: "",
        to_date: ""
       
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    };


    const values = (e) => {

        setSubmitVal({ ...submitval, [e.target.name]: e.target.value });

    }


    useEffect(() => {
        
        axios.get(`http://localhost:8000/all_leave`)
            .then((res) => {
                console.log(res.data,"check1")
                setLeaveValue(res.data)
                


            })
            .catch((err) => {
                console.log(err);
            });
    }, [])


    const add = () => {


        
        const {  reason, from_date,to_date,leave } = submitval;

        if(!reason || !from_date || !leave || !to_date ){
            toast.error("All fields are required")   
            return
          }
      
        // const leaves = personName;

        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
            },
        };
        // let leaveData=[]
        // for(let x of leavevalue){
        //     let index=leaves.indexOf(x.name)
        //     if(index>-1){
        //         leaveData.push({
        //             id:x._id,
        //             name:x.name
        //         })
        //     }
        // }
        // console.log(leaveData,"add")



        // let data = { ...submitval,leaves:leaveData }


        axios
            .post(`http://localhost:8000/apply_leave`, submitval, token)
            .then((res) => {
                console.log(res.data);


            })
            .catch((err) => {
                console.log(err);

            });

            
            setSubmitVal({reason: '', date: ''})
    }
   

    return (
        <>
           
                <Header />
                <ToastContainer></ToastContainer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(95% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Typography paragraph>

                        <h3 className="applyleave text-center mt-3">Applying For Leave </h3>

                        <form onSubmit={handleSubmit} >
                            <div className="col-sm-4 mx-auto ">
                                <div className="form-group" align="left">
                                    <label>Type Of Leave</label>
                                    

                                    {/* <Select
                                        Heigh
                                        labelId="demo-multiple-checkbox-label" //append the values with key, value pair
                                        id="demo-multiple-checkbox"
                                        multiple
                                        name="leaveId"
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Type Of Leave" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        className="form-control leave_type"
                                    >
                                        {leavevalue.map((element, index) => (

                                            <MenuItem key={index} value={element.name}>
                                                <Checkbox checked={personName.indexOf(element.name) > -1} />
                                                <ListItemText primary={element.name} />
                                            </MenuItem>
                                        ))}
                                    </Select> */}
                                    <select id="dino-select"  className="form-control" name="leave"    onChange={values} required>
                                        <option>Select Leave</option>
                                        <optgroup label="Half Day">

                                            {
                                                leavevalue.map((item) => {
                                                  
                                                        if (item.category == 'half day'){
                                                                return (
                                                                    <option value={item._id}>{item.name}</option>
                                                                )
                                                            }
                                                })
                                            }
                                        </optgroup>

                                        <optgroup label="Full Day">

                                                {
                                                    leavevalue.map((item) => {
                                                            if (item.category == 'full day'){
                                                                    return (
                                                                        <option value={item._id}>{item.name}</option>
                                                                    )
                                                                }
                                                    })
                                                }
                                        </optgroup>
                                    </select>
                                </div>
                                <div className="form-group" align="left">
                                    <label>From Date</label>
                                    <input
                                        type="date"
                                        className="form-control formtext date"

                                       
                                        name="from_date"
                                        onChange={values}
                                        value={submitval.from_date} 
                                        required
                                        
                                    />
                                </div>
                                <div className="form-group" align="left">
                                    <label>To Date</label>
                                    <input
                                        type="date"
                                        className="form-control formtext date"

                                       
                                        name="to_date"
                                        onChange={values}
                                        value={submitval.to_date}
                                        required
                                        
                                    />
                                </div>

                               

                                <div className="form-group " align="left">
                                    <label>Reason</label>
                                    <textarea className="form-control" name="reason" onChange={values} value={submitval.reason} required></textarea>
                                </div>

                                <div className="submit-btn mt-2" align="right">
                                    <input
                                        type="submit"
                                        name="submit"
                                        className="btn btn-danger"
                                        value="Apply Leave"
                                        onClick={add}
                                        
                                    />
                                </div>
                            </div>
                        </form>
            </Typography>
    
         </Box>
        </>
    );



}

export default ApplyLeave;