'use client'
import { build1, build2, build3 } from "@/utils"
import Image from "next/image";
import Link from "next/link";
import CustomSlider from "@/Components/CustomSlider";
import { motion } from 'framer-motion';

const Hero = () => {
    const contentImages = [build1, build2, build3];   
    return (
        <section className="" aria-labelledby="hero-heading">
            <div className="flex flex-col lg:flex-row h-full justify-center items-center">
                {/* Content side */}
                <div className="w-full lg:w-1/2 h-full flex flex-col items-start justify-center p-16">
                    <span className="red_text_300 text-2xl">New Projects</span>
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
                    <Link href="/Products" className="btn mt-4 inline-block text-xl text-[#880808] bg-transparent border 
                        border-[#880808] py-2 px-12 hover:text-white hover:bg-[#880808] transition duration-1000">
                        Get started
                    </Link>
                </div>

                {/* Image side */}
                <div className="w-full lg:w-1/2 h-full lg:h-[90%]">
                    <CustomSlider
                      items={contentImages}
                      />
                </div>
            </div>
        </section>
    )
}

export default Hero;
