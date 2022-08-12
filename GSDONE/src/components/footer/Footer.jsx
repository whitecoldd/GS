import React from 'react'
import "./footer.css"

import Logo from "../../assets/img/Logo.png"

export default function Footer() {
    return (
        <footer className="footer">
            <div className="header_w">
                <div className="header_logo">
                    <img src={Logo} alt=""/>
                </div>
                <div className="footer_copyright">® 2018-2022 Gift Space. All rights reserved.</div>
            </div>
        </footer>
    )
}