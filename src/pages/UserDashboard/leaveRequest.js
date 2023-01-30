import React, { useEffect, useState } from "react";
import Header from "../../utils/header";
import { theme } from 'antd';
import Divider from '@mui/material/Divider';


function LeaveRequest() {


    return (
        <>
            <Header />

            <div className="container static_width requestpage">
                <div className="row ">
                    <h4 className="leave_requests">Leave Requests</h4>
                    <div className="col-sm-8">
                        <table className="table">
                            <thead>
                                <th>Emp Id</th>
                                <th>Name</th>
                                <th>Date From</th>
                                <th>Date To</th>

                                <th>Reason</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>kadhas</td>
                                    <td>kadhas</td>
                                    <td>kadhas</td>
                                    <td>kadhas</td>
                                    <td>kadhas</td>
                                    <td><button>dsfsd</button></td>
                                    <td><button>dsfsd</button></td>


                                </tr>
                            </tbody>

                        </table>

                        {/* <div className='col-sm-3 sick_leave'>
                            <p>Sick Leave Requests</p>

                        </div>

                        <div className="row">
                            <div className="col-md-2 text-start">
                                <label><b>Emp ID</b></label>
                                <p className="pt-3">   vvvvvvvvvv</p>


                            </div>

                            <div className="col-md-2 text-start">
                                <label><b>Name</b></label>
                                <p className="pt-3">   vvvvvvvvvv</p>

                            </div>
                            <div className="col-md-2 text-start">
                                <label><b>Date Form</b></label>
                                <p className="pt-3">   vvvvvvvvvv</p>

                            </div>
                            <div className="col-md-2 text-start">
                                <label><b>Date To</b></label>
                                <p className="pt-3">   vvvvvvvvvv</p>

                            </div>

                            <div className="col-md-2 text-start">
                                <label><b>Days</b></label>
                                <p className="pt-3">   vvvvvvvvvv</p>

                            </div>
                            <div className="col-md-2 text-start">
                                <label><b>Reason</b></label>
                                <p className="pt-3">   vvvvvvvvvv</p>

                            </div>
                            <div className="row">
                                <Divider className='event_divider1' />
                            </div>

                            <div className="row">
                                <div className="col-md-2 text-start">

                                    <p className="pt-3">   vvvvvvvvvv</p>

                                </div>
                                <div className="col-md-2 text-start">

                                    <p className="pt-3">   vvvvvvvvvv</p>

                                </div>
                                <div className="col-md-2 text-start">

                                    <p className="pt-3">   vvvvvvvvvv</p>

                                </div>
                                <div className="col-md-2 text-start">

                                    <p className="pt-3">   vvvvvvvvvv</p>

                                </div>
                                <div className="col-md-2 text-start">

                                    <p className="pt-3">   vvvvvvvvvv</p>

                                </div>
                                <div className="col-md-2 text-start">

                                    <p className="pt-3">   vvvvvvvvvv</p>

                                </div>


                            </div>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary">Approved</button>
                        </div> */}

                    </div>
                    <div className="col-sm-12 ">

                        {/* <div className='col-sm-3 casual_leave'>
                            <p>     Casual Leave Requests</p>
                        </div> */}

                        {/* <div className="row">

                            <div className="col-md-2 text-start">
                                <label><b>Emp ID</b></label>
                                <p className="pt-3">   vvvvvvvvvv</p>

                            </div>

                            <div className="col-md-2 text-start">
                                <label><b>Name</b></label>
                                <p className="pt-3">   vvvvvvvvvv</p>

                            </div>
                            <div className="col-md-2 text-start">
                                <label><b>Date From</b></label>
                                <p className="pt-3">   vvvvvvvvvv</p>

                            </div>
                            <div className="col-md-2 text-start">
                                <label><b>Date To</b></label>
                                <p className="pt-3">vvvvvvvvvv</p>

                            </div>

                            <div className="col-md-2 text-start">
                                <label><b>Days</b></label>
                                <p className="pt-3">   vvvvvvvvvv</p>

                            </div>
                            <div className="col-md-2 text-start">
                                <label><b>Reason</b></label>
                                <p className="pt-3">   vvvvvvvvvv</p>

                            </div>
                            <div className="row">
                                <Divider className='event_divider1' />
                            </div>

                            <div className="row">
                                <div className="col-md-2 text-start">

                                    <p className="pt-3">   vvvvvvvvvv</p>

                                </div>
                                <div className="col-md-2 text-start">

                                    <p className="pt-3">   vvvvvvvvvv</p>

                                </div>
                                <div className="col-md-2 text-start">

                                    <p className="pt-3">   vvvvvvvvvv</p>

                                </div>
                                <div className="col-md-2 text-start">

                                    <p className="pt-3">   vvvvvvvvvv</p>

                                </div>
                                <div className="col-md-2 text-start">

                                    <p className="pt-3">   vvvvvvvvvv</p>

                                </div>
                                <div className="col-md-2 text-start">

                                    <p className="pt-3">   vvvvvvvvvv</p>

                                </div>


                            </div>


                        </div> */}
                        {/* <div className="col-sm-2 text-start">
                            <button className="btn btn-primary">Approved</button>
                        </div> */}
                    </div>
                </div>
            </div>



        </>
    );
}
export default LeaveRequest;