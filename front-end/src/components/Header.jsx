// import React from 'react'

import { assets } from "../Assest/assests";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const Header = () => {
    const {removeBg}=useContext(AppContext);
    const hangle=async()=>{
        const token = await window.Clerk.session.getToken();
        console.log(token);
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1 flex justify-center">
                <div className="shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden">
                    <video src={assets.video_banner} autoPlay loop muted className="w-full max-w-[400px] h-auto object-cover"/>

                </div>
            </div>
            <div className="order-1 md:order:2">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900mb=6 leading-tight">
                    The fastest <span className="text-blue-500">background eraser.</span>
                </h1>
                <br />
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    Transform your photos with our background remover app! Highlight your 
                    subject and create a transparent background, so you can place it in a 
                    variety of new design and destinations. Try it now and immerse your
                    subject in a completely different environment !!! 
                </p>
                
                <div>
                    <input type="file" accept="image/*" id="upload1" hidden onChange={(e)=>removeBg(e.target.files[0])} />
                    <label htmlFor="upload1" className="bg-black text-white front-medium px-8 py-4 rounded-full hover:opacity-90 transition-transform hover:scale-105 text-lg">
                        Upload your image
                    </label>
                    <button onClick={hangle}>TEST TOAST</button>
                </div>
            </div>
        </div>
    )
}

export default Header;
