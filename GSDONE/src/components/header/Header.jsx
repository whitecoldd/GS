import React from 'react'
import "./header.css";

import Logo from "../../assets/img/Logo.png";
import { useState } from 'react';

import AnchorLink from 'react-anchor-link-smooth-scroll'

export default function Header() {

    let [openNav, setopenNav] = useState(false)



    return (
        <header className="header">
            <div className="header_w">
                <div className="header_logo">
                    <img src={Logo} alt="" />
                </div>
                <nav className={(openNav) ? "nav show" : "nav"}>
                    <ul>
                        <li><AnchorLink href="#Multiply" onClick={() => setopenNav(false)}><span>Multiply Gift</span></AnchorLink></li>
                        <li><AnchorLink href="#howitworks" onClick={() => setopenNav(false)}><span>How it works?</span></AnchorLink></li>
                        <li><AnchorLink href="#table" onClick={() => setopenNav(false)}><span>Exchange History</span></AnchorLink></li>
                    </ul>
                </nav>

                <div className={(openNav) ? "header_burger displayNone" : "header_burger"} onClick={() => setopenNav(true)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={(openNav) ? "header_burger close" : "header_burger close displayNone"} onClick={() => setopenNav(false)}>
                    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.798828" y1="10.4926" x2="10.4917" y2="0.799707" stroke="#fff" strokeLinecap="round" />
                        <line x1="1.50593" y1="0.799805" x2="11.1988" y2="10.4927" stroke="#fff" strokeLinecap="round" />
                    </svg>
                </div>
            </div>
        </header>
    )
}
