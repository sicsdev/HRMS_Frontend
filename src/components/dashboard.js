import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, Modal } from 'antd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardHeader from '@mui/material/CardHeader';
import { styled } from '@mui/material/styles';
import { IconButtonProps } from '@mui/material/IconButton';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import * as moment from 'moment';
import { DownOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import MenuIcon from '@mui/icons-material/Menu';
import { BASE_URL } from "../baseUrl";
import { Dropdown, Space } from 'antd';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const drawerWidth = 340;


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function Dashboard(props) {

    const navigate = useNavigate();
    const { window } = props;

    const [mobileOpen, setMobileOpen] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    const [expanded, setExpanded] = React.useState(false);
    const [profileval, setProfileVal] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [isActive, setIsActive] = useState([]);
    const [openname, setOpenname] = useState(false);
    const [openedit, setOpenEdit] = useState(false);
    const [addpost, setAddPost] = useState('')
    const [addtitle, setAddTitle] = useState('')
    const [id, setId] = useState('')
    const [imageval, setImageVal] = useState('')
    const [allemployee, setAllEmployee] = useState([]);
    const [allpost, setAllPost] = useState([]);
    const [likeval, setLikeVal] = useState([]);
    const [event, setEvent] = useState([]);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [updateimage, setUpdateImage] = useState('')
    const [updateId, setUpdateId] = useState('');
    const [openComment, setOpenComment] = useState([]);
    const [addcomment, setAddComment] = useState('')
    const [postid, setPostId] = useState('');


    const handlePost = async (e) => {
        setAddPost(e.target.value)
    }

    const handleTitlePost = async (e) => {
        setAddTitle(e.target.value)
    }

    const nameHandleCancel = () => {
        setOpenname(false);
    };


    const handleComment = async (e) => {
        setAddComment(e.target.value)
    }
    const editHandleCancel = () => {
        setOpenEdit(false);
    };


    const nameShowModal = () => {
        setOpenname(true);
    };


    const editShow = () => {
        setOpenEdit(true);
    };


    const handlesubmit = async (e) => {
        e.preventDefault();
    };

    const handleTitle = async (e) => {
        setEditTitle(e.target.value)
    }

    const handleDescription = async (e) => {
        setEditDescription(e.target.value)

    }




    const nameHandleOk = () => {


        const description = addpost;
        const title = addtitle
        const image = imageval;

        const formData = new FormData();
        formData.append("title", addtitle);
        formData.append("description", addpost);
        formData.append("image", imageval);

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        axios.post(`${BASE_URL}/add_post`, formData, config)
            .then((res) => {

                setAddPost(res.data)
                let tmp = [...allpost]
                tmp.unshift(
                    {
                        x: {
                            title: res.data.data?.title,
                            description: res.data.data?.description,
                            image: res.data.data?.image
                        }
                    }
                )
                setAllPost([...tmp])

            })
            .catch((err) => {
                console.log(err);
            });
        setAddPost('');
        setAddTitle('')
        setImageVal('');
        setOpenname(false);

    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    useEffect(() => {


        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
                "Content-Type": "application/json",
            },
        };

        axios.get(`${BASE_URL}/profile`, token)
            .then((res) => {

                setProfileVal(res.data)
                setLogin(true)

            })
            .catch((err) => {
                console.log(err);
            });

    }, [])


    const record = (id) => {
        console.log(id, "dahkasd")
        setId(id)
        setUpdateId(id)
    }


    console.log(updateId, "fddfd");

    const editHandleOk = () => {
        const title = editTitle;
        const description = editDescription;

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        console.log(title, description)

        axios.put(`${BASE_URL}/edit_post/${updateId}`, { title: editTitle, description: editDescription }, config)
            .then((res) => {
                setEditTitle(res.data.title)
                setEditDescription(res.data.description)

                console.log(res.data, "res.data")
            })
            .catch((err) => {
                console.log(err);
            });
        setEditTitle("")
        setEditDescription("")
        setOpenEdit(false);


        // const image = updateimage;
        // console.log(image)
        // const formData = new FormData();

        // formData.append("image", updateimage);

        // axios.post(`http://localhost:8000/updateimageupload/${updateId}`, formData)
        //     .then((res) => {
        //         console.log(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }

    const handleDelete = () => {
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
        axios.delete(`${BASE_URL}/delete_post/${id}`, config)
            .then((res) => {
                console.log(res.data)
                const filter_data = allpost.filter((val) => val.x._id != id)
                setAllPost(filter_data)
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
                "Content-Type": "application/json",
            },
        };

        axios.get(`${BASE_URL}/all_post`, token)
            .then((res) => {
                console.log(res.data)
                setAllPost(res.data)

            })
            .catch((err) => {
                console.log(err);
            });

    }, [])




    const logout = () => {
        localStorage.removeItem('authtoken');
        setLogin(false);
        navigate('/login')
    };


    useEffect(() => {
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
        axios.get(`${BASE_URL}/all_employee`, config)
            .then((res) => {
                setAllEmployee(res.data)
                console.log(res.data, "all_employees")

            })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    useEffect(() => {
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
        axios.get(`${BASE_URL}/event`, config)
            .then((res) => {
                setEvent(res.data)


            })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    const post_id = (e, element, isLike) => {
        e.preventDefault();
        console.log(element);


        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
                "Content-Type": "application/json",
            },
        };

        axios.post(`${BASE_URL}/like/${element}`, {}, token)
            .then((res) => {
                console.log(res.data)

                setLikeVal(res.data)
                const filterrecord = allpost.map((val) => {

                    if (val.x._id == element) {
                        val.isLike = !isLike
                    }
                    console.log(val, "val")
                    return val
                })
                setAllPost(filterrecord)
            })
            .catch((err) => {
                console.log(err);
            });



        // let likedOrNot=likeval.indexOf(likeval.like)
        // console.log(likedOrNot, "like")
        // if(likedOrNot<0){
        //     return true;
        // }



    }


    const commentShowModal = (item, index) => {
        openComment[index] = true
        setOpenComment([...openComment])
        setPostId(item);

    };
    const commentHandleOk = (index) => {


        const content = addcomment
        console.log(content);
        if (content.length > 0) {

            let authtokens = localStorage.getItem("authtoken");
            let token = {
                headers: {
                    token: authtokens,
                },
            };

            const formData = new FormData();
            formData.append("content", addcomment);

            axios.post(`${BASE_URL}/comment/${postid}`, { content: content }, token)
                .then((res) => {
                    console.log(res.data, "checkcomment")

                    // console.log(tempp, "tempp")

                })
                .catch((err) => {
                    console.log(err);
                });
        }
        setAddComment('');
        openComment[index] = false
        setOpenComment([...openComment])
    }


    const drawer = (
        <div>

            <Toolbar />
            <List>
                <img src="logo.png"></img>
                <Divider className='nav_divider' />
                <div className='avatar'>
                    <Avatar className='avatar_img' alt="Remy Sharp" src={profileval.image} />

                </div>
                <div className='profile_name'>
                    <h5 className='mt-4 '>{profileval.name}</h5>
                    <h5 className='mt-1'>{profileval.emp_id}</h5>
                </div>
                <div className='profile_details'>
                    <div className='row setting'>
                        <div className='col-sm-6 col-6'>
                            <h6>Designation</h6>
                            <h6>Reporting Manager</h6>
                            <h6>Leave Quota</h6>

                        </div>
                        <div className='col-sm-6 col-4'>
                            <h6>{profileval.designation}</h6>
                            <h6>userr</h6>
                            <h6>6</h6>
                        </div>
                    </div>
                </div>
                <div className='logout_button mt-4'>
                    <button className='btn btn-primary' onClick={logout}>Logout</button>

                </div>
            </List>
        </div >
    );
    const items: MenuProps['items'] = [
        {
            label: <h6 onClick={editShow}>Edit </h6>,
            key: '0',
        },
        {
            label: <h6 onClick={handleDelete}>Delete </h6>,
            key: '1',
        },
        {

        },

    ];



    return (
        <Box sx={{ display: 'flex' }} className="dashboard_page">
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },

                }}
            >
                <Toolbar
                    className='main_header'
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {/* Responsive drawer */}
                    </Typography>


                    <Link to="/applyleave">
                        <img src="apply Leave.svg" ></img> </Link> &nbsp;    Apply Leave  &nbsp;

                    <div className="avatar_dropdown">
                        <Avatar alt="Remy Sharp" src={profileval.image} />
                        <div className="employe_info">

                            <p>employee</p>
                        </div>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"

                                >
                                    <MenuItem className="aline" value={10}>
                                        <Link to="/profile">Profile</Link></MenuItem>

                                    <MenuItem value={20} onClick={logout}>Logout</MenuItem>

                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </Toolbar>


            </AppBar >

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    className='left_nav'
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                    className='left_nav'

                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ p: 3, width: { sm: `calc(100% - ${drawerWidth * 2}px)` } }}
            >
                <Toolbar />
                <div className='row announcement_main'>
                    <div className='col-sm-10 announcement'>
                        <Typography>
                            Announcements
                        </Typography>
                    </div>
                    <div className='col-sm-2'>
                        <Typography>
                            <button className='btn btn-primary newpost_btn' onClick={nameShowModal}>New Post</button>


                            <Modal
                                open={openname}
                                title="Add Post"
                                onOk={nameHandleOk}
                                onCancel={nameHandleCancel}
                                footer={[

                                    <Button key="submit" type="primary" onClick={nameHandleOk}  >
                                        Submit
                                    </Button>,

                                ]}
                            >
                                <label> Add Ttile</label>
                                <input type="text" className="form-control" name="title" value={addtitle} onChange={(e) => handleTitlePost(e)}
                                />
                                <label> Add Description</label>
                                <textarea className="form-control" value={addpost} name="description" onChange={(e) => handlePost(e)}
                                ></textarea>
                                <label> Add Image</label>
                                <input type="file" name="image" className="form-control" onChange={(e) =>
                                    setImageVal(e.target.files[0])} />
                            </Modal>


                            <Modal
                                open={openedit}
                                title="Add Post"
                                onOk={editHandleOk}
                                onCancel={editHandleCancel}

                                footer={[

                                    <Button key="submit" type="primary" onClick={editHandleOk} >
                                        Submit
                                    </Button>,

                                ]}
                            >
                                <label> Edit Ttile</label>
                                <input type="text" className="form-control" name="title"
                                    onChange={(e) => handleTitle(e)}
                                />
                                <label> Edit Description</label>
                                <textarea className="form-control" name="description"
                                    onChange={(e) => handleDescription(e)}
                                ></textarea>
                                <label> Edit Image</label>
                                <input type="file" name="image" className="form-control" onChange={(e) =>
                                    setUpdateImage(e.target.files[0])} />
                            </Modal>
                        </Typography>
                    </div>
                </div>
                {

                    allpost.map((element, index) => {
                        return (

                            <Card key={index} sx={{ maxWidth: 1100, marginTop: 10 }} className="post">
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            R
                                        </Avatar>
                                    }
                                    action={
                                        <Dropdown menu={{ items }} trigger={['click']} onClick={(e) => { record(element.x.id) }}>
                                            <a onClick={(e) => e.preventDefault()}>

                                                <MoreVertIcon />

                                            </a>
                                        </Dropdown>

                                    } className="post_style"
                                    title={element.x.title}
                                    subheader={moment(element.x.post_date).format('DD/MM/YYYY')}
                                />

                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {element.x.description}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        <img src={element.x.image} />
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing >
                                    <IconButton aria-label="add to favorites" >
                                        {element?.isLike ? (

                                            <FavoriteIcon key={index}

                                                onClick={(e) => { post_id(e, element.x._id) }} style={{
                                                    backgroundColor: isActive ? 'white' : '',
                                                    color: isActive ? 'red' : '',
                                                }} />
                                        ) :
                                            (

                                                <FavoriteIcon key={index} onClick={(e) => { post_id(e, element.x._id) }} />
                                            )

                                        }


                                    </IconButton>
                                    <IconButton aria-label="share">




                                        <MapsUgcIcon onClick={(e) => { commentShowModal(element.x._id, index) }} />
                                        <Modal className="mt-4"
                                            open={openComment[index]}
                                            title="Add Comment"
                                            onOk={() => commentHandleOk(index)}
                                            onCancel={() => commentHandleOk(index)}
                                            footer={[

                                                <Button key="submit" type="primary" onClick={() => commentHandleOk(index)}  >
                                                    Add Comment
                                                </Button>,

                                            ]}
                                        >

                                            {
                                                element.x.comment?.map((item, i) => {
                                                    return (
                                                        <>

                                                            <Card sx={{ minWidth: 200, marginTop: 4 }} className="card_events">
                                                                <CardContent>


                                                                    <Typography sx={{ mb: 3, width: 200, height: 20 }} >
                                                                        <div className="row">
                                                                            <div className="col-4">
                                                                                <Avatar className='avatar_img' alt="Remy Sharp" src={item.userId.image} />
                                                                            </div>
                                                                            <div className="col-8">
                                                                                {item.userId.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-4">

                                                                            </div>
                                                                            <div className="col-8">
                                                                                <h6>  {item.content}</h6>
                                                                            </div>

                                                                        </div>

                                                                    </Typography>
                                                                </CardContent>
                                                            </Card>


                                                        </>
                                                    )
                                                })
                                            }
                                            <br />
                                            <textarea className="form-control" name="content" value={addcomment} onChange={(e) => handleComment(e)}
                                            ></textarea>

                                        </Modal>

                                    </IconButton>

                                </CardActions>

                            </Card>
                        )
                    })
                }



            </Box>


            <Box
                component="sidebar"
                sx={{ width: { sm: drawerWidth } }}
                className="sidebar ">
                <h4 className="mt-4">Events<button className="btn btn-primary btn-sm top"><Link to="/event" className="events ">Add Event</Link></button></h4>
                {
                    event.map((i) => {

                        return (

                            <Card sx={{ minWidth: 200, marginTop: 4 }} className="card_events">
                                <CardContent>


                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        <h5><b>{i.event_title} Event</b></h5>
                                        <h6>  {moment.utc(i.event_date).format("MMM DD, YYYY")}</h6>
                                        <Divider className='event_divider' />
                                    </Typography>

                                    <Typography sx={{ fontSize: 14, }} color="text.secondary" gutterBottom>
                                        {i.event_description}
                                    </Typography>
                                    <Typography className="mt-5">

                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    })
                }



                <h4 className='mt-4'>Upcomming Birthday</h4>
                {
                    allemployee.map((item, elem) => {
                        let newDate2 = moment.utc(item.dob).format("MMM DD, YYYY");
                        return (

                            <>

                                <Card key={elem} sx={{ minWidth: 200, marginTop: 4 }} className="card_events">
                                    <CardContent>

                                        <div className='row'>
                                            <div className='col-sm-4'>
                                                <Avatar className='avatar_img' alt="Remy Sharp" src={item.image} />
                                            </div>
                                            <div className='col-sm-8'>
                                                {item.name}
                                                <div>
                                                    {newDate2}</div>
                                            </div>
                                        </div>


                                    </CardContent>
                                </Card>
                            </>
                        )
                    })
                }


            </Box>

            {/* Sidebar end */}


        </Box >
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;