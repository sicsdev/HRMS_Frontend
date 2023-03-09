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
import moment from "moment";

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
        width: "100%",
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const [leavevalue, setLeaveValue] = useState([]);
    const [pendingLeave, setPendingLeave] = useState({});

    const [submitval, setSubmitVal] = useState({
        leave: "",
        reason: "",
        from_date: "",
        to_date: "",
        leave_type: ''
    });



    const handleSubmit = async (e) => {
        e.preventDefault();
    };


    const values = (e) => {

        setSubmitVal({ ...submitval, [e.target.name]: e.target.value });

    }
    const handleChangeLeave = (e) => {
        console.log(e.target.value)
        if (e.target.value == 'Earned Leave') {
            let leaveData = pendingLeave?.leave
            console.log(leaveData)
            if (!leaveData?.earned_leave || leaveData?.earned_leave < 3) {
                toast.error("You should have minimum three earned leave")
                return
            }
        }
        let tmp = { ...submitval }
        tmp.leave = e.target.value
        setSubmitVal({ ...tmp })
    }
    const handleChangeLeaveType = (e) => {
        if (!submitval.leave) {
            toast.error("Please Select Leave First")
            return
        }
        let leave_type = e.target.value
        console.log(submitval.leave, leave_type)
        if (submitval.leave == 'Earned Leave' && leave_type == 'Half Day') {
            toast.error("You cannot avail Earned leave as Half Day")
            return
        }
        let tmp = { ...submitval }
        tmp.leave_type = e.target.value
        setSubmitVal({ ...tmp })

    }
    const handleChangeDateFrom = (e) => {
        if (!submitval.leave || !submitval.leave) {
            toast.error("Please Select Above Fields")
            return
        }
        let tmp = { ...submitval }
        tmp.from_date = e.target.value
        setSubmitVal({ ...tmp })
    }
    const handleChangeDateTo = (e) => {
        if (!submitval.leave || !submitval.leave || !submitval.from_date) {
            toast.error("Please Select Above Fields")
            return
        }
        var a = moment(e.target.value);
        var b = moment(submitval.from_date);
        let diff = a.diff(b, 'days') + 1

        if (diff != 3) {

            toast.error("You can apply Only Three Earned Leaves")
            return
        }
        let tmp = { ...submitval }
        tmp.to_date = e.target.value
        setSubmitVal({ ...tmp })
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
    const returnTwo = (value) => {
        if (parseInt(value) < 10 && parseInt(value) > 1) {
            return `0${value}`
        }
        return value
    }

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

        const { reason, from_date, to_date, leave, leave_type } = submitval;
        console.log(submitval)
        if (!reason || !from_date || !leave || !leave_type) {
            toast.error("All fields are required")
            return
        }
        if (leave_type == 'Full Day' && !to_date) {
            toast.error("Please Input To Date")
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
                setTimeout(() => {
                    navigate('/leaves')
                }, 3000)
            })
            .catch((err) => {
                toast.error(err.response?.data?.msg ?? "Something went wrong")
                console.log(err);

            }).finally(() => {
                setSubmitVal({ leave: "", reason: "", from_date: "", to_date: "" })
            })
    }


    return (
        <>
            <div>
                <Header />
                <ToastContainer></ToastContainer>

                {/* <Toolbar /> */}
                <div className="static_width layout apply-leaves-main-layout">
                    <div className="container ">
                        <h3 className="page-heading">Apply Leave</h3>

                        <div className="row avail-leaves-card-row">
                            <div className="col-md-4">
                                <div className=" avail-leaves-card">
                                    <div className="count earn-leave-count"> {returnTwo(pendingLeave?.leave?.earned_leave ? pendingLeave.leave?.earned_leave : 0)}</div>
                                    <div className="heading">Earned Leaves Available</div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className=" avail-leaves-card">
                                    <div className="count sick-leave-count"> {returnTwo(pendingLeave?.leave?.sick_leave >= 0 ? pendingLeave.leave?.sick_leave : 0)}</div>
                                    <div className="heading">Sick Leaves Available</div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className=" avail-leaves-card">
                                    <div className="count casual-leave-count">  {returnTwo(pendingLeave?.leave?.casual_leave >= 0 ? pendingLeave.leave?.casual_leave : 0)}</div>
                                    <div className="heading">Casual Leaves Available</div>
                                </div>
                            </div>


                        </div>
                        <div className="row">
                            <div className="col-lg-6" >
                                <div className="formMargin-10px ">
                                    <form onSubmit={handleSubmit} >

                                        <div className="form-group" align="left">
                                            <label>Leave</label>
                                            <select id="dino-select" className="add_userInput" name="leave" onChange={handleChangeLeave} value={submitval.leave} required>
                                                <option  >Select Leave</option>
                                                <option value="Casual Leave">Casual Leave</option>
                                                <option value="Sick Leave">Sick Leave</option>
                                                <option value="Earned Leave">Earned Leave</option>
                                            </select>
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Leave Type</label>
                                            <select id="dino-select" className="add_userInput" name="leave_type" onChange={handleChangeLeaveType} value={submitval.leave_type} required>
                                                <option value=''>Select Leave Type</option>
                                                <option value="Full Day">Full Day</option>
                                                <option value="Half Day">Half Day</option>
                                            </select>
                                        </div>

                                        <div className="form-group" align="left">
                                            <label>From Date</label>
                                            <input
                                                type="date"
                                                className="add_userInput formtext date"
                                                min={moment(new Date()).format('YYYY-MM-DD')}
                                                placeholder="From Date"
                                                name="from_date"
                                                onChange={handleChangeDateFrom}

                                                value={submitval.from_date}

                                            />
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>To Date</label>
                                            <input
                                                type="date"
                                                className={submitval.leave_type == 'Half Day' ? "add_userInput formtext date cursur-disabled" : 'add_userInput formtext date '}
                                                min={submitval.from_date ? moment(submitval.from_date).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD')}
                                                placeholder="To Date"
                                                name="to_date"
                                                onChange={handleChangeDateTo}
                                                disabled={submitval.leave_type == 'Half Day' ? true : false}

                                                value={submitval.to_date}

                                            />
                                        </div>


                                        <div className="form-group " align="left">
                                            <label>Reason</label>
                                            <textarea placeholder="Specify Reason" rows="4" className="add_userInput" name="reason" onChange={values} value={submitval.reason} />
                                        </div>

                                        <div className="submit-btn mt-2" align="right">
                                            <input
                                                type="submit"
                                                name="submit"
                                                className="apply-leave-btn"
                                                value="Apply Leave"
                                                onClick={add}
                                            />
                                        </div>


                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 ">
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