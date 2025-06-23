import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {RiMoonClearFill, RiSunFill} from 'react-icons/ri'
export default function (props) {
    let {darkMode, toggleDarkMode} = props
    const location = useLocation()
    const currentTab = location.pathname
    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Logout', path: '/logout' },
    ]


    const NavItem = ({ label, path }) => {
        const classes = "px-2 lg:px-4 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:bg-clip-text hover:text-transparent"
        let isActive = currentTab === path;
        return (
            <li>
                <Link to={path}>
                    <a className={isActive ? classes + "font-bold" : classes}>
                        {label}
                    </a>
                </Link>
            </li>
        )
    }

    return (
        <nav>
            <div className={`mx-auto w-screen px-6 py-2 flex justify-between items-center bg-white/10 rounded-md backdrop-blur-sm border-b border-white/20`}>
                <a className="font-bold text-2xl lg:text-4xl text-white" href="#">
                    daydream
                </a>
                <div className="lg:block">
                    <ul className="inline-flex  items-center">
                        {navItems.map((item, index) => (
                            <NavItem key={index} label={item.label} path={item.path} />
                        ))}                                
                    </ul>
                </div>
            </div>
        </nav>
    )
}
