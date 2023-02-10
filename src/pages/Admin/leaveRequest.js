import React, { useEffect, useState } from "react";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BASE_URL } from "../../baseUrl";
import Header from "../utils/header";
import { useNavigate } from "react-router-dom";


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
    const navigate = useNavigate();
    const [request, setRequest] = useState([]);
    const [value, setValue] = useState([]);

    useEffect(() => {


        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
            },
        };

        if (!authtokens) {
            navigate('/login')
        }
        else {
            axios.get(`${BASE_URL}/get_apply_leaves`)
                .then((res) => {
                    console.log(res.data, "check1")
                    setRequest(res.data)
                })
                .catch((err) => {
                    console.log(err);

                });

        }

    }, [])


    const list = (e, id, item, apply_leave_id) => {
        e.preventDefault();

        console.log(id, item, apply_leave_id, "gfjhsd");

        axios.post(`${BASE_URL}/update_leave/${id}`, { leave_type: item, apply_leave_id: apply_leave_id }

        )
            .then((res) => {
                console.log(res.data)
                toast.success("Leave Approved")

            })
            .catch((err) => {
                console.log(err);

            });

    }

    const cancel_request = (e, id, apply_leave_id) => {

        e.preventDefault();
        console.log(id, apply_leave_id, "gfjhsd");
        axios.put(`${BASE_URL}/cancel_leave/${id} `, { apply_leave_id: apply_leave_id }

        )
            .then((res) => {
                console.log(res.data)
                toast.error("Leave Rejected")

            })
            .catch((err) => {
                console.log(err);

            });
    }


    return (
        <>
            <Header />
            <ToastContainer></ToastContainer>
            {request ?
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(95 % - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Typography paragraph>

                        <h5 className="mt-4"><b>Leave Requests</b></h5>
                        <div className="leave request1">
                            <h6 className="sick_border"> Sick/Casual Leave Requests</h6>
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
                                    <tbody>

                                        {
                                            request.map((element) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{element.userId.emp_id}</td>
                                                            <td>{element.userId.name}</td>
                                                            <td>{element.leave.name}</td>
                                                            <td>{element.from_date}</td>
                                                            <td>{element.to_date}</td>
                                                            <td>{element.reason}</td>
                                                            {/* <td><button  onClick={() => {list()}}>Approved</button></td> */}
                                                            <td><button className="btn btn-primary" onClick={(e) => { list(e, element.userId.id, element.leave.name, element._id) }}>Approved</button></td>
                                                            <td><button className="btn btn-primary" onClick={(e) => { cancel_request(e, element.userId.id, element._id) }}>Deny</button></td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </Typography>
                </Box>
                : ''
            }
        </>
    )
}
export default LeaveRequest;