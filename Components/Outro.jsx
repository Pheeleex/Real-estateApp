import { Manor } from '@/utils'
import Image from 'next/image'
import React from 'react'

const Outro = () => {
  return (
<section className="outro">
      <div className="outro-cont">
        <div className="image-box">
          <Image 
            src={Manor} 
            className="image"
            alt="manor"
          />
        </div>
      </div>
    </section>
  )
}

export default Outro