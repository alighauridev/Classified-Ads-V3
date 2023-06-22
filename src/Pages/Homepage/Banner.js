import React from 'react'
import '../../Components/Scss/Home/Banner.scss'

const Banner = () => {
  return (
    <div>

      <div className='banner-parent-back'>
        <div className='banner-grid'>
          <div className='person'>
            <img src="./images/man.png" alt="" style={{ marginTop: '25px' }} />
          </div>
          <div className='search'>
            <div className='cunty'>
              <span>Find anythings in</span>
              <button>Nigeria</button>
            </div>
            <input type="text" placeholder='I am looking for...' />
          </div>
          <div className='person'>
            <img src='./images/girls.png' alt="" style={{ marginTop: '60px', width: '130%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner