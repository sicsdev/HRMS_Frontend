// import React, { useEffect, useState } from "react";
// import Header from "../utils/header";
// import axios from "axios";
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from "react-router-dom";
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 0;

// const drawerWidth = 240;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

// function ApplyLeave() {


//     const navigate = useNavigate();

//     const [leavevalue, setLeaveValue] = useState([]);

//     const [submitval, setSubmitVal] = useState({
//         leave: "",
//         reason: "",
//         from_date: "",
//         to_date: ""
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//     };


//     const values = (e) => {

//         setSubmitVal({ ...submitval, [e.target.name]: e.target.value });

//     }


//     useEffect(() => {
        
//         axios.get(`http://localhost:8000/all_leave`)
//             .then((res) => {
//                 console.log(res.data,"check1")
//                 setLeaveValue(res.data)
                


//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }, [])


//     const add = () => {

//         const {  reason, from_date,to_date,leave } = submitval;

//         if(!reason || !from_date || !leave || !to_date ){
//             toast.error("All fields are required")   
//             return
//           }

//         let authtokens = localStorage.getItem("authtoken");
//         let token = {
//             headers: {
//                 token: authtokens,
//             },
//         };
//         // let leaveData=[]
//         // for(let x of leavevalue){
//         //     let index=leaves.indexOf(x.name)
//         //     if(index>-1){
//         //         leaveData.push({
//         //             id:x._id,
//         //             name:x.name
//         //         })
//         //     }
//         // }
//         // console.log(leaveData,"add")

//         // let data = { ...submitval,leaves:leaveData }


//         axios
//             .post(`http://localhost:8000/apply_leave`, submitval, token)
//             .then((res) => {
//                 console.log(res.data);
//                 navigate('/leaves')

//             })
//             .catch((err) => {
//                 console.log(err);

//             });

//             setSubmitVal({reason: '', from_date: '',to_date: '', leave: ''})
//     }
   

//     return (
//         <>
           
//                 <Header />
//                 <ToastContainer></ToastContainer>
//                 <Box
//                     component="main"
//                     sx={{ flexGrow: 1, p: 3, width: { sm: `calc(95% - ${drawerWidth}px)` } }}
//                 >
//                     <Toolbar />
//                     <Typography paragraph>

//                         <h3 className="applyleave text-center mt-3">Applying For Leave </h3>

//                         <form onSubmit={handleSubmit} >
//                             <div className="col-sm-4 mx-auto ">
//                                 <div className="form-group" align="left">
//                                     <label>Type Of Leave</label>

//                                     <select id="dino-select"  className="form-control" name="leave"  onChange={values} required>
//                                         <option>Select Leave</option>
//                                         <optgroup label="Half Day">

//                                             {
//                                                 leavevalue.map((item) => {
                                                  
//                                                         if (item.category == 'half day'){
//                                                                 return (
//                                                                     <option value={item._id}>{item.name}</option>
//                                                                 )
//                                                             }
//                                                 })
//                                             }
//                                         </optgroup>

//                                         <optgroup label="Full Day">

//                                                 {
//                                                     leavevalue.map((item) => {
//                                                             if (item.category == 'full day'){
//                                                                     return (
//                                                                         <option value={item._id}>{item.name}</option>
//                                                                     )
//                                                                 }
//                                                     })
//                                                 }
//                                         </optgroup>
//                                     </select>
//                                 </div>
//                                 <div className="form-group" align="left">
//                                     <label>From Date</label>
//                                     <input
//                                         type="date"
//                                         className="form-control formtext date"
//                                         name="from_date"
//                                         onChange={values}
//                                         value={submitval.from_date} 
//                                         required
                                        
//                                     />
//                                 </div>
//                                 <div className="form-group" align="left">
//                                     <label>To Date</label>
//                                     <input
//                                         type="date"
//                                         className="form-control formtext date"
//                                         name="to_date"
//                                         onChange={values}
//                                         value={submitval.to_date}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group " align="left">
//                                     <label>Reason</label>
//                                     <textarea className="form-control" name="reason" onChange={values} value={submitval.reason} required></textarea>
//                                 </div>

//                                 <div className="submit-btn mt-2" align="right">
//                                     <input
//                                         type="submit"
//                                         name="submit"
//                                         className="btn btn-danger"
//                                         value="Apply Leave"
//                                         onClick={add}
//                                     />
//                                 </div>
//                             </div>
//                         </form>
//             </Typography>
    
//          </Box>
//         </>
//     );



// }


// export default ApplyLeave;
import React, { useEffect, useState } from "react";
import Header from "../utils/header";
import axios from "axios";
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

const drawerWidth = 320;
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
        console.log(value.format('YYYY-MM-DD'), mode);
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

    console.log(leavevalue, "leavevalueleavevalue")
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
            const config = {
                header: {
                    "Content-Type": "application/json",
                },
            };
            axios.get(`${BASE_URL}/all_leave`, config)
                .then((res) => {
                    console.log(res.data, "check1")
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
            navigate('/login')
        }
        else {

            axios.get(`${BASE_URL}/profile`, token)
                .then((res) => {
                    console.log(res.data, "res.datares.data")
                    setPendingLeave(res.data)


                })
                .catch((err) => {
                    console.log(err);
                });
        }



    }, [])

    
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
                console.log(res.data);
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
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(95% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Typography paragraph>

              
                <div className="static_width layout apply-leaves-main-layout">
                    <div className="container apply_leave_page">
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
                        <div className="row apply_leave_section">
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
                                                className="btn btn-primary apply_button"
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
                </Typography>

          
            </Box>
            </div>

        </>
    );



}

export default ApplyLeave;