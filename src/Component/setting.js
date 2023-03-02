import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import { Button, Modal } from 'antd';
import axios from "axios";
import Header from "../pages/utils/header";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import moment from "moment";
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const drawerWidth = 320;

const Setting = () => {


  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [fillname, setName] = useState('')
  const [fillemail, setEmail] = useState('')
  const [fillpassword, setPassword] = useState('')
  const [fillphone, setPhone] = useState('')
  const [filldob, setDob] = useState('')
  const [imageval, setImageVal] = useState('')
  const [image, setImage] = useState('')
  const [changePassword, setChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));


  const handlesubmit = async (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };


  const handleName = async(e) => {
    setName(e.target.value)
  }

  const handleEmail = async(e) => {
    setEmail(e.target.value)

  }

  const handlePassword = async(e) => {
    setPassword(e.target.value)

  }

  const handlePhone = async(e) => {
    setPhone(e.target.value)

  }

  const handleDob = async(e) => {
    setDob(e.target.value)

  }

  const handleOk = () => {

    const image = imageval;
    const formData = new FormData();

    formData.append("image", imageval);

    let authtokens = localStorage.getItem('authtoken');

    let axoisimage = {
      headers: {
        'token': authtokens,

      }
    };

    axios.post(`http://localhost:8000/imageupload`, formData, axoisimage)
      .then((res) => {

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);


  }


  const changePasswordCancel = () => {
    setChangePassword(false);
  };

  const changePasswordShow = () => {
    setChangePassword(true);
  };

  
  const changePasswordOk = () => {

    let authtokens = localStorage.getItem("authtoken");
    let axiostoken = {
        headers: {
            token: authtokens,
        },
    };
       
        const old_password = oldPassword;
        const new_password = newPassword;
        const confirm_password = confirmPassword;

        if(!old_password || !new_password || !confirm_password){
          toast.error("All fields are required")
          return
        }
      

        axios.post(`http://localhost:8000/change_password`, {old_password:oldPassword, new_password:newPassword, 

        confirm_password:confirmPassword  }, axiostoken)
        .then((res) => {
          toast.success(res.data.message)
          setOldPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setChangePassword(false);
          
        
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message)
         
        });
  } 


  

    

  const update_records = async(req,res) => {

    let authtokens = localStorage.getItem('authtoken');

    let token = {
      headers: {
          'token': authtokens,
         
      }
    };
    
    const  name  = fillname;
    const  email  = fillemail;
    const  password  = fillpassword;
    const  phonenumber  = fillphone;
    const  dob  = filldob;
   
    axios.put(`http://localhost:8000/edit_profile`,{name:fillname, email:fillemail, phonenumber:fillphone, password:fillpassword,dob: filldob}, token)

                .then((res) => {
                  console.log(res.data, "checking")
                  setName(res.data.name)
                  setEmail(res.data.email)
                  setPassword(res.data.password)
                  setDob(res.data.dob)
                  setPhone(res.data.phonenumber)
                  navigate('/profile')
                })
                .catch((err) => {
                  console.log(err);
                });
                  
    }

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

      axios.get(`http://localhost:8000/profile`, token)
        .then((res) => {

          setName(res.data.name)
          setEmail(res.data.email)
          setPassword(res.data.password)
          setPhone(res.data.phonenumber)
          setDob(res.data.dob)
          setImage(res.data.image)
        })
        .catch((err) => {
          console.log(err);
        });
    }


  }, [])


  return (
    <>
      <Header/>
      <ToastContainer></ToastContainer>
    
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(95% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography paragraph>
      
          <form onSubmit={handlesubmit}>
          <h4 className="mt-3"> Profile > Edit Profile</h4>
            <div className="row mt-4 edit_page">
              <div className="col-md-2">
                <Stack direction="row" spacing={2}>
                  <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <SmallAvatar  className="small_avatar" >
                          <EditIcon className="edit_icon" onClick={showModal}/>
                          </SmallAvatar>
                      }
                    >
                      <Avatar alt="Travis Howard" src={image} className="edit_profile"/>
                    </Badge>
                
                </Stack>
                <Modal
                    open={open}
                    title="Image"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[

                      <Button key="submit" type="primary" onClick={handleOk}>
                        Submit
                      </Button>,

                    ]}
                  >
                    <input type="file" name="image" onChange={(e) =>
                      setImageVal(e.target.files[0])} />

                  </Modal>
              </div>
              <div className="col-md-4">
                <label className="mb-3 setting">Name</label>
                <input type="text" name="name"    onChange={(e) => handleName(e)}   value={fillname}className="form-control edit_page_color" placeholder="Enter Name"/>

               
              </div>
              <div className="col-md-4">
                <label className="mb-3 setting">Phone Number</label>
                <input type="text" name="phonenumber"    onChange={(e) => handlePhone(e)}  value={fillphone} className="form-control edit_page_color "  placeholder="Enter Phone Number"/>

               
              </div>
            </div>
            <div className="row edit_page">
              <div className="col-2">
               
              </div>
              <div className="col-md-4">
                <label className="mb-3 setting">Email Id</label>
                <input type="email" name="email"   onChange={(e) => handleEmail(e)}  value={fillemail}className="form-control edit_page_color" placeholder="Enter Email Id"/>

               
              </div>
              <div className="col-md-4">
                <label className="mb-3 setting">Date Of Birth</label>
                <input type="date" name="dob"  value={filldob} onChange={(e) => handleDob(e)}className="form-control edit_page_color" placeholder="Enter Date of Birth"/>

               
              </div>
            </div>
            <div className="row mt-3 edit_page">
              <div className="col-md-2">
               
              </div>
              <div className="col-md-4 password-type">
                <label className="mb-3 setting">Password</label><br/>
                {/* <input type="password" onChange={(e) => handlePassword(e)} name="password" value={fillpassword}className="form-control edit_page_color" placeholder="Enter Password"/> */}
                <Button key="submit" onClick={changePasswordShow}>
                  Change Password
                </Button>
                <Modal
                    open={changePassword}
                    title="Change Password"
                    onOk={changePasswordOk}
                    onCancel={changePasswordCancel}
                    footer={[
                    
                      <Button key="submit" type="primary"  onClick={changePasswordOk}>
                        Submit
                      </Button>,
                     
                    ]}
                  >
                    <label>Old Password</label>
                    <input type="password" name="old_password" onChange={(e) => {setOldPassword(e.target.value)}} className="form-control" placeholder="Current Password"/>
                    <label>New Password</label>
                    <input type="password" name="new_password" onChange={(e) => {setNewPassword(e.target.value)}}className="form-control" placeholder="New Password"/>
                    <label>Confirm Password</label>
                    <input type="password" name="confirm_password"  onChange={(e) => {setConfirmPassword(e.target.value)}}  className="form-control" placeholder="New Password"/>
                  </Modal>
              </div>
              <div className="col-4">
              </div>
            </div>
            <div className="row edit_page">
                <div className="col-md-2">

                </div>
                <div className="col-md-4">
                <div className="submit_btn_val mt-4">
                  <input type="submit" value="update" className="submit-value" onClick={update_records}/>
                </div>

                </div>
            </div>
            </form>
        </Typography>
      </Box>
    </>
  )
}

export default Setting;