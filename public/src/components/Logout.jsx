import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {BiPowerOff} from "react-icons/bi";

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async ()=>{
        localStorage.clear();
        navigate("/login");
    }
    return (
        <Button onClick={handleClick} >
            <BiPowerOff className='sign'/>
            <div className="text">Logout</div>
        </Button>
    )
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 20%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(255, 65, 65);
    .sign{
        width: 100%;
        height: 16px;
        transition-duration: .3s;
        display: flex;
        align-items: center;
        justify-content: center;
        fill: white;
    }
    .text {
        position: absolute;
        right: 0%;
        width: 0%;
        opacity: 0;
        color: white;
        font-size: 1.2em;
        font-weight: 600;
        transition-duration: .3s;
    }
    &:hover{
        width: 125px;
        border-radius: 40px;
        transition-duration: .3s;
    }
    &:hover .sign {
        width: 30%;
        transition-duration: .3s;
        padding-left: 20px;
    }
    &:hover .text {
        opacity: 1;
        width: 70%;
        transition-duration: .3s;
        padding-right: 25px;
    }
`;
