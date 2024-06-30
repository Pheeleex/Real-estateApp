'use client'
import { build1, build2, build3 } from "@/utils"
import Image from "next/image";
import Link from "next/link";
import CustomSlider from "@/Components/CustomSlider";


const Hero = () => {
    const contentImages = [build1, build2, build3];   
return(
    <section className="home mt-0 lg:mt-8 h-full" aria-labelledby="hero-heading">
        <div className="slide flex flex-col lg:flex-row
          justify-between items-center pt-8 lg:pt-20 p-0 md:p-8 h-full">
          <div className="flex-1 basis-[45%] pl-[1.4rem]  
            p-8 h-full flex flex-col items-start">
          <span className='red_text_300 text-2xl'>New Projects</span>
          <h3 className="red_text text-5xl font-bold"> 
            The future of property investing.
          </h3>
            <p className="text-black text-lg p-2 leading-[1.5]">
              Explore urban brilliance<br /> 
              with Oyster Properties offering a 
              diverse collection of dream homes and dynamic 
              workspaces that redefine luxury living and 
              workspace innovation. 
            </p>
          <Link href='/properties' className="btn mt-4 inline-block text-xl text-[#880808] bg-transparent border 
            border-[#880808] py-2 px-12 hover:text-white hover:bg-[#880808] transition duration-1000">
            Get started
          </Link>
          </div>
          <CustomSlider 
            items={contentImages}
            slideContClass='mt-10 lg:mt-0' />
      </div>
    </section>
)

}
export default Hero