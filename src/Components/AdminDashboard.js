import './AdminDashboard.scss'
import { BsBag } from 'react-icons/bs'
import { adminpakage,request } from './Data';
import {  getpakage, getpakagetwo, pkgedit } from '../http/Services';
import axios from "../http/axiosSet"

import React, { useState, useEffect } from "react";



import { BiSolidDashboard } from "react-icons/bi";

import { AiOutlineUsergroupDelete } from "react-icons/ai";


import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { formatDistanceToNow } from 'date-fns';
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const AdminDashboard = ({ products, handlePress }) => {
    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [pakage, setpakage] = useState([]);
    const [edit, setedit] = useState({
        id: "",
        name: "",
        description: "",
        totalAds: 0,
        price: 0,
    });
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    //fetch categories

    useEffect(() => {
        //fetch categories
        const fetchpkg = async () => {
            try {
                const resp = await getpakagetwo();
                console.log(" reponse ", resp);
                setpakage(resp);
            } catch (err) {
                console.log(err);
            }
        };
        fetchpkg();
    }, []);


    console.log('hello sheikh sab', pakage)
    const editpkg = async (id) => {
        setOpen(true);
        const data = pakage.filter(
            (item) => item._id.toString() === id.toString()
        )[0];
        setedit({ ...data, id });
    };



    const editpkgdone = async () => {
        const { id, ...data } = edit;
        const response = await pkgedit(id, data);
        setpakage(
            pakage.map((item) => {
                if (item._id.toString() === response._id.toString()) {
                    return response;
                }
                return item;
            })
        );
        console.log('this is resonpne', response);
    };



    return (
        <div className={`dashboard ${isSidebarOpen ? "sidebar-open" : ""}`}>
            <div className="sidebar">
                <div className="sidebar-header">
                    <img src="./images/logo.png" alt="" />
                </div>
                <ul className="sidebar-menu">
                    <div
                        className="sidebar-menu-parent"
                        style={{ background: "#FC5018" }}
                    >
                        <div className="sidebar-menu-sub">
                            <span style={{ color: "white" }}>
                                <BiSolidDashboard />
                            </span>
                            <li style={{ color: "white" }}>Dashboard</li>
                        </div>
                    </div>

                    <div className="sidebar-menu-parent">
                        <div className="sidebar-menu-sub">
                            <span>
                                <BsBag />
                            </span>
                            <li>Orders</li>
                        </div>
                    </div>

                    <div className="sidebar-menu-parent">
                        <div className="sidebar-menu-sub">
                            <span>
                                <AiOutlineUsergroupDelete />
                            </span>
                            <li>Users</li>
                        </div>
                    </div>
                </ul>
                {/* <div className="sidebar-toggle" onClick={toggleSidebar}>
                    {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                </div> */}
            </div>
            <div>
                <div className="main-content-parent">
                    <div className="main-content">
                        <h1>Dashboard</h1>
                        <h3>Pricing Plans</h3>
                        <p>
                            Start building for free, then add a site plan to go live. Account
                            plans unlock additional features.
                        </p>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: "10px",
                        }}
                    >
                        {pakage.map((item) => {
                            return (
                                <div className="card-parent">
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <p>{item.totalAds}</p>
                                        <div className="price">
                                            <h1>{item.price}</h1>

                                            <span>/mo</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            {/* <input type="number" placeholder='Edit your price' style={{width:'100%',border:'1px solid rgb(128, 128, 128)',outline:'none',borderRadius:'4px',padding:'0 10px'}}/> */}
                                            <button onClick={() => editpkg(item._id)}>Edit</button>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <input
                                                        type="text"
                                                        value={edit.name}
                                                        placeholder="edit your title"
                                                        style={{ border: "1px solid rgb(128, 128, 128)" }}
                                                        onChange={(e) =>
                                                            setedit({ ...edit, name: e.target.value })
                                                        }
                                                    />
                                                    <input
                                                        type="text"
                                                        value={edit.description}
                                                        placeholder="edit your description"
                                                        style={{ border: "1px solid rgb(128, 128, 128)" }} onChange={(e) =>
                                                            setedit({ ...edit, description: e.target.value })
                                                        }
                                                    />
                                                    <input
                                                        type="number"
                                                        value={edit.price}
                                                        placeholder="edit your price"
                                                        style={{ border: "1px solid rgb(128, 128, 128)" }} onChange={(e) =>
                                                            setedit({ ...edit, price: e.target.value })
                                                        }
                                                    />
                                                    <input
                                                        type="number"
                                                        value={edit.totalAds}
                                                        placeholder="edit your ads"
                                                        style={{ border: "1px solid rgb(128, 128, 128)" }}
                                                        onChange={(e) =>
                                                            setedit({ ...edit, totalAds: e.target.value })
                                                        }
                                                    />
                                                    <button onClick={editpkgdone}>Update</button>
                                                </Box>
                                            </Modal>
                                        </div>

                                        <div>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='request-card-parent-main'>
                        {
                            products.map((item) => {
                                const createdAt = new Date(item.createdAt); // Replace this with your actual createdAt value

                                // Format the time as "time ago"
                                const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });
                                return (
                                    <div className='request-card-parent'>
                                        <div className='price-parent'>
                                            <div className='img-parent'>
                                                <div className='img-div'>
                                                    <img src={`${axios.defaults.baseURL}/upload/image/${item.images[0]}`} alt="" />
                                                </div>
                                                <div>
                                                    <h1>{item.title}</h1>
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                            <div >
                                                <h1 className='price'>{item.price}USD</h1>
                                            </div>
                                        </div>
                                        <div className='brand-item'>
                                            <ul className='brand-item-list'>
                                                <li>{item.brand}</li>
                                                <li>{item.model}</li>
                                                <li>{item.condition}</li>
                                                <li>{item.display}</li>
                                                <li>{item.tech}</li>
                                                <li>{item.size}</li>

                                                <li>{item.fresh}</li>
                                            </ul>
                                            {/* <ul className='brand-item-list-name'>
                                                <li>{item.brandname}</li>
                                                <li>{item.modelname}</li>
                                                <li>{item.conditionname}</li>
                                                <li>{item.displayname}</li>
                                                <li>{item.techname}</li>
                                                <li>{item.sizename}</li>
                                                <li>{item.freshname}</li>
                                            </ul> */}
                                            <div className='accept'>
                                                <div className='posted'>
                                                    {timeAgo}
                                                </div>
                                                {
                                                    item.status === 'accepted' ? <h2>Accepted</h2> : <div>

                                                        <button className='approve' onClick={() => handlePress(item._id)}>Accept</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
