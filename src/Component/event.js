import React, { useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 320;
const Events = () => {
    const [submitval, setSubmitVal] = useState({
        event_title: "",
        event_date: "",
        event_description: "",
        start_time: "",
        end_time: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    };


    const values = (e) => {

        setSubmitVal({ ...submitval, [e.target.name]: e.target.value });

    }

    const add = () => {

     
        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
            },
        };

        
        axios
            .post(`http://localhost:8000/add_event`, submitval, token)
            .then((res) => {
                console.log(res.data);


            })
            .catch((err) => {
                console.log(err);

            });

        
            setSubmitVal({event_title: '', event_date: '',event_description: '', start_time: '', end_time: ''})
    }

    return (
        <>
        <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(95% - ${drawerWidth}px)` } }}
            >
            <Toolbar />
            <Typography paragraph className="event_page">
                <h4 className="pt-3"><b>Add Event</b></h4>
                <form onSubmit={handleSubmit}>
                    <div className="row mt-4">
                        <div className="col-4">
                        <label className="py-3">Event Title</label>
                        <input type="text" name="event_title" value={submitval.event_title} className="form-control event_page_setting" placeholder="Enter Event Title" onChange={values} ></input>
                        </div>
                        <div className="col-4">
                            <label className="py-3">Event Date</label>
                            <input type="date" name="event_date" value={submitval.event_date} className="form-control event_page_setting " placeholder="Choose Date" onChange={values} ></input>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-8">
                            <label className="py-3">Event Description</label>
                            <textarea className="form-control event_page_setting" value={submitval.event_description} name="event_description" rows="8" placeholder="Enter Event Description" onChange={values} ></textarea>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-4">
                        <label className="py-3">Start Time</label>
                        <input type="text" name="start_time" value={submitval.start_time} className="form-control event_page_setting" placeholder="Enter Start Time" onChange={values} ></input>
                        </div>
                        <div className="col-4">
                            <label className="py-3">End Time</label>
                            <input type="text" name="end_time" value={submitval.end_time} className="form-control event_page_setting" placeholder="Enter End Time" onChange={values} ></input>
                        </div>
                    </div>
                    <div className="submit_btn mt-4">
                        <input type="submit" className="btn btn-primary event_submit_button" onClick={add} value="Add Event" name="submit"></input>
                    </div>
                </form>
            </Typography>
         </Box>

        </>
    )
}
export default Events
