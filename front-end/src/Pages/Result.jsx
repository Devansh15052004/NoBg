import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom";



const Result = () => {
    const {image,resultImage}=useContext(AppContext);
    const {navigate}=useNavigate();
    return (
        <div className="mx-4 my-3 lg:mx-44 mt14 min-h-[75vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                    <p className="font-semibold text-gray-600 mb-2">
                    Original</p>
                        <img src={image ? URL.createObjectURL(image):""} alt="bg" className="rounded-md w-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <p className="font-semibold text-gray-600 mb-2">
                        Background Removed
                    </p>
                    <div className="rounded-md border border-black h-full bg-layer relative overflow-hidden">
                        <img src={resultImage ? resultImage:""} alt="" className="w-full object-cover"/>
                        {
                            !resultImage && image && 
                        (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="border-4 border-blue-600 rounded-full h-12 w-12 border-t-transparent animate-spin">

                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {
                resultImage && (
                    <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6">
                        <button className="border text-blue-600 font-semibold py-2 px-4 rounded-full text-lg hover:scale-105 transition-all duration-300" onClick={navigate("/")}>
                            Try another image       
                        </button>
                        <a href={resultImage} download className="cursor-pointer py-3 px-6 text-center text-white font-semibold rounded-full bg-gradient-to-r from-purple-500 to to-blue-600 shadow-lg hover:to-blue-500 transition duration-300 ease-in-out transform hover:scale-105">
                            Download Image
                        </a>
                    </div>
                )
            }
        </div>
    )
}

export default Result;
