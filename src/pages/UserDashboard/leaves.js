import React, { useEffect, useState } from 'react';
import Header from '../utils/header';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import { Calendar, theme } from 'antd';
import { CalendarMode } from 'antd/es/calendar/generateCalendar'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BASE_URL } from '../../baseUrl';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Leaves() {

    const navigate = useNavigate();
    const [leavevalue, setLeaveValue] = useState([]);

    const { token } = theme.useToken();

    const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };


    useEffect(() => {

        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
                "Content-Type": "application/json",

            },
        };

        if (!authtokens) {
            navigate('/login')
        }
        else {

            axios.get(`${BASE_URL}/single_user_apply_leave`, token)
                .then((res) => {
                    console.log(res.data, "check2")
                    setLeaveValue(res.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }, [])



    return (
        <>

            <Header />

            <Toolbar />
            <Typography paragraph>
                <div className='row mt-3'>
                    <div className='col-md-10'>
                        <h4 className='leave_quota'>Leave Quota</h4>

                    </div>

                    <div className='col-md-2'>
                        <Link to="/applyleave">
                            <button className='btn btn-primary'>Apply Leaves</button>
                        </Link>
                    </div>

                </div>
                <div className='row mt-4'>
                    <div className='col-sm-6'>
                        <div className="calender">
                            <h5 className='text-start'>Calendar</h5>
                            <div style={wrapperStyle} className="mt-4" >

                                <Calendar fullscreen={false} onPanelChange={onPanelChange} />

                            </div>

                        </div>
                    </div>
                    <div className='col-sm-6 mt-4'>

                        <h5>Leave Balance</h5>
                        <div className='leave_details mt-4'>
                            <div className='row'>
                                <div className='col-3'>

                                </div>
                                <div className='col-3 text-end'>
                                    <h6>Pending</h6>
                                </div>
                                <div className='col-3 text-end'>
                                    <h6>Availed</h6>
                                </div>
                            </div>
                            <div className='row pt-4'>
                                <div className='col-3 earned_leave'>
                                    Earned Leave
                                </div>
                                <div className='col-3 text-end'>
                                    <h6>2</h6>
                                </div>
                                <div className='col-3 text-end'>
                                    <h6>1</h6>
                                </div>
                            </div>
                            <div className='row pt-4'>
                                <div className='col-3 casual_leave'>
                                    Casual Leave
                                </div>
                                <div className='col-3 text-end'>
                                    <h6>2</h6>
                                </div>
                                <div className='col-3 text-end'>
                                    <h6>1</h6>
                                </div>
                            </div>
                            <div className='row pt-4'>
                                <div className='col-3 sick_leave'>
                                    Sick Leave
                                </div>
                                <div className='col-3 text-end'>
                                    <h6>2</h6>
                                </div>
                                <div className='col-3 text-end'>
                                    <h6>1</h6>
                                </div>
                            </div>



                        </div>
                        <div className='leave_request'>
                            <h5>Leave Requests</h5>
                            <table class="table mt-4">

                                <tbody>
                                    {
                                        leavevalue.map((element, index) => {
                                            return (
                                                <>

                                                    <tr>
                                                        <td>  {element.leave.name}</td>
                                                        <td>  {element.from_date} - {element.to_date}</td>

                                                        <td>  {element.status}</td>
                                                    </tr>

                                                </>
                                            )
                                        })

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </Typography>




        </>
    )
}
export default Leaves