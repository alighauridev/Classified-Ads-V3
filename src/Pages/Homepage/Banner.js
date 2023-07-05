import React from 'react'
import '../../Components/Scss/Home/Banner.scss'
import banner from '../../assets/880 (1).png'
import {AiOutlineSearch} from 'react-icons/ai'
const Banner = () => {
  return (
    <div>

      <div className='banner-parent-back'>
        <div className='banner-grid'>
      
          <div className='search' >
            <div className='cunty' style={{margintop:'-5px'}}>
              <h1>For Anythings</h1>
          
             <h1>In <span>Kenya</span></h1>
            </div>
          <div style={{display:'flex',alignItems:'center',position:'relative'}}>
          <span style={{position:'absolute',left:'25px',color:'#B6A3AF',top:'48px'}}> <AiOutlineSearch/> </span><input type="text" placeholder='I am looking for...' />
          </div>
          </div>
          <div className='person'>
            <img src={banner} alt=""  />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner