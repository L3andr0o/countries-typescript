import React from "react";
import styled from "styled-components";
import { FaMoon } from "react-icons/fa";



const Nav = styled.div`
    display: flex;
    height: 5em;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background-color: ${({theme})=> theme.bg2};
    @media (min-width:768px) {
        padding: 0 35px;
    }
        h1{
            color: ${({theme})=> theme.color};
            font-size: 14px;
        }
        span{
            color: ${({theme})=> theme.color};
            font-size: 14px;
            cursor: pointer;
        }
`

export default function Navbar(props : any){

    

    return(
        <Nav theme={props.theme}>
            <h1>Where in the world?</h1>
            <span className='theme-switcher' onClick={()=> props.func()}><FaMoon className='icon'/> Dark Mode</span>  
        </Nav>
    )
}