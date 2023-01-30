import React, { useEffect, useState } from "react";
import Header from "../../utils/header";
import axios from "axios";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;


const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function ApplyLeave() {


    const [personName, setPersonName] = React.useState([]);



    const [leavevalue, setLeaveValue] = useState([]);

    const [submitval, setSubmitVal] = useState({
        leaves: "",
        reason: "",
        date: "",
        type_of_day: ""
    });


    const handleChange = (e) => {
        const { target: { value } } = e;
        setPersonName(value);

    }



    const handleSubmit = async (e) => {
        e.preventDefault();
    };


    const values = (e) => {

        setSubmitVal({ ...submitval, [e.target.name]: e.target.value });

    }


    useEffect(() => {

        axios.get(`http://localhost:8000/all_leave`)
            .then((res) => {
                console.log(res.data, "check1")
                setLeaveValue(res.data)



            })
            .catch((err) => {
                console.log(err);
            });
    }, [])


    const add = () => {


        const { type_of_day, reason, date } = submitval;

        const leaves = personName;

        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
            },
        };
        let leaveData = []
        for (let x of leavevalue) {
            let index = leaves.indexOf(x.name)
            if (index > -1) {
                leaveData.push({
                    id: x._id,
                    name: x.name
                })
            }
        }
        console.log(leaveData, "add")



        let data = { ...submitval, leaves: leaveData }


        axios
            .post(`http://localhost:8000/apply_leave`, data, token)
            .then((res) => {
                console.log(res.data);


            })
            .catch((err) => {
                console.log(err);

            });

        setPersonName(['']);
        setSubmitVal({ type_of_day: '', reason: '', date: '' })
    }


    return (
        <>
            <div>
                <Header />
            </div>
            <div className="applyleave_page">
                <h3 className="applyleave">Applying For Leave </h3>

                <form onSubmit={handleSubmit} >
                    <div className="col-sm-4 mx-auto ">
                        <div className="form-group" align="left">
                            <label>Type Of Leave</label>


                            <Select
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
                            </Select>
                        </div>
                        <div className="form-group" align="left">
                            <label>Day</label>
                            <input
                                type="date"
                                className="form-control formtext date"

                                placeholder="Date Of Birth"
                                name="date"
                                onChange={values}
                                value={submitval.date}

                            />
                        </div>

                        <div className="form-group" align="left">
                            <label>Select Day</label>
                            <select name="type_of_day" onChange={values} className="form-control" value={submitval.type_of_day}>
                                <option selected>Select Day</option>

                                <option value="full day" >Full Day</option>

                                <option value="half day" >Half Day</option>

                            </select>
                        </div>

                        <div className="form-group " align="left">
                            <label>Reason</label>
                            <textarea className="form-control" name="reason" onChange={values} value={submitval.reason}></textarea>
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
            </div>
        </>
    );



}

export default ApplyLeave;