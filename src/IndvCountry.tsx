import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import country from './types/country'
import styled from 'styled-components';
import GlobalStyles from './assets/GlobalStlyes';
import Navbar from './components/Navbar';
import {BsArrowLeft} from 'react-icons/bs';

const Wrapper = styled.div`
    
    width: 100%;
    height: fit-content;
    min-height: 100vh;
    position: relative;
    background-color: hsl(207, 26%, 17%);

    .content{
        width: 90%;
        margin: 20px auto;

        .country{
            width: 100%;
            display: flex;
            flex-direction: column;
            img{
                width: 100%;
                max-width: 580px;
            }
            h1{
                font-size: 22px;
                color: #fff;
            }
        }
    }
`

export default function IndvCountry(){

    const { name } = useParams();
    const [countryIndv, setCountryIndv] = useState<country | null> (null);
    const [currencies, setCurrencies] = useState<Array<string>>([]);
    const [languages, setLenguages] = useState<Array<string>>([]);

    useEffect(()=>{
        getName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getName = async () =>{
        const res = await axios(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const country : country[] = res.data;
        setCountryIndv(country[0]);
     
        const rawCurrencies = (Object.values(res.data[0].currencies));
        const currencies : Array<string> = [];
        rawCurrencies.forEach((c : any )=>{
            currencies.push(c.name); 
            setCurrencies(currencies)
        })

        
        const rawLenguages = (Object.values(res.data[0].languages));
        const languages : Array<string> = [];
        rawLenguages.forEach((l : any)=>{
            languages.push(l);
            setLenguages(languages)
        })

    }

    return(
        <Wrapper>
            <GlobalStyles />
            <Navbar />
            <div className='content'>

                <div className='back-button'>
                    <BsArrowLeft />
                    <span>Back</span>
                </div>

                {
                countryIndv === null
                ?
                <p>loading</p>
                :
                
                <div className='country'>
                    <img src={countryIndv.flags.svg} alt={countryIndv.name.common} className='flag'/>
                    <div className='country-info'>
                        <h1>{countryIndv.name.common}</h1>
                        <div className='country-detail-info'>
                            <div>
                                <h2>Native Name: <span>{countryIndv.name.official}</span></h2>
                                <h2>Population: <span>{countryIndv.population}</span></h2>
                                <h2>Region: <span>{countryIndv.region}</span></h2>
                                <h2>Sub Region: <span>{countryIndv.subregion}</span></h2>
                                <h2>Capital: <span>{countryIndv.capital}</span></h2>
                            </div>
                            <div>
                                <h2>Top Level Domain: <span>{countryIndv.tld}</span></h2>
                                <h2>Currencies:<span>{currencies.map((c : string)=>{return ` ${c}`})}</span></h2>
                                <h2>Languages:<span>{languages.map((l : string)=>{return ` ${l}`})}</span></h2>
                            </div>
                        </div>
                    </div>
                </div>

                }
            </div>
        </Wrapper>
    )
}