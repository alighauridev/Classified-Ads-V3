import React from 'react'
import footer from '../../assets/footer.png'
import app from '../../assets/app.png'
import play from '../../assets/play (2).png'
import './Footer.scss'
const Footer = () => {
  return (
    <div className='footer-paretn-back'>
      <div className='footer-grid'>
        <div>
          <h1>About more</h1>
          <h1>We are hiring!</h1>
          <h1>Terms & Conditions</h1>
          <h1>Privacy Policy</h1>
          <h1>Billing Policy</h1>
          <h1>Cookie Policy</h1>
          <h1>Cookie Policy</h1>
          <h1>Copyright Infringement Policy</h1>
        </div>
        <div>
          <h1>support@more.ng</h1>
          <h1>Safety tips</h1>
          <h1>Contact Us</h1>
          <h1>FAQ</h1>
        </div>
        <div>
          <img src={app} alt="" />
          <img src={play} alt="" />
        </div>
        <div>

          <h1>Our blog</h1>
          <h1>more on FB</h1>
          <h1>Our Instagram</h1>
          <h1>Our YouTube</h1>
          <h1>Our Twitter</h1>


        </div>
        <div>
          <h1>Brand</h1>
          <h1>Regions</h1>
          <h1>More Kenya</h1>
        </div>
      </div>
    </div>
  )
}

export default Footer