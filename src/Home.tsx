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
import { Link } from 'react-router-dom';
import Spinner from './components/Spinner';


interface TitleProps {
    readonly opt: string
  }

const Wrapper = styled.div<TitleProps>`
    width: 100%;
    height: fit-content;
    min-height: 100vh;
    position: relative;
    background-color: ${({theme})=> theme.bg1};
    
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
            
            
            @media (min-width:768px){
                flex-direction: row;
            }
            
            #search-input{
                position: relative;
                width: 100%;
                max-width: 410px;
                height: 3.6em;
                border: none;
                outline: none;
                color: ${({theme})=> theme.color};
                padding-right: 15px;
                padding-left: 50px;
                background-color: ${({theme})=> theme.bg2};
                border-radius: 5px;
                transition: background-color .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                &::placeholder{
                    color: ${({theme})=> theme.color};
                    font-size: 14px;
                    position: absolute;
                    top: calc(50% - 7px);
                    left: 50px;
                }
                &:focus{
                    background-color: ${({theme})=> theme.hover};
                }
            }
            label{
                position: absolute;
                left: 15px;
                z-index: 10;
                top: 16px;
                color: ${({theme})=> theme.color};
            }

            .select{
                width: 60%;
                margin-top: 15px;
                max-width: 170px;
                @media (min-width:768px){
                    margin: 0;
                }
                .selected-option{
                    height: 3em;
                    color: ${({theme})=> theme.color};
                    display: flex;
                    justify-content: space-between;
                    border-radius: 5px;
                    padding: 0 15px;
                    align-items: center;
                    background-color: ${({theme})=> theme.bg2};
                    cursor: pointer;
                    transition: background-color .3s cubic-bezier(0.165, 0.84, 0.44, 1);
                    &:hover{
                        background-color: ${({theme})=> theme.hover};
                    }
                }
                .options{
                    margin-top: 5px;
                    background-color: ${({theme})=> theme.bg2};
                    padding: 10px 0;
                    border-radius: 5px;
                    width: 60%;
                    max-width: 175px;
                    position: absolute;
                    z-index: 10;
                    display: none;
                    li{
                        padding: 5px 15px;
                        color: ${({theme})=> theme.color};
                        cursor: pointer;
                        transition: background-color .3s cubic-bezier(0.165, 0.84, 0.44, 1);
                        &:hover{
                        background-color: ${({theme})=> theme.hover};
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
                background-color: ${({theme})=> theme.hover};
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
            .link{
                margin: 20px;
            }
        }
    }

`




function Home(props : any) {

    const [selectedOpt, setSelectedOpt] = useState<string>('All');
    const [reqEndPoint, setReqEndPoint] = useState<string>('all');
    const [selectState, setSelectState] = useState<string>('');
    const [countriesList, setCountriesList] = useState<country[] | null >(null);
    const [searchValue, setSearchValue] = useState<string>('');
    

    useEffect(()=>{
        (searchValue?.length > 0)?
        getFlagsBySearch()
        :
        getFlags()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedOpt,searchValue])

    const defineSelectState = () : void =>{
        if(selectState === 'selectActivate'){
            setSelectState('');
            return
        }setSelectState('selectActivate')

    }

    const selectOption = (opt : string, ep : string) : void =>{
        setSelectedOpt(opt);
        setSelectState('');
        setReqEndPoint(ep)
    }

    const activateSearchBar = (e : any) =>{
        setSearchValue(e.target.value);  
    }

    const getFlags = async ()=>{
        setCountriesList(null) 
        const res = await axios(`https://restcountries.com/v3.1/${reqEndPoint}`);  
        const list : country[] = res.data;
        setCountriesList(list);
    }

    const getFlagsBySearch = async ()=>{
        try{
            setCountriesList(null)
            const res = await axios(`https://restcountries.com/v3.1/name/${searchValue}`);  
            const list : country[] = res.data;
            setCountriesList(list);
        }catch(e){
            console.log(e)
            setCountriesList(null)
        }
    }
    

  return (

    <Wrapper opt={selectedOpt} theme={props.theme}>
        <GlobalStyles />
        <Navbar func={props.changeTheme} theme={props.theme}/>

        <div className='content'>
            <div className='search'>

                <label htmlFor='search-input'><FaSearch /></label>
                <input type="text" placeholder='Search for a country...' id='search-input' autoComplete='off'
                onChange={e=> activateSearchBar(e)}/>

                <div className='select'>

                    <div className='selected-option' onClick={()=> defineSelectState()}>
                        <span>{selectedOpt}</span>
                        <MdKeyboardArrowDown />
                    </div>

                    <ul className={`options ${selectState}`}>
                        <li onClick={()=> selectOption('All','all')} className='All' >All</li>
                        <li onClick={()=> selectOption('Africa','region/africa')} className='Africa' >Africa</li>
                        <li onClick={()=> selectOption('America','region/america')} className='America' >America</li>
                        <li onClick={()=> selectOption('Asia','region/asia')} className='Asia' >Asia</li>
                        <li onClick={()=> selectOption('Europe','region/europe')} className='Europe' >Europe</li>
                        <li onClick={()=> selectOption('Oceania','region/oceania')} className='Oceania' >Oceania</li>
                    </ul>
                </div>
                
            </div>

            <div className='flags-container'>
                {

                

                    countriesList === null 
                    ? <Spinner />
                    : countriesList.map((c)=>(
                        <Link to={`/${c.name.common}`} key={c.name.common} className='link'>
                            <Flag 
                            name={c.name}
                            population={c.population}
                            region={c.region}
                            capital={c.capital}
                            flags={c.flags}
                            subregion={''}
                            tld={''}
                            borders={['']}
                            theme={props.theme}
                        />
                        </Link>
                    ))
                }
            </div>      
        </div>
        
    </Wrapper>
    
    
  );
}

export default Home;