// import React from 'react'
import Header from '../components/Header'
import BgRemovalSteps from '../components/BgRemovalSteps'
import BgSlider from '../components/BgSlider'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import TryNow from '../components/TryNow'
// import Footer from '../components/Footer'
const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Header></Header>
            <BgRemovalSteps></BgRemovalSteps>
            <BgSlider></BgSlider>
            <Pricing></Pricing>
            <Testimonials></Testimonials>
            <TryNow></TryNow>
            {/* <br /> */}
            {/* <Footer></Footer> */}
        </div>

    )
}

export default Home
