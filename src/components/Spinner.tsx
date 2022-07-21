import React from "react";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 9px solid;
    border-color: #474bff #0000;
    animation: spinner-0tkp9a 1s infinite;
    margin: 80px auto;
    @keyframes spinner-0tkp9a {
    to {
           transform: rotate(.5turn);
        }
    }

`

export default function Spinner(){
    return(
        <SpinnerWrapper className='spinner'>

        </SpinnerWrapper>
    )
}