import React, { Fragment } from 'react'
import './Footer.scss'
import app from '../../assets/app.png'
import play from '../../assets/play (2).png'
import {FaFacebook,FaLinkedinIn} from 'react-icons/fa'
import {BsInstagram} from 'react-icons/bs'
import {AiOutlineTwitter} from 'react-icons/ai'
const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              {/* <h4>company</h4> */}
              <ul>
                <li><a href="#">About more</a></li>
                <li><a href="#">We are hiring</a></li>
                <li><a href="#">Terms & Condiotions</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Billing Policy</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">Copyright infringement Policy</a></li>
              </ul>
            </div>
            <div className="footer-col">
              {/* <h4>get help</h4> */}
              <ul>
                <li><a href="#">support@more.ng</a></li>
                <li><a href="#">Safety tips</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">payment options</a></li>
              </ul>
            </div>
            <div className="footer-col">
              {/* <h4>get help</h4> */}
          <img src={app} alt="" />
          <img src={play} alt="" />
            </div>
            <div className="footer-col">
              {/* <h4>online shop</h4> */}
              <ul>
                <li><a href="#">Our blog</a></li>
                <li><a href="#">More on FB</a></li>
                <li><a href="#">Our Instagram</a></li>
                <li><a href="#">Our Twitter</a></li>
                <li><a href="#">Our YouTube </a></li>
              </ul>
            </div>
            <div className="footer-col">
              {/* <h4>online shop</h4> */}
              <ul>
                <li><a href="#">Brand</a></li>
                <li><a href="#">Regions</a></li>
                <li><a href="#">Our Instagram</a></li>
                <li><a href="#">More Africa</a></li>
               
              </ul>
            </div>
            {/* <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <a href="#"><FaFacebook/></a>
                <a href="#"><BsInstagram/></a>
                <a href="#"><FaLinkedinIn/></a>
                <a href="#"><AiOutlineTwitter/></a>
              </div>
            </div> */}
          </div>
        </div>
     
      </footer>
      <div>
          <center><h4 style={{color:'white',background:'#787878',padding:'10px  0 10px 0'}}>Copyright All Rights Reserved More</h4></center>
        </div>
    </Fragment>
  )
}

export default Footer