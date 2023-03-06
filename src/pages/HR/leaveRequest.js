import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BASE_URL } from "../../baseUrl";
import Header from "../utils/header";
import { useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { LoaderContext } from '../../App.js'


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



function LeaveRequest() {
    const { showLoader, hideLoader } = useContext(LoaderContext)
    const navigate = useNavigate();
    const [request, setRequest] = useState([]);
    const [value, setValue] = useState([]);


    const allLeaves = () => {
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
             showLoader()
            let authtokens = localStorage.getItem("authtoken");
            let token = {
                headers: {
                    token: authtokens,
                    "Content-Type": "application/json",

                },
            }


            axios.get(`${BASE_URL}/get_apply_leaves`, token)
                .then((res) => {
                    setRequest(res.data)
                })
                .catch((err) => {
                    console.log(err);

                }).finally(() => {

                    hideLoader()
                })

        }
    }
    useEffect(() => {

        showLoader()
        allLeaves()

    }, [])


    const list = (e, id, item, apply_leave_id) => {
        e.preventDefault();



        axios.post(`${BASE_URL}/update_leave/${id}`, { leave_type: item, apply_leave_id: apply_leave_id }

        )
            .then((res) => {

                toast.success("Leave Approved")
                allLeaves();
            })
            .catch((err) => {
                console.log(err);

            });

    }

    const cancel_request = (e, id, apply_leave_id) => {

        e.preventDefault();


        axios.put(`${BASE_URL}/cancel_leave/${id} `, { apply_leave_id: apply_leave_id }

        )
            .then((res) => {
                toast.success("Leave Rejected")
                allLeaves()

            })
            .catch((err) => {
                console.log(err);

            });
    }


    return (
        <>
            <Header />
            <ToastContainer></ToastContainer>

            <div className="static_width layout">
                <div className="container">
                    <h5 className="page-heading"><b>Leave Requests</b></h5>
                    <div className="leave request1">
                        <h6 className="sick-leave-title-border"> Sick/Casual Leave Requests</h6>
                        <div className="col-sm-8 mt-4">
                            <table class="table ">
                                <thead>
                                    <th>Emp Id</th>
                                    <th>Name</th>
                                    <th>Leave Type</th>

                                    <th>From Date</th>
                                    <th>To Date</th>

                                    <th>Reason</th>
                                </thead>
                                {request && request.length > 0 ?
                                    <tbody>

                                        {
                                            request.map((element) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{element.userId?.emp_id}</td>
                                                            <td>{element.userId?.name}</td>
                                                            <td>{element.leave?.name}</td>
                                                            <td>{element?.from_date}</td>
                                                            <td>{element?.to_date}</td>
                                                            <td>{element?.reason}</td>

                                                            {element.status == "approved" ? <td> <button className="approved-btn-disabled" disabled>Approved</button></td>
                                                                : element.status == "pending" ?
                                                                    <>
                                                                        <td>
                                                                            {/* <CheckIcon className="not_approve" onClick={(e) => { list(e, element.userId.id, element.leave.name, element._id) }} /> */}
                                                                            <button className="approved-btn" onClick={(e) => { list(e, element.userId.id, element.leave.name, element._id) }}>Approve</button>
                                                                        </td>
                                                                        <td>
                                                                            {/* <CloseIcon onClick={(e) => { cancel_request(e, element.userId.id, element._id) }} /> */}
                                                                            <button className="deny-btn" onClick={(e) => { cancel_request(e, element.userId.id, element._id) }} >Deny</button>
                                                                        </td>
                                                                    </>

                                                                    : <td><button className="deny-btn-disabled" disabled>Rejected</button></td>
                                                            }
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }


                                    </tbody>
                                    :
                                    <tr><td colspan="8"><h5 className="leave_no_found">No Record Found</h5></td></tr> 

                                }
                            </table>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}
export default LeaveRequest;