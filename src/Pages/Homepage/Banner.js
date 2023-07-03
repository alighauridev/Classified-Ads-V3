import React from 'react'
import '../../Components/Scss/Home/Banner.scss'
import banner from '../../assets/880 (1).png'
const Banner = () => {
  return (
    <div>

      <div className='banner-parent-back'>
        <div className='banner-grid'>
      
          <div className='search'>
            <div className='cunty'>
              <h1>For Anythins</h1>
          
             <h1>In <span>Nigeria</span></h1>
            </div>
            <input type="text" placeholder='I am looking for...' />
          </div>
          <div className='person'>
            <img src={banner} alt="" style={{ marginTop: '60px', width: '130%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner