import React, {useEffect, useState} from "react";
import Avatar from '@mui/material/Avatar';
import { Button, Modal } from 'antd';
import axios from "axios";
const Setting = () => {


    const [open, setOpen] = useState(false);
    const [report_open, setReport_open] = useState(false);
    const [profile, setProfile] = useState('');
    const handleOk = () => {
     
    }

    const reporthandleOk = () => {
     
    }
  
    const leavehandleOk = () => {
     
    }
  
  
      const handleCancel = () => {
        setOpen(false);
      };

      const showModal = () => {
        setOpen(true);
      };

      const reporthandleCancel = () => {
        setReport_open(false);
      };

      const reportshowModal = () => {
        setReport_open(true);
      };



      const leavehandleCancel = () => {
        setReport_open(false);
      };

      const leaveshowModal = () => {
        setReport_open(true);
      };

    
     
      useEffect(() => {

     
        let authtokens = localStorage.getItem("authtoken");
        let token = {
          headers: {
            token: authtokens,
          },
        };

        axios.get(`http://localhost:8000/profile`, token)
        .then((res) => {
         
          setProfile(res.data)
        })  
        .catch((err) => {
          console.log(err);   
        }); 
        
      },[])
    
    
    
    return (
        <>
        
        <div className='container mt-4'>
         
           <div className="col-sm-6">
           <h5>Profile</h5>
            <div className='row pt-2'>
              <div className='col-6'>
                    <p>Image</p>
              </div>
              <div className='col-3 avatar_image'>
                     <Avatar src=""  /> 
             
                     
              </div>
              <div className='col-3'>
                {/* <p className='editstyle'>*/}
               <Button type="default" onClick={showModal} className="mt-3 addbutton">
                  Add
                </Button>
                <Button type="default"  className="mt-3 addbutton">
                  Delete
                </Button>
                  <Modal
                    open={open}
                    title="Title"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                      
                      <Button key="submit" type="primary"  >
                        Submit
                      </Button>,
                   
                    ]}
                  >
                    <input type="file" name="image"/>
                   
                  </Modal>
                     
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                    <p>Name</p>
              </div>
              <div className='col-3 avatar_image'>
                     <p>{profile.username}</p>
                     
              </div>
              <div className='col-3'>
                {/* <p className='editstyle'>*/}
               <Button type="default" onClick={showModal} className="mt-3 addbutton">
                  Add
                </Button>
                <Button type="default"  className="mt-3 addbutton">
                  Delete
                </Button>
                  <Modal
                    open={open}
                    title="Name"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                      
                      <Button key="submit" type="primary"  >
                        Submit
                      </Button>,
                   
                    ]}
                  >
                    <input type="text" name="username"/>
                   
                  </Modal>
                     
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                    <p>Email</p>
              </div>
              <div className='col-3 avatar_image'>
                     <p>{profile.email}</p>
                     
              </div>
              <div className='col-3'>
                {/* <p className='editstyle'>*/}
               <Button type="default" onClick={showModal} className="mt-3 addbutton">
                  Add
                </Button>
                <Button type="default"  className="mt-3 addbutton">
                  Delete
                </Button>
                  <Modal
                    open={open}
                    title="Title"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                      
                      <Button key="submit" type="primary"  >
                        Submit
                      </Button>,
                   
                    ]}
                  >
                  </Modal>
                     
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                    <p>Phone</p>
              </div>
              <div className='col-3 avatar_image'>
                     <p>{profile.phonenumber}</p>
                     
              </div>
              <div className='col-3'>
                {/* <p className='editstyle'>*/}
               <Button type="default" onClick={showModal} className="mt-3 addbutton">
                  Add
                </Button>
                <Button type="default"  className="mt-3 addbutton">
                  Delete
                </Button>
                  <Modal
                    open={open}
                    title="Phone Number"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                      
                      <Button key="submit" type="primary"  >
                        Submit
                      </Button>,
                   
                    ]}
                  >
                    <input type="text" name="phonenumber" className="form-control"></input>

                  </Modal>
                     
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                    <p>Password</p>
              </div>
              <div className='col-3 avatar_image'> 
              </div>
              <div className='col-3'>
                {/* <p className='editstyle'>*/}
               <Button type="default" onClick={showModal} className="mt-3 addbutton">
                  Change Password
                </Button>
              
                  <Modal
                    open={open}
                    title="New Password"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                      
                      <Button key="submit" type="primary"  >
                        Submit
                      </Button>,
                   
                    ]}
                  >
                    <input type="text" name="phonenumber" className="form-control"></input>

                  </Modal>
                     
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                    <p>Reporting Manager</p>
              </div>
              <div className='col-3 avatar_image'>
                     <p>{profile.reporting_manager}</p>
                     
              </div>
              <div className='col-3'>
                {/* <p className='editstyle'>*/}
               <Button type="default" onClick={reportshowModal} className="mt-3 addbutton">
                  Add
                </Button>
                <Button type="default"  className="mt-3 addbutton">
                  Delete
                </Button>
                  <Modal
                    open={report_open}
                    title="Reporting Manager"
                    onOk={reporthandleOk}
                    onCancel={reporthandleCancel}
                    footer={[
                      
                      <Button key="submit" type="primary"  >
                        Submit
                      </Button>,
                   
                    ]}
                  >
                   
                   <input type="text" name="leave_quota" className="form-control"></input>
                  </Modal>
                     
              </div>
            </div> 
            <div className='row'>
              <div className='col-6'>
                    <p>Leaves Quota</p>
              </div>
              <div className='col-3 avatar_image'>
                     <p>{profile.leave_quota}</p>
                     
              </div>
              <div className='col-3'>
                {/* <p className='editstyle'>*/}
               <Button type="default" onClick={leaveshowModal} className="mt-3 addbutton">
                  Add
                </Button>
                <Button type="default"  className="mt-3 addbutton">
                  Delete
                </Button>
                  <Modal
                    open={report_open}
                    title="Leave Quota"
                    onOk={leavehandleOk}
                    onCancel={leavehandleCancel}
                    footer={[
                      
                      <Button key="submit" type="primary"  >
                        Submit
                      </Button>,
                   
                    ]}
                  >
                   
                   <input type="text" name="leave_quota" className="form-control"></input>
                  </Modal>
                     
              </div>
            </div> 
            </div>
         </div>
        </>
    )
}

export default Setting;