// import React from 'react'/
import { assets, footer_constant } from "../Assest/assests";
const Footer = () => {
    return (
        <footer className="flex item-center justify-between gap-4 lg:px-44 py-3">
            
            <img src={assets.logo} alt="logo" width={32} />
            <p className="flex-1 border-l lorder-gray-100 max-sm:hidden">
                &copy; {new Date().getFullYear()} @REMOVE.BG | All rights reserved.
            </p>
            <div className="flex gap-3">
                {footer_constant.map((item,index)=>(
                    <a href={item.url} key={index} target="_blank" rel="nooperner noreferrer">
                        <img src={item.logo} alt="logo " width={32} />
                    </a>

                ))}
            </div>  
            
        </footer>
    )
}

export default Footer
