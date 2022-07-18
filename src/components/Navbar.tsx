import React from "react";
import styled from "styled-components";
import { FaMoon } from "react-icons/fa";

const Nav = styled.div`
    display: flex;
    height: 5em;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background-color: hsl(209, 23%, 22%);
        h1{
            color: #fff;
            font-size: 14px;
        }
        span{
            color: #fff;
            font-size: 14px;
        }
`

export default function Navbar(){
    return(
        <Nav>
            <h1>Where in the world?</h1>
            <span className='theme-switcher'><FaMoon className='icon'/> Dark Mode</span>  
        </Nav>
    )
}