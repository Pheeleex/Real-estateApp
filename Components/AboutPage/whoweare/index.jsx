import Image from 'next/image'
import { Manor } from '@/utils'
import React from 'react'
import '../About.css'

const WhoWeAre = () => {
  return (
    <section className="about mt-3 mb-20 lg:mt-6 lg:mb-[10rem]">
          <div className="image-box relative 
          w-full h-[40rem] lg:h-[45rem]">
            <Image src={Manor} 
            className="w-full h-full max-h-full" 
            alt="About Oyster Property Invest" />
            <div className="text-overlay absolute 
            flex flex-col p-8">
              <h2 className='text-3xl lg:text-5xl'>About Oyster Property Invest</h2>
              <p>We're the fundraising arm of Oyster Property Group, one of the UK's leading medium-sized housebuilders.</p>
              <p>Oyster Property Group was established in 1995, following a successful track record of creating multi-award-winning homes across London and the South West of the UK we launched Oyster Property Invest in 2019.</p>
              <p>Oyster Property Group was established in 1995, following a successful track record of creating multi-award-winning homes across London and the South West of the UK we launched Oyster Property Invest in 2019.</p>
            </div>
          </div>
    </section>
  )
}

export default WhoWeAre