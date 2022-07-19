import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import country from './types/country'
import styled from 'styled-components';
import GlobalStyles from './assets/GlobalStlyes';
import Navbar from './components/Navbar';
import {BsArrowLeft} from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    
    width: 100%;
    height: fit-content;
    min-height: 100vh;
    position: relative;
    background-color: hsl(207, 26%, 17%);

    .content{
        width: 90%;
        margin: 20px auto;

        .back-button{
            width: 6em;
            background-color: hsl(209, 23%, 22%);
            color: #fff;
            height: 2em;
            display: flex;
            align-items: center;
            padding: 0 15px;
            justify-content: space-evenly;
            box-shadow: 0px 2px 10px #110f0f;
        }

        .country{
            width: 100%;
            display: flex;
            flex-direction: column;
            img{
                width: 100%;
                max-width: 325px;
                height: 12em;
                margin: 20px auto;
            }
            .country-info{
                display: flex;
                flex-direction: column;
                h1{
                font-size: 20px;
                color: #fff;
                }
                .border-countries{
                    display: flex;
                    flex-wrap: wrap;
                    color: #fff;
                    margin-top: 10px;
                    width: fit-content;
                    align-items: center;
                    justify-content: space-between;
                    h3{
                        font-size: 16px;
                        font-weight: 600;
                    }
                    div{
                        display: flex;
                        max-width: 355px;
                        justify-content: space-between;
                        ;
                        span{
                            width: fit-content;
                            min-width: 4em;
                            margin: 10px;
                            text-align: center;
                            font-size: 14px;
                            box-shadow: 1px 1px 5px #111;
                            padding: 5px 0;
                        }
                    }
                }
                .country-detail-info{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    div{
                        margin-top: 10px;
                        h2{
                            font-size: 14px;
                            color: #fff;
                            font-weight: 600;
                            line-height: 25px;
                            span{
                                font-weight: 300;
                            }
                        }
                    }
                }
            }
        }
    }
`

export default function IndvCountry(){

    const { name } = useParams();
    const [countryIndv, setCountryIndv] = useState<country | null> (null);
    const [currencies, setCurrencies] = useState<Array<string>>([]);
    const [languages, setLenguages] = useState<Array<string>>([]);
    const numberFormat = new Intl.NumberFormat('en-US');

    useEffect(()=>{
        getName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getName = async () =>{
        const res = await axios(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const country : country[] = res.data;
        setCountryIndv(country[0]);
        console.log(res.data[0])
        
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

                <Link to='/'>
                    <div className='back-button'>
                        <BsArrowLeft />
                        <span>Back</span>
                    </div>
                </Link>

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
                                <h2>Population: <span>{numberFormat.format(countryIndv.population)}</span></h2>
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
                        <div className='border-countries'>
                            <h3>Borders Countries:</h3>
                            <div>
                                <span>FRA</span>
                                <span>VE</span>
                                <span>GER</span>
                            </div>
                        </div>
                    </div>
                </div>

                }
            </div>
        </Wrapper>
    )
}