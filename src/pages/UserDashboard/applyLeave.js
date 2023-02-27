import React, { useEffect, useState } from "react";
import Header from "../utils/header";
import axios from "axios";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Calendar, theme } from 'antd';
import { CalendarMode } from 'antd/es/calendar/generateCalendar'
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../baseUrl";
import { useNavigate } from "react-router-dom";

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


    const navigate = useNavigate();
    const { token } = theme.useToken();
    const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    };

    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };


    const [leavevalue, setLeaveValue] = useState([]);
    const [pendingLeave, setPendingLeave] = useState('');

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

        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,

            },
        };

        if (!authtokens) {
            navigate('/')
        }
        else {
            const config = {
                header: {
                    "Content-Type": "application/json",
                },
            };
            axios.get(`${BASE_URL}/all_leave`, config)
                .then((res) => {
                    setLeaveValue(res.data)



                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }, [])

    useEffect(() => {


        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
                "Content-Type": "application/json",
            },
        };
        if (!authtokens) {
            navigate('/')
        }
        else {

            axios.get(`${BASE_URL}/profile`, token)
                .then((res) => {
                    setPendingLeave(res.data)


                })
                .catch((err) => {
                    console.log(err);
                });
        }



    }, [])

    const calculatePaidOff = (sick_leave, casual_leave) => {

        let s_count = 0
        if (sick_leave < 0) {
            s_count += sick_leave
        }
        if (casual_leave < 0) {
            s_count += casual_leave
        }
        return Math.abs(s_count)
    }
    const add = () => {


        const { reason, from_date, to_date, leave } = submitval;

        if (!reason || !from_date || !leave || !to_date) {
            toast.error("All fields are required")
            return
        }


        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
                "Content-Type": "application/json",
            },
        };


        axios
            .post(`${BASE_URL}/apply_leave`, submitval, token)
            .then((res) => {
                toast.success("Leave Applied")

            })
            .catch((err) => {
                console.log(err);

            });
        setSubmitVal({ leave: "", reason: "", from_date: "", to_date: "" })
    }


    return (
        <>
            <div>
                <Header />
                <ToastContainer></ToastContainer>

                <Toolbar />
                <div className="static_width layout apply-leaves-main-layout">
                    <div className="container margin-top">
                        <div className="row avail-leaves-card-row">
                            <div className="col-md-4">
                                <div className=" avail-leaves-card">
                                    <div className="count">  {pendingLeave.leave?.casual_leave >= 0 ? pendingLeave.leave?.casual_leave : 0}</div>
                                    <div className="heading">Casual Leaves Available</div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className=" avail-leaves-card">
                                    <div className="count"> {pendingLeave.leave?.sick_leave >= 0 ? pendingLeave.leave?.sick_leave : 0}</div>
                                    <div className="heading">Sick Leaves Available</div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className=" avail-leaves-card">
                                    <div className="count"> 03</div>
                                    <div className="heading">Earned Leaves Available</div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-sm-6" >
                                <div className="formMargin-10px ">
                                    <form onSubmit={handleSubmit} >

                                        <div className="form-group" align="left">
                                            <label>Type Of Leave</label>
                                            <select id="dino-select" className="form-control" name="leave" onChange={values} value={submitval.leave} required>
                                                <option>Select Leave</option>
                                                <optgroup label="Half Day">

                                                    {
                                                        leavevalue.map((item) => {

                                                            if (item.category == 'half day') {
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
                                                            if (item.category == 'full day') {
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

                                                placeholder="From Date"
                                                name="from_date"
                                                onChange={values}
                                                value={submitval.from_date}

                                            />
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>To Date</label>
                                            <input
                                                type="date"
                                                className="form-control formtext date"

                                                placeholder="To Date"
                                                name="to_date"
                                                onChange={values}
                                                value={submitval.to_date}

                                            />
                                        </div>


                                        <div className="form-group " align="left">
                                            <label>Reason</label>
                                            <textarea className="form-control" name="reason" onChange={values} value={submitval.reason}></textarea>
                                        </div>

                                        <div className="submit-btn mt-2" align="right">
                                            <input
                                                type="submit"
                                                name="submit"
                                                className="btn btn-primary"
                                                value="Apply Leave"
                                                onClick={add}
                                            />
                                        </div>


                                    </form>
                                </div>
                            </div>
                            <div className="col-sm-6 ">
                                <div className="formMargin-10px float-right">
                                    <div style={wrapperStyle} className="mt-4" >

                                        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                                    </div>

                                </div>


                            </div>

                        </div >
                    </div>

                </div>

            </div>

        </>
    );



}

export default ApplyLeave;