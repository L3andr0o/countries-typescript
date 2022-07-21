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
import nativeName from './types/nativeName';
import Spinner from './components/Spinner';
// import nativeName from './types/nativeName';

const Wrapper = styled.div`
    
    width: 100%;
    height: fit-content;
    min-height: 100vh;
    position: relative;
    background-color: ${({theme})=> theme.bg1};

    .content{
        width: 90%;
        margin: 20px auto;
        max-width: 875px;
        .back-button{
            width: 6em;
            background-color: ${({theme})=> theme.bg2};
            color:  ${({theme})=> theme.color};
            height: 2em;
            display: flex;
            align-items: center;
            padding: 0 15px;
            justify-content: space-evenly;
            box-shadow: 0px 2px 10px #110f0f;
            transition: background-color .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            &:hover{
                background-color:  ${({theme})=> theme.hover};
            }
        }

        .country{
            width: 100%;
            display: flex;
            flex-direction: column;
            @media (min-width: 768px){
                flex-direction: row;
                align-items: center;
                margin-top: 50px;
                justify-content: space-between;
            }
            img{
                width: 100%;
                max-width: 325px;
                height: 12em;
                margin: 20px auto;
                @media (min-width: 768px){
                margin: 0;
                height: 20em;
            }
            }
            .country-info{
                display: flex;
                flex-direction: column;
                @media (min-width:768px){
                    justify-content: space-between;
                    width: 50%;
                }
                h1{
                font-size: 20px;
                color:  ${({theme})=> theme.color};
                }
                .border-countries{
                    display: flex;
                    flex-wrap: wrap;
                    color:  ${({theme})=> theme.color};
                    margin-top: 10px;
                    width: fit-content;
                    align-items: center;
                    justify-content: space-between;
                    @media (min-width:768px){
                        margin-top: 20px;
                    }
                    h3{
                        font-size: 16px;
                        font-weight: 600;
                    }
                    div{
                        display: flex;
                        max-width: 355px;
                        justify-content: left;
                        flex-wrap: wrap;
                        span{
                            width: fit-content;
                            min-width: 4em;
                            margin: 10px;
                            text-align: center;
                            font-size: 14px;
                            box-shadow: 1px 1px 5px #111;
                            padding: 5px;
                        }
                    }
                }
                .country-detail-info{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    @media (min-width: 768px){
                    flex-direction: row;
                    }
                    div{
                        margin-top: 10px;
                        h2{
                            font-size: 14px;
                            color:  ${({theme})=> theme.color};
                            font-weight: 600;
                            line-height: 25px;
                            text-overflow: clip;
                            @media (min-width: 768px){
                                font-size: 12px;
                            }
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

export default function IndvCountry(props : any){

    const { name } = useParams();
    const [countryIndv, setCountryIndv] = useState<country | null> (null);
    const [currencies, setCurrencies] = useState<Array<string>>([]);
    const [languages, setLenguages] = useState<Array<string>>([]);
    const [nativeName, setNativeName] = useState<string>('');
    const numberFormat = new Intl.NumberFormat('en-US');
    

    useEffect(()=>{
        getName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getName = async () =>{
        try{
        const res = await axios(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const country : country[] = res.data;
        setCountryIndv(country[0]);
        
        const nativeName : nativeName[] = (Object.values(res.data[0].name.nativeName));
        setNativeName(Object.values(nativeName[0])[1]);
        
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
        })}catch(e){
            console.log(e);
            setCountryIndv(null)
        }
    }

    

    return(
        <Wrapper theme={props.theme}>
            <GlobalStyles />
            <Navbar func={props.changeTheme} theme={props.theme}/>
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
                <Spinner />
                :
                
                <div className='country'>
                    <img src={countryIndv.flags.svg} alt={countryIndv.name.common} className='flag'/>
                    <div className='country-info'>
                        <h1>{countryIndv.name.common}</h1>
                        <div className='country-detail-info'>
                            <div>
                                <h2>Native Name: <span>{nativeName}</span></h2>
                                <h2>Population: <span>{numberFormat.format(countryIndv.population)}</span></h2>
                                <h2>Region: <span>{countryIndv.region}</span></h2>
                                <h2>Sub Region: <span>{countryIndv.subregion}</span></h2>
                                <h2>Capital: <span>{countryIndv.capital}</span></h2>
                            </div>
                            <div>
                                <h2>Top Level Domain: <span>{countryIndv.tld}</span></h2>
                                <h2>
                                    Currencies:<span>{currencies.map((c : string)=>{return `, ${c}`})}</span>
                                </h2>
                                <h2 className='languages'>
                                    Languages:<span>{languages.map((l : string)=>{return `, ${l}`})}</span>
                                </h2>
                            </div>
                        </div>
                        <div className='border-countries'>
                            <h3>Borders Countries:</h3>
                            <div>
                                {
                                 (!countryIndv.borders) ?
                                 <span> There's no borders</span>
                                 :
                                 countryIndv.borders.map((b)=> {return <span key={b}>{b}</span>})
                                }
                            </div>
                        </div>
                    </div>
                </div>

                }
            </div>
        </Wrapper>
    )
}