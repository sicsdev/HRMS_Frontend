import React, { useEffect, useState } from "react";
import Header from "../../utils/header";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Dayjs } from 'dayjs';
import { Calendar, theme } from 'antd';
import { CalendarMode } from 'antd/es/calendar/generateCalendar'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import moment from "moment";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

function Profile() {

    const [profile, setProfile] = useState('');
    const [allleave, setAllLeave] = useState([]);
    const [diff, setDiff] = useState();
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
        axios.get(`http://localhost:8000/all_leave`)
            .then((res) => {
                console.log(res.data)
                setAllLeave(res.data)


            })
            .catch((err) => {
                console.log(err);
            });
    }, [])



    useEffect(() => {


        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
            },
        };

        axios.get(`http://localhost:8000/profile`, token)
            .then((res) => {
                console.log(res.data)
                setProfile(res.data)


            })
            .catch((err) => {
                console.log(err);
            });

    }, [])


    const monthDiff = (date_of_joining) => {

        const past_date = new Date();
        const current_date = new Date(date_of_joining);
        const difference = (past_date.getFullYear() * 12 + past_date.getMonth()) - (current_date.getFullYear() * 12 + current_date.getMonth());
        let months;
        // const months = (difference / 12 | 0) + " years and " + difference % 12 + " months"
        if (difference > 12) {
            months = (difference / 12 | 0) + " years and " + difference % 12 + " months"

        } else {
            months = difference % 12 + " months"
        }

        return months;
    }



    return (

        <>

            <div>
                <Header />
            </div>
            <div className="container static_width">
                <div className="row ">
                    <div className="col-sm-8">
                        <div className="row">
                            <div className="col-md-4">
                                <Avatar size={130} icon={<UserOutlined />} />
                                <p className="pt-4"><b>{profile.name}</b></p>
                                <p> {profile.emp_id}</p>
                                <button className="btn btn-primary">Edit Profile</button>
                            </div>

                            <div className="col-md-4 text-start">
                                <label><b>Position</b></label>
                                <p className="pt-3"> {profile.designation}</p>
                                <label><b>Email</b></label>
                                <p className="pt-3"> {profile.email}</p>
                                <label><b>Phone Number</b></label>
                                <p className="pt-3"> </p>
                            </div>
                            <div className="col-md-4 text-start">
                                <label><b>Tenure</b></label>


                                <p className="pt-3">    {monthDiff(profile.date_of_joining)}</p>
                                <label><b>Birthday</b></label>
                                <p className="pt-3"> {profile.dob}</p>
                            </div>
                        </div>

                    </div>
                    <div className="col-sm-4">
                        <div style={wrapperStyle} className="mt-4" >

                            <Calendar fullscreen={false} onPanelChange={onPanelChange} />

                        </div>




                    </div>
                    <div className="row ">
                        <label className="text-start mt-3"><b>My Projects</b></label>
                        <div className="col-sm-3 mt-4">
                            <Card sx={{ minWidth: 50 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        be{bull}nev{bull}o{bull}lent
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>


                        </div>
                        <div className="col-sm-5 mt-4">
                            <Card sx={{ minWidth: 50 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        be{bull}nev{bull}o{bull}lent
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>


                        </div>
                        <div className="col-sm-3">
                            <label className="text-start"><b>Leave Quota</b></label>
                            {
                                allleave.map((element, index) => {
                                    return (
                                        <>
                                            <div className="row mt-3 p-2">
                                                <div className="col-sm-6">
                                                    {element.name}
                                                </div>
                                                <div className="col-sm-6">
                                                    {element.leave_type}
                                                </div>


                                            </div>
                                        </>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>

    )


}
export default Profile;