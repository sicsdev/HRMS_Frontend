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
import { Dropdown, Space } from 'antd';
import { format, getMonth } from 'date-fns'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CompressOutlined } from "@mui/icons-material";


const drawerWidth = 240;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
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

export default function UserDashboard(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navigate = useNavigate();

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
    const [allemployee, setAllEmployee] = useState([]);
    const [postid, setPostId] = useState('');
    const [addcomment, setAddComment] = useState('')
    const [addtitle, setAddTitle] = useState('')
    const [id, setId] = useState('')
    const [imageval, setImageVal] = useState('')
    const [openComment, setOpenComment] = useState(false);
    const [allpost, setAllPost] = useState([]);
    const [likeval, setLikeVal] = useState([]);
    const [event, setEvent] = useState([]);


    const handlePost = async (e) => {
        setAddPost(e.target.value)
    }

    const handleComment = async (e) => {
        setAddComment(e.target.value)
    }

    const handleTitlePost = async (e) => {
        setAddTitle(e.target.value)
    }

    const nameHandleCancel = () => {
        setOpenname(false);
    };



    const editHandleCancel = () => {
        setOpenEdit(false);
    };

    const commentHandleCancel = () => {
        setOpenComment(false);
    };



    const nameShowModal = () => {
        setOpenname(true);
    };

    const commentShowModal = (item) => {
        setOpenComment(true);
        setPostId(item);
        console.log(item, "item")
    };


    const editShow = () => {
        setOpenEdit(true);
    };



    const nameHandleOk = () => {


        const description = addpost;
        const title = addtitle
        const image = imageval;

        const formData = new FormData();
        formData.append("title", addtitle);
        formData.append("description", addpost);
        formData.append("image", imageval);


        axios.post(`http://localhost:8000/add_post`, formData)
            .then((res) => {

                setAddPost(res.data)

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


    const editHandleOk = () => {

    }
    const commentHandleOk = () => {


        const content = addcomment
        console.log(content);

        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
            },
        };

        const formData = new FormData();
        formData.append("content", addcomment);

        axios.post(`http://localhost:8000/comment/${postid}`, { content: content }, token)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
        setAddComment('');
        setOpenComment(false)

    }

    useEffect(() => {


        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens,
            },
        };

        axios.get(`http://localhost:8000/profile`, token)
            .then((res) => {

                setProfileVal(res.data)
                setLogin(true)

            })
            .catch((err) => {
                console.log(err);
            });

    }, [])


    const record = (id) => {
        console.log(id, "checkid")
        setId(id)
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/delete_post/${id}`)
            .then((res) => {
                console.log(res.data)
                const filter_data = allpost.filter((x) => x._id != x.id)
                setAllPost(filter_data)
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const post_id = (e, element) => {
        e.preventDefault();
        console.log(element);

        let authtokens = localStorage.getItem("authtoken");
        let token = {
            headers: {
                token: authtokens
            },
        };

        axios.post(`http://localhost:8000/like/${element}`, {}, token)
            .then((res) => {
                console.log(res.data)
                setLikeVal(res.data)
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


        axios.get(`http://localhost:8000/all_post`, token)
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
        axios.get(`http://localhost:8000/employee_birthday`)
            .then((res) => {
                setAllEmployee(res.data)


            })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    useEffect(() => {

        axios.get(`http://localhost:8000/event`)
            .then((res) => {
                setEvent(res.data)
                console.log(res.data, "dddddddd")

            })
            .catch((err) => {
                console.log(err);
            });

    }, [])




    const drawer = (
        <div>
            <Toolbar />
            <List>
                <img src="logo.png"></img>
                <Divider className='nav_divider mt-4' />
                <div className='avatar mt-4'>
                    <Avatar className='avatar_img mx-auto' alt={profileval.name} src={profileval.image} sx={{ height: '120px', width: '120px' }} />

                </div>
                <div className='profile_name'>
                    <h5 className='mt-4 '>{profileval.name}</h5>
                    <h5 className='mt-1'>{profileval.emp_id}</h5>
                </div>
                <div className='profile_details mt-4'>
                    <div className='row setting'>
                        <div className='col-6 mt-4'>
                            <h6>Designation</h6>
                            <h6 className='pt-4' >Reporting Manager</h6>
                            <h6 className='pt-4' >Leave Quota</h6>

                        </div>
                        <div className='col-6 mt-4'>
                            <h6>{profileval.designation}</h6>
                            <h6 className='pt-4'>Reporting Manager</h6>
                            <h6 className='pt-4' >6</h6>

                        </div>
                    </div>
                </div>
                <div className='logout_button mt-4 '>
                    <button className='btn btn-primary logout_style' onClick={logout} >Logout</button>

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
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >

                    </IconButton>
                    <Typography variant="h6" noWrap component="div" className='header_menu'>

                        <div className='row'>
                            <div className='col-5 apply_logo'>


                                <img src="apply_Leave.svg" ></img>  &nbsp;    Apply Leave  &nbsp;
                            </div>
                            <div className='col-5'>
                                <div className='row header_setting' >
                                    <div className='col-4'>


                                        <Avatar alt={profileval.name} src={profileval.image} sx={{ width: 50, height: 50 }} />
                                    </div>
                                    <div className='col-8 mt-2'>

                                        <p>{profileval.name}</p>

                                    </div>

                                </div>
                            </div>
                            <div className='col-2 mt-2'>
                                <Box sx={{ minWidth: 10 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select">


                                            <MenuItem value={10}>
                                                <Link to="/profile" className="main_head">Profile</Link></MenuItem>

                                            <MenuItem value={20} onClick={logout} >Logout</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>

                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav" className="mail"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >

                <Drawer className="ddd"
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
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box className='main_box'
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(75% - ${drawerWidth}px)`, } }}
            >
                <Toolbar />
                <Typography paragraph>
                    <Box
                        component="mainpage"
                        sx={{ p: 3, width: { sm: `calc(100% - ${drawerWidth * 2}px)` } }}
                    >
                        <Toolbar />
                        <div className='row post_section'>
                            <div className='col-sm-10'>
                                <Typography>
                                    <h4>Announcements</h4>
                                </Typography>
                            </div>
                            <div className='col-sm-2'>
                                <Typography>
                                </Typography>
                            </div>
                        </div>
                        {

                            allpost.map((element, index) => {
                                return (

                                    <Card key={index} sx={{ maxWidth: 1100, marginTop: 10 }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" >
                                                    HR
                                                </Avatar>
                                            }
                                            className="post_style"
                                            title={element.x.title}
                                            subheader={moment(element.x.post_date).format('DD/MM/YYYY')}
                                        />

                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                {element.x.description}
                                            </Typography>
                                        </CardContent>
                                        <CardContent>
                                        {element.x.image ?

                                            <Typography variant="body2" color="text.secondary">
                                                <img src={element.x.image} width="100%" height="450" />
                                            </Typography>
                                            :
                                            ''
                                            }
                                        </CardContent>
                                        <CardActions disableSpacing >
                                            <IconButton aria-label="add to favorites" >
                                                {element?.isLike ? (

                                                    <FavoriteIcon key={index} onClick={(e) => { post_id(e, element.x._id) }} style={{
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


                                                <MapsUgcIcon onClick={(e) => { commentShowModal(element.x._id) }} />
                                                <Modal className="mt-4"
                                                    open={openComment}
                                                    title="Add Comment"
                                                    onOk={commentHandleOk}
                                                    onCancel={commentHandleCancel}
                                                    footer={[

                                                        <Button key="submit" type="primary" onClick={commentHandleOk}  >
                                                            Add Comment
                                                        </Button>,

                                                    ]}
                                                >
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
                </Typography>

            </Box>
            <Box className='sub_box'
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(25% - ${drawerWidth}px)` } }}
            >
                <Toolbar />


                <Typography paragraph >
                    <Box
                        component="sidebar"
                        sx={{ width: { sm: drawerWidth } }}
                        className="sidebar">
                       


                        <h5 className='mt-5'><b>Upcomming Birthday</b></h5>
                        {
                            allemployee.map((item, elem) => {
                                let newDate2 = moment(item.dob).format("MMM DD, YYYY");
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
                </Typography>



            </Box>
        </Box>
    );
}