// import React from 'react'

import { useContext } from "react"
import { AppContext } from "../context/AppContext"

const TryNow = () => {
    const {removeBg}=useContext(AppContext);
    return (
        <div className="flex flex-col items-center justify-center bg-white px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-7 text-center">
                Remove Image Background
            </h2>
            <p className="text-gray-600 mb-8 text-center">
                Get a transparent background for any image. 
            </p>
            <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col item-center space-y-4">
                <input type="file" id="upload2" hidden accept="image/*" onChange={(e)=>removeBg(e.target.files[0])} />
                <label htmlFor="upload2"
                    className="bg-blue-600 hover:bg-blue-700 text-center text-white font-semibold py-3 px-6 rounded-full text-lg">
                        Upload Image
                    </label>
                    <p className="text-gray-600 text-sm">
                        or drop a file, paste image or <a href="#" className="text-blue-500 underline">URL</a>
                    </p>
            </div>
        </div>
    )
}

export default TryNow
