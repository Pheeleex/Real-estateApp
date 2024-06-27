import { Manor } from '@/utils'
import Image from 'next/image'
import React from 'react'

const Outro = () => {
  return (
    <section class="outro w-full h-[40rem]">
    <div class="outro-cont w-full h-full">
        <div class="image-box w-full h-[40rem]">
            <Image src={Manor} 
                className='w-full h-[35rem]'
                alt='manor'
            />
        </div>
    </div>
</section>
  )
}

export default Outro