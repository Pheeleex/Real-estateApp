import { Manor, manor2 } from '@/utils'
import Image from 'next/image'
import React from 'react'

const About2 = () => {
  return (
    <section className='mission mb-[10rem]'>
      <div className="about2">
        <div className="content">
          <h2>Oyster Property Invest</h2>
          <p>
            Our approach is simple, transparent, and ideal for certified investors looking to invest in the UK property market without the tie of a buy-to-let and benefit from the potential offered by this vibrant market.
          </p>
          <p>
            We're proud of our successes. Since launching in mid-2019, we've provided 11 investment offerings with a total Gross Development Value of almost £400m.
          </p>
          <p>We have repaid over £380m to our lenders over the past 10 years.</p>
          <button>See How it works</button>
        </div>
        <div className="image-box">
          <Image src={Manor} alt='how we work' className='img'/>
        </div>
      </div>
      <div className="about2">
        <div className="image-box">
          <Image src={manor2} alt='how we work' className='img' />
        </div>
        <div className="content">
          <h2>Our Mission Statement</h2>
          <p>
            Our approach is simple, transparent, and ideal for certified investors looking to invest in the UK property market without the tie of a buy-to-let and benefit from the potential offered by this vibrant market.
          </p>
          <p>
            We're proud of our successes. Since launching in mid-2019, we've provided 11 investment offerings with a total Gross Development Value of almost £400m.
          </p>
          <p>We have repaid over £380m to our lenders over the past 10 years.</p>
        </div>
      </div>
    </section>
  )
}

export default About2
