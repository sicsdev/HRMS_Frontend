import React, {useEffect, useState} from "react";
import Avatar from '@mui/material/Avatar';
import { Button, Modal } from 'antd';
import axios from "axios";
const Setting = () => {


    const [open, setOpen] = useState(false);
    const [openemail, setOpenemail] = useState(false);
    const [openphone, setOpenphone] = useState(false);
    const [openname, setOpenname] = useState(false);
    const [openpassword, setOpenpassword] = useState(false);
    const [opendob, setOpendob] = useState(false);
   
    const [profile, setProfile] = useState('');

    const [usernameval, setUsernameVal] = useState('')
    const [emailval, setEmailVal] = useState('')
    const [passwordval, setPasswordVal] = useState('')
    const [phoneval, setPhoneVal] = useState('')
    const [dobval, setDobVal] = useState('')
    const [imageval, setImageVal] = useState('')


    const handlesubmit = async (e) => {
      e.preventDefault();
    };

    const handleUsername = async(e) => {
      setUsernameVal(e.target.value)
    }
    const handleEmail = async(e) => {
      setEmailVal(e.target.value)
    }

    const handlePassword = async(e) => {
      setPasswordVal(e.target.value)
    }

    const handlePhone = async(e) => {
      setPhoneVal(e.target.value)
    }

    const handleDob = async(e) => {
      setDobVal(e.target.value)
    }



    const handleOk = () => {
      // const image  = imageval;


   

      // let authtokens = localStorage.getItem("authtoken");
      // let token = {
      //   headers: {
      //     token: authtokens,
      //   },
      // };

      // axios.put(`http://localhost:8000/imageupload`, {image:image}, token)
      // .then((res) => {
      
      //   setImageVal(res.data)
      //   setOpen(false)
      //   console.log(res.data)
      // })  
      // .catch((err) => {
      //   console.log(err);   
      // }); 

      const image = imageval;


      console.log(image)
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
      setTimeout(() => {
      
        setOpen(false);
      });
     
 
    }

      const handleCancel = () => {
        setOpen(false);
      };

      const showModal = () => {
        setOpen(true);
      };


      const emailHandleOk = () => {
           const email  = emailval;

            let authtokens = localStorage.getItem("authtoken");
            let token = {
              headers: {
                token: authtokens,
              },
            };

            axios.put(`http://localhost:8000/editemail`, {email:email}, token)
            .then((res) => {
           
             setEmailVal(res.data)
              setOpenemail(false)
            })  
            .catch((err) => {
              console.log(err);   
            }); 
            setEmailVal('')
      }
  
        const emailHandleCancel = () => {
          setOpenemail(false);
        };
  
        const emailShowModal = () => {
          setOpenemail(true);
        };


        const phoneHandleOk = () => {
            const phonenumber  = phoneval;

            let authtokens = localStorage.getItem("authtoken");
            let token = {
              headers: {
                token: authtokens,
              },
            };

            axios.put(`http://localhost:8000/editphone`, {phonenumber:phonenumber}, token)
            .then((res) => {
          
              setPhoneVal(res.data)
              setOpenphone(false)
            })  
            .catch((err) => {
              console.log(err);   
            }); 
            setPhoneVal('')
     
        }
    
          const phoneHandleCancel = () => {
            setOpenphone(false);
          };
    
          const phoneShowModal = () => {
            setOpenphone(true);
          };
  
          const nameHandleOk = () => {
     

            const username  = usernameval;

            console.log(username, "fdh")
            let authtokens = localStorage.getItem("authtoken");
            let token = {
              headers: {
                token: authtokens,
              },
            };

            axios.put(`http://localhost:8000/editusername`, {username:username}, token)
            .then((res) => {
             console.log(username)
              setUsernameVal(res.data)
              setOpenname(false)
            })  
            .catch((err) => {
              console.log(err);   
            }); 
            setUsernameVal('')
            
          }
      
            const nameHandleCancel = () => {
              setOpenname(false);
            };
      
            const nameShowModal = () => {
              setOpenname(true);
            };
    
            const passwordHandleOk = () => {


              const password  = passwordval;

              let authtokens = localStorage.getItem("authtoken");
              let token = {
                headers: {
                  token: authtokens,
                },
              };
  
              axios.put(`http://localhost:8000/editpassword`, {password:password}, token)
              .then((res) => {
              
                setPasswordVal(res.data)
                setOpenpassword(false)
              })  
              .catch((err) => {
                console.log(err);   
              }); 
              setPasswordVal('')
     
            }
        
              const passwordHandleCancel = () => {
                setOpenpassword(false);
              };
        
              const passwordShowModal = () => {
                setOpenpassword(true);
              };

              const dobHandleOk = () => {
                  const dob  = dobval;

                  let authtokens = localStorage.getItem("authtoken");
                  let token = {
                    headers: {
                      token: authtokens,
                    },
                  };
      
                  axios.put(`http://localhost:8000/editdob`, {dob:dob}, token)
                  .then((res) => {
                  
                    setDobVal(res.data)
                    setOpendob(false)
                  })  
                  .catch((err) => {
                    console.log(err);   
                  }); 
                  setDobVal('')
       
              }
          
                const dobHandleCancel = () => {
                  setOpendob(false);
                };
          
                const dobShowModal = () => {
                  setOpendob(true);
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
      }, []);
        
      // },[nameHandleOk,emailHandleOk, phoneHandleOk, dobHandleOk, passwordHandleOk])
    
    
    
    return (
        <>
        
        <div className='container mt-4'>
         <form onSubmit={handlesubmit}>
           <div className="col-sm-6">
           <h5>Profile</h5>
            <div className='row pt-2'>
              <div className='col-6'>
                    <p>Image</p>
              </div>
              <div className='col-3 avatar_image'>
                     <Avatar src={profile.image}   height={150} width={150} /> 
             
                     
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
                    title="Image"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                      
                      <Button key="submit" type="primary"  onClick={handleOk}>
                        Submit
                      </Button>,
                   
                    ]}
                  >
                    <input type="file" name="image" onChange={(e) =>
                            setImageVal(e.target.files[0])}/>
                   
                  </Modal>
                     
              </div>
            </div>


            <div className='row'>
              <div className='col-6'>
                    <p>Username</p>
              </div>
              <div className='col-3 avatar_image'>
                     <p>{profile.username}</p>
                     
              </div>
              <div className='col-3'>
                {/* <p className='editstyle'>*/}
               <Button type="default" onClick={nameShowModal} className="mt-3 addbutton">
                  Edit
                </Button>
              
                  <Modal
                    open={openname}
                    title="Username"
                    onOk={nameHandleOk}
                    onCancel={nameHandleCancel}
                    footer={[
                      
                      <Button key="submit" type="primary" onClick={nameHandleOk}  >
                        Submit
                      </Button>,
                    
                    ]}
                  >
                    <input type="text" name="username" 
                onChange={(e) => handleUsername(e)}/>
                   
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
               <Button type="default" onClick={emailShowModal} className="mt-3 addbutton">
                  Edit
                </Button>
              
                  <Modal
                    open={openemail}
                    title="Email"
                    onOk={emailHandleOk}
                    onCancel={emailHandleCancel}
                    footer={[
                      
                      <Button key="submit" type="primary"  onClick={emailHandleOk}>
                        Submit
                      </Button>,
                   
                    ]}
                  >
                    <input type="text" name="email"  onChange={(e) => handleEmail(e)}/>
                   
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
               <Button type="default" onClick={phoneShowModal} className="mt-3 addbutton">
                  Edit
                </Button>
              
                  <Modal
                    open={openphone}
                    title="Phone Number"
                    onOk={phoneHandleOk}
                    onCancel={phoneHandleCancel}
                    footer={[
                      
                      <Button key="submit" type="primary"  onClick={phoneHandleOk}>
                        Submit
                      </Button>,
                   
                    ]}
                  >
                    <input type="text" name="phonenumber" onChange={(e) => handlePhone(e)} />
                   
                  </Modal>
                     
              </div>
            </div>


            <div className='row'>
              <div className='col-6'>
                    <p>Date Of Birth</p>
              </div>
              <div className='col-3 avatar_image'>
                     <p>{profile.dob}</p>
                     
              </div>
              <div className='col-3'>
                {/* <p className='editstyle'>*/}
               <Button type="default" onClick={dobShowModal} className="mt-3 addbutton">
                  Edit
                </Button>
              
                  <Modal
                    open={opendob}
                    title="Date Of Birth"
                    onOk={dobHandleOk}
                    onCancel={dobHandleCancel}
                    footer={[
                      
                      <Button key="submit" type="primary" onClick={dobHandleOk}>
                        Submit
                      </Button>,
                   
                    ]}
                  >
                    <input type="date" name="dob" onChange={(e) => handleDob(e)}/>
                   
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
               <Button type="default" onClick={passwordShowModal} className="mt-3 addbutton">
                  Change Password
                </Button>
             
                  <Modal
                    open={openpassword}
                    title="New Password"
                    onOk={passwordHandleOk}
                    onCancel={passwordHandleCancel}
                    footer={[
                      
                      <Button key="submit" type="primary" onClick={passwordHandleOk} >
                        Submit
                      </Button>,
                   
                    ]}
                  >
                    <input type="text" name="password"    onChange={(e) => handlePassword(e)}/>
                   
                  </Modal>
                     
              </div>
            </div>
            
            </div>
            </form>
         </div>
        </>
    )
}

export default Setting;