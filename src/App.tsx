import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import GlobalStyles from './assets/GlobalStlyes';
import { FaSearch } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Flag from './components/Flag';
import axios from 'axios';
import country from './types/country';
import Navbar from './components/Navbar';

interface TitleProps {
    readonly opt: string;
  }

const Wrapper = styled.div<TitleProps>`
    width: 100%;
    height: fit-content;
    min-height: 100vh;
    position: relative;
    background-color: hsl(207, 26%, 17%);
    
    .content{
        width: 90%;
        margin: 30px auto;

        .search{
            width: 100%;
            height: fit-content;
            display: flex;
            height: fit-content;
            justify-content: space-between;
            align-items: left;
            flex-direction: column;
            position: relative;
            
            
            #search-input{
                position: relative;
                width: 100%;
                max-width: 410px;
                height: 3.6em;
                border: none;
                outline: none;
                color: #fff;
                padding-right: 15px;
                padding-left: 50px;
                background-color: hsl(209, 23%, 22%);
                border-radius: 5px;
                transition: background-color .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                &::placeholder{
                    color: #fff;
                    font-size: 14px;
                    position: absolute;
                    top: calc(50% - 7px);
                    left: 50px;
                }
                &:focus{
                    background-color: #485c6e;
                }
            }
            label{
                position: absolute;
                left: 15px;
                z-index: 10;
                top: 16px;
                color: #fff;
            }

            .select{
                width: 60%;
                margin-top: 15px;
                max-width: 170px;
                .selected-option{
                    height: 3em;
                    color: #fff;
                    display: flex;
                    justify-content: space-between;
                    border-radius: 5px;
                    padding: 0 15px;
                    align-items: center;
                    background-color: hsl(209, 23%, 22%);
                    cursor: pointer;
                    transition: background-color .3s cubic-bezier(0.165, 0.84, 0.44, 1);
                    &:hover{
                        background-color: #485c6e;
                    }
                }
                .options{
                    margin-top: 5px;
                    background-color: hsl(209, 23%, 22%);
                    padding: 10px 0;
                    border-radius: 5px;
                    width: 60%;
                    max-width: 175px;
                    position: absolute;
                    z-index: 10;
                    display: none;
                    li{
                        padding: 5px 15px;
                        color: #fff;
                        cursor: pointer;
                        transition: background-color .3s cubic-bezier(0.165, 0.84, 0.44, 1);
                        &:hover{
                        background-color: #485c6e;
                        }
                    }
                }
                .selectActivate{
                    display: block;
                    transform: scale(0);
                    animation-name: appear;
                    animation-duration: .3s;
                    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    animation-fill-mode: forwards;
                }
                @keyframes appear {

                    100%{
                        transform: scale(1);
                    }
                }
            }

            .${(props)=> props.opt}{
                background-color: #4f6b83;
            }
        }
        .flags-container{
            width: 100%;
            position: relative;
            margin: 40px auto;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }
    }

`

function App() {

    const [selectedOpt, setSelectedOpt] = useState<string>('All');
    const [selectState, setSelectState] = useState<string>('');
    const [countriesList, setCountriesList] = useState<country[] | null>(null)

    useEffect(()=>{
        getFlags()
    },[])

    const defineSelectState = () : void =>{
        if(selectState === 'selectActivate'){
            setSelectState('');
            return
        }setSelectState('selectActivate')
    }

    const selectOption = (opt : string) : void =>{
        setSelectedOpt(opt);
        setSelectState('');
    }

    const getFlags = async ()=>{
        const res = await axios('https://restcountries.com/v3.1/all');
        const list : country[] = res.data;

        setCountriesList(list)  

    }
    

  return (
    <Wrapper opt={selectedOpt}>
        <GlobalStyles />

        <Navbar />

        <div className='content'>
            <div className='search'>

                <label htmlFor='search-input'><FaSearch /></label>
                <input type="text" placeholder='Search for a country...' id='search-input' autoComplete='off'/>

                <div className='select'>

                    <div className='selected-option' onClick={()=> defineSelectState()}>
                        <span>{selectedOpt}</span>
                        <MdKeyboardArrowDown />
                    </div>

                    <ul className={`options ${selectState}`}>
                        <li onClick={()=> selectOption('All')} className='All' >All</li>
                        <li onClick={()=> selectOption('Africa')} className='Africa' >Africa</li>
                        <li onClick={()=> selectOption('America')} className='America' >America</li>
                        <li onClick={()=> selectOption('Asia')} className='Asia' >Asia</li>
                        <li onClick={()=> selectOption('Europe')} className='Europe' >Europe</li>
                        <li onClick={()=> selectOption('Oceania')} className='Oceania' >Oceania</li>
                    </ul>
                </div>
                
            </div>

            <div className='flags-container'>
                {
                    countriesList === null 
                    ? <p>Loading</p>
                    : countriesList.map((c)=>(
                        <div key={c.name.common}>
                            <Flag 
                            name={c.name}
                            population={c.population}
                            region={c.region}
                            capital={c.capital}
                            flags={c.flags}
                            subregion={''}
                            tld={''}
                        />
                        </div>
                    ))
                }
            </div>      
        </div>
    </Wrapper>
  );
}

export default App;
