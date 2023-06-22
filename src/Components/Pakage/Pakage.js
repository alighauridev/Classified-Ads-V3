import React from "react";
import "./Pakage.scss";
import Navbar from "../Navbar";
import { adspakage, pakagesidebar } from "../Data";
import Footer from "../Footer/Footer";
const Pakage = () => {
    return (
        <div className="pakage-parent">
         
            <div className="pakage-sub-parent">
                <div>
                    <h1 className="pakage-title">
                        Choose the plan in Property that works for you
                    </h1>
                </div>
                <div className="pakage-grid">
                    <div className="pakage-side-item">
                        {pakagesidebar.map((item) => {
                            return (
                                <h1>{item.title}</h1>
                            );
                        })}
                    </div>
                  <div>
                  <div className="adspakage-card">
                        {
                            adspakage.map((items) => {
                                return (
                                    <div>
                                        <div className="title" id={items.id}>
                                            <h1>{items.title}</h1>
                                        </div>
                                        <div className="month">
                                            <h1>{items.month}</h1>
                                        </div>
                                        <div className="ads-limit">
                                            <h1>{items.adslimit}</h1>
                                        </div>
                                        <div className="ads-list">
                                            <h1>{items.adslist1}</h1>
                                            <h1>{items.adslist2}</h1>
                                            <h1>{items.adslist3}</h1>
                                            <h1>{items.adslist4}</h1>
                                            <h1>{items.adslist6}</h1>
                                            <h1>{items.adslist5}</h1>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                 <div style={{padding:'60px 0'}}>
                 <center><h1>Do you want to pay without card?s</h1></center>
                    <div style={{display:'flex',justifyContent:'center',padding:'20px'}}>
                        <button>Boost Enterprise Mini: Property 3 months</button>
                        <button style={{border:'2px solid #00B53F',color:'#00B53F'}}>Get payment details</button>
                    </div>
                 </div>
                  </div>
                    <div></div>
                </div>
              
            </div>
        
        </div>
    );
};

export default Pakage;
