import React from 'react'
import Hero from './Hero'
import Services from './Services/Services'
import Portfolio from './Portfolio/Portfolio'
import Review from './Reviews/Reviews'



const Homepage = () => {
  return (
    <div>
        <Hero />
        <Services />
        <Portfolio />
        <Review />
    </div>
  )
}

export default Homepage