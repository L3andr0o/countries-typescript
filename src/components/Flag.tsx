import React from 'react';
import styled from 'styled-components';
import country from '../types/country';



const Wrapper = styled.div`
    width: 15em;
    height: fit-content;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    margin: 20px;
    color: #fff;
    background-color: hsl(209, 23%, 22%);

    .flag-img{
        width: 100%;
        height: 10em;
        
        img{
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
    }
    .flag-info{
        width: 100%;
        padding: 20px 15px 40px 15px;
        h1{
            font-size: 18px;
            margin-bottom: 10px;   
        }
        h2{
            font-size: 14px;
            font-weight: 600;
            span{
                font-weight: 300;
            }
        }
    }
`

export default function Flag(props: country){
    return(
        <Wrapper>
            <div className='flag-img'>
                <img src={props.flags.svg} alt={props.name.common} />
            </div>
            <div className='flag-info'>
                <h1>{props.name.common}</h1>
                <h2>Population: <span>{props.population}</span></h2>
                <h2>Region: <span>{props.region}</span></h2>
                <h2>Capital: <span>{props.capital}</span></h2>
            </div>
        </Wrapper>
    )
}