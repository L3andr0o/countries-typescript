import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import IndvCountry from "./IndvCountry";
import { useState } from "react";
import theme from "./types/theme";

export default function App(){

    const [chosenTheme, setChosenTheme] = useState<boolean>(true);

    const lightTheme : theme = {
        'color' : '#000',
        'bg1' : '#f0e8e8',
        'bg2' : '#fff',
        'hover' : '#ddd'
    }    
    const darkTheme : theme = {
        'color' : '#fff',
        'bg1' : 'hsl(207, 26%, 17%)',
        'bg2' : 'hsl(209, 23%, 22%)',
        'hover' : '#4f6b83'
    }

    const changeTheme = () : void =>{
        if(chosenTheme){ 
            setTheme(lightTheme);
            setChosenTheme(false);
            localStorage.setItem('theme','lightTheme')
            return
        }setTheme(darkTheme);
        setChosenTheme(true);
        localStorage.setItem('theme','darkTheme')

    }

    const savedTheme = () : theme => {
       
        if(localStorage.getItem('theme')){
            if(localStorage.getItem('theme') === 'darkTheme'){
                return darkTheme
            }return lightTheme
        }else{
            const pcTheme = window.matchMedia('(prefers-color-scheme: dark)');
            if(pcTheme.matches){
            return darkTheme
            }return lightTheme
        }
    }
    const [theme, setTheme] = useState<theme>(savedTheme());

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home changeTheme={()=> changeTheme()} theme={theme}/>}/>
                <Route path='/:name' element={<IndvCountry changeTheme={()=> changeTheme()} theme={theme}/>}/>
            </Routes>
        </BrowserRouter>
    )


}