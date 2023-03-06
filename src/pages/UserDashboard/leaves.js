import React, { useEffect, useState, useContext } from 'react';
import Header from '../utils/header';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import { Calendar, theme, Badge } from 'antd';

import { CalendarMode } from 'antd/es/calendar/generateCalendar'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BASE_URL } from '../../baseUrl';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoaderContext } from '../../App.js'
import moment from 'moment'
function Leaves() {
    const { showLoader, hideLoader } = useContext(LoaderContext)


    const navigate = useNavigate();
    const [leavevalue, setLeaveValue] = useState([]);

    const { token } = theme.useToken();

    const onPanelChange = (value, mode) => {
        console.log(value, mode)
    };

    const wrapperStyle = {
        width: "90%",
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    const getListData = (value) => {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    {
                        type: 'warning',
                        content: 'This is warning event.',
                    },
                ];
                break;
            case 10:
                listData = [
                    {
                        type: 'warning',
                        content: 'This is warning event.',
                    }
                ];
                break;
            case 15:
                listData = [
                    {
                        type: 'warning',
                        content: 'This is warning event',
                    },
                ];
                break;
            default:
        }
        return listData || [];
    };
    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    };

    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            // <ul className="events">
            <>
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge count={0} showZero color='#faad14' />
                    </li>
                ))}
            </>
            // </ul>
        );
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
            navigate('/')
        }
        else {
            showLoader()

            axios.get(`${BASE_URL}/single_user_apply_leave`, token)
                .then((res) => {
                    setLeaveValue(res.data)
                })
                .catch((err) => {
                    console.log(err);
                }).finally(() => {

                    hideLoader()
                })
        }

    }, [])



    return (
        <>
            <Header />
            <div className='static_width layout'>
                <div className='container'>
                    <div className='row mt-3'>
                        <div className='col-md-10'>
                            <h4 className='leave_quota'>Leave Quota</h4>

                        </div>

                        <div className='col-md-2'>
                            <Link to="/applyleave">
                                <button className='apply-leave-btn'>Apply Leaves</button>
                            </Link>
                        </div>

                    </div>
                    <div className='row mt-4'>
                        <div className='col-md-6'>
                            <div className="calender">
                                <h5 className='text-start'>Calendar</h5>
                                <div style={wrapperStyle} className="mt-4" >

                                    <Calendar
                                        // dateCellRender={dateCellRender}
                                        // monthCellRender={monthCellRender}
                                        fullscreen={false}
                                        onPanelChange={onPanelChange} />

                                </div>

                            </div>
                        </div>
                        <div className='col-md-6 mt-4'>
                            <div className='leave_request'>
                                <h5>Leave Requests</h5>
                                <table class="table mt-4">

                                    <tbody>
                                        {
                                            leavevalue?.length > 0 ?
                                                leavevalue.map((element, index) => {
                                                    return (
                                                        <>

                                                            <tr>
                                                                <td>  {element.leave}</td>
                                                                <td>  {moment(element.from_date).format('DD MMM YYYY')} - {moment(element.to_date).format('DD MMM YYYY')}</td>

                                                                <td style={{ fontWeight: 600 }} className={element.status == 'pending' ? 'pending-text' : element.status == 'approved' ? 'approved-text' : 'rejected-text'}>  {element.status}</td>
                                                            </tr>

                                                        </>
                                                    )
                                                })
                                                :
                                                <>
                                                    <tr><td colspan="8"><h5 className="leave_no_found">No Record Found</h5></td></tr>
                                                </>

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Leaves