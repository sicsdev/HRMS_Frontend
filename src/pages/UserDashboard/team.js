import React from "react";
import Header from "../../utils/header";
import { Button, Checkbox, Form, Input } from 'antd';

function Team() {
    return (
        <>
            <div className="static_width layout">
                <label>Full Stack</label><br>
                </br>
                <label>Designer</label><br></br>
                <label>SEO</label><br></br>
                <label>BDE</label><br></br>
                <label>HR</label><br></br>
                <div className="container mt-4">

                    <div className="col-sm-6 mx-auto">
                        <div className="card">

                            <div className="card-body">
                                <form >
                                    <div className="form-login-wrapper">
                                        <div className="form-group" align="left">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                className="form-control formtext email"

                                                placeholder="Name"
                                                name="name"
                                                id="Name"

                                                required
                                            />
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Reporting Manager</label>
                                            <input
                                                type="text"
                                                className="form-control formtext email"

                                                placeholder="Reporting Manager"
                                                name="reporting manager"
                                                id="Reporting_Manager"

                                                required
                                            />
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Team Lead</label>
                                            <input
                                                type="text"
                                                className="form-control formtext email"

                                                placeholder="Team Lead"
                                                name="team lead"
                                                id="Team_Lead"

                                                required
                                            />
                                        </div>
                                        <div className="form-group" align="left">
                                            <label>Members</label>
                                            <input
                                                type="text"
                                                className="form-control formtext email"

                                                placeholder="Members"
                                                name="members"
                                                id="Members"

                                                required
                                            />
                                        </div>


                                        {/* <p>
                Already have an account ?<Link to = '/login'>Log in</Link></p> */}
                                        <div className="submit-btn mt-2" align="right">
                                            <input
                                                type="submit"
                                                name="submit"
                                                className="btn btn-danger"
                                                value="Submit"

                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );



}

export default Team;