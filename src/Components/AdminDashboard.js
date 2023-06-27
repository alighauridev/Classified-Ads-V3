import React, { useState } from 'react';
import './AdminDashboard.scss'
import { BiSolidDashboard, } from 'react-icons/bi'
import { BsBag } from 'react-icons/bs'
import { AiOutlineUsergroupDelete } from 'react-icons/ai'
import { adminpakage, request } from './Data';
import { getpakage } from '../http/Services';
import axios from "../http/axiosSet"
const AdminDashboard = ({ products, handlePress }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [pakage, setpakage] = useState([]);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    //fetch categories
    const fetchpakage = async () => {
        try {
            const resp = await getpakage();
            if (resp.status === "OK") setpakage(resp.data);
        } catch (err) {
            console.log(err);
        }
    };
    fetchpakage();

    return (
        <div className={`dashboard ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="sidebar">
                <div className="sidebar-header">
                    <img src="./images/logo.png" alt="" />
                </div>
                <ul className="sidebar-menu" >
                    <div className="sidebar-menu-parent" style={{ background: '#FC5018' }}>
                        <div className="sidebar-menu-sub">
                            <span style={{ color: 'white' }}><BiSolidDashboard /></span>
                            <li style={{ color: 'white' }}>Dashboard</li>
                        </div>
                    </div>

                    <div className="sidebar-menu-parent">
                        <div className="sidebar-menu-sub">
                            <span><BsBag /></span>
                            <li>Orders</li>
                        </div>
                    </div>

                    <div className="sidebar-menu-parent">
                        <div className='sidebar-menu-sub'>
                            <span><AiOutlineUsergroupDelete /></span>
                            <li>Users</li>
                        </div>
                    </div>
                </ul>
                {/* <div className="sidebar-toggle" onClick={toggleSidebar}>
                    {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                </div> */}
            </div>
            <div>
                <div className='main-content-parent'>
                    <div className="main-content">
                        <h1>Dashboard</h1>
                        <h3>Pricing Plans</h3>
                        <p>
                            Start building for free, then add a site plan to go live. Account plans unlock additional features.
                        </p>


                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                        {
                            adminpakage.map((item) => {
                                return (
                                    <div className='card-parent'>
                                        <div>
                                            <h3>{item.h3}</h3>
                                            <p>{item.para}</p>
                                            <div className='price'>
                                                <h1>{item.price}</h1>
                                                <span>/mo</span>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', justifyContent: 'center', gap: '10px' }}>
                                                <input type="number" placeholder='Edit your price' style={{ width: '100%', border: '1px solid rgb(128, 128, 128)', outline: 'none', borderRadius: '4px', padding: '0 10px' }} />
                                                <button onClick={fetch}>Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='request-card-parent-main'>
                        {
                            products.map((item) => {
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
                                                    <h3>Posted</h3>
                                                    <p>1 Hour</p>
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
                    <div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
