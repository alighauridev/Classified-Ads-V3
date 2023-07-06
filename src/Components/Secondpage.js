import React, { useState } from 'react'
import './Secondpage.scss'
import Navbar from './Navbar'
import Banner from '../Pages/Homepage/Banner'
import Footer from './Footer/Footer'
import first from '../assets/1.png'
import second from '../assets/second.png'
import third from '../assets/3.png'
import four from '../assets/4.png'
import response from '../assets/response.png'

const Secondpage = () => {
  const imgs = [
    { id: 0, value: first },
    { id: 1, value: second },
    { id: 2, value: third },
    { id: 3, value: first },
    { id: 4, value: second },
    { id: 5, value: third },
  ]
  const [wordData, setWordData] = useState(imgs[0])
  const handleClick = (index) => {
    console.log(index)
    const wordSlider = imgs[index];
    setWordData(wordSlider)
  }
  return (
    <div className='back-second'>
      <Navbar />

      <div className='second-page-grid'>
        <div>
          <div className='ads-spec'>
            <span>All ads</span>
            <span>Vehicles</span>
            <span>Cars</span>
            <span>Porsche Cayyenne 2015 White Cars</span>
            <span style={{ color: '#6C8EA0' }}>Porsche Cayyene 2015 White</span>
          </div>
          <div className="main">
            <img src={wordData.value} height="300" width="500" />
            <div className='flex_row'>
              {imgs.map((data, i) =>
                <div className="thumbnail" key={i} >
                  <img className={wordData.id == i ? "clicked" : ""} src={data.value} onClick={() => handleClick(i)} height="70" width="100" />
                </div>
              )}
            </div>
          </div>
          <div className='detail'>
            <div className='car-model'>
              <h1>Porsche Cayenne 2015 White</h1>
              <span>8</span>
            </div>



            <div className='car-model-spec'>
              <div style={{ display: 'flex', gap: '30px' }}> <span>Promoted</span>
                <span>Posted 3 hours</span>
                <span>Lagos, Lekki</span></div>

              <div>
                <span>309 Views</span>
              </div>
            </div>
          </div>
        </div>
        <div className='grid-two'>

          <div className='reqquest'>
            <h1>₦ 4,400,000, Negotiable</h1>
            <button>Request call back</button>
          </div>



          <div className='response'>
            <div>
              <div className='flex'>
                <div>
                  <img src={response} alt="" />
                </div>
                <div>
                  <h3>
                    Crispals Limited
                  </h3>
                  <h4>
                    Typically replies within an hour
                  </h4>
                  <h4>2y 9m on more</h4>
                </div>
              </div>
              <button className='contact'>Start Chat</button>
              <button>Start Chat</button>
            </div>
          </div>



          <div className='tip'>
            <center>
              <h3>Saftey Tips</h3>
              <li>Remember don't send any pre-payment</li>
              <li>Remember don't send any pre-payment</li>
              <li>Remember don't send any pre-payment</li>
            </center>
          </div>
          <div className='rbort'>
            <button style={{ color: '#0AA7EB' }}>Mark unavailable</button>
            <button style={{ color: '#FC2533' }}>Report Abuse</button>
          </div>
          <div className='rbort'>
            <button style={{ color: '#FB5018', width: '100%', border: '2px solid #FB5018' }}>Mark unavailable</button>

          </div>
        </div>
        <div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Secondpage