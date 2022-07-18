import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Flag from "./components/Flag";
import { useState, useEffect } from "react";
import country from "./types/country"
import styled from "styled-components";
import GlobalStyles from "./assets/GlobalStlyes";
import Navbar from "./components/Navbar";

const Wrapper = styled.div`
    
    width: 100%;
    height: fit-content;
    min-height: 100vh;
    position: relative;
    background-color: hsl(207, 26%, 17%);
`

export default function IndvCountry(){

    const { name } = useParams();
    const [countryIndv, setCountryIndv] = useState<country | null> (null);

    useEffect(()=>{
        getName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getName = async () =>{
        const res = await axios(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const count : country[] = res.data;
        setCountryIndv(count[0])
    }

    return(
        <Wrapper>
            <GlobalStyles />
            <Navbar />
           {
            countryIndv === null
            ?
            <p>loading</p>
            :
            <Flag 
            name={countryIndv.name}
            population={countryIndv.population}
            region={countryIndv.region}
            capital={countryIndv.capital}
            flags={countryIndv.flags}
        />
           }
        </Wrapper>
    )
}