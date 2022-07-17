import React, { useState,useEffect } from "react";
import './Nav.css';


function Nav(){
    const [show, handleShow] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100){
                handleShow(true);
            }else handleShow(false);
        });
    },[]);

    //console.log(show);

    return(
        <div className={show===true?"nav nav_back":"nav"}>
            <h1 className="nav_logo">Chillflix</h1>
            <img className="nav_avatar"
             src="https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"
             alt="User Logo"
            />
        </div>
    );
}

export default Nav 