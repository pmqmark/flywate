import React from 'react'

const HeroSection = () => {
    return (
        <div className="md:h-[100vh] w-full">
            <video autoPlay muted loop src={"/home/video.mp4"} className="w-full h-full object-cover" />
        </div>
    )
}

export default HeroSection
