import React, { useState } from 'react';
import './AdminDashboard.scss'
import { BiSolidDashboard, } from 'react-icons/bi'
import { BsBag } from 'react-icons/bs'
import { AiOutlineUsergroupDelete } from 'react-icons/ai'
import { adminpakage } from './Data';
const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`dashboard ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="sidebar">
                <div className="sidebar-header">
                    <img src="./images/logo.png" alt="" />
                </div>
                <ul className="sidebar-menu" >
                    <div className="sidebar-menu-parent" style={{ background: '#72CC5A' }}>
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
                <div className="sidebar-toggle" onClick={toggleSidebar}>
                    {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                </div>
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
                                            <h3>Gold Plan</h3>
                                            <p>All the gold starting from the new business</p>
                                            <div className='price'>
                                                <h1>$12</h1>
                                                <span>/mo</span>
                                            </div>
                                            <div style={{display:'flex',justifyContent:'center'}}>
                                            <button>Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div style={{padding:'40px 0'}}>
                        <img src="./images/frame.png" alt="" width={'100%'} />
                    </div>
                    <div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
