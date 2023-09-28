import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

// Login Function
function Login(){
    const navigate = useNavigate()
    const [values,setValues] = useState({
        username: "",
        password: "",
    })
    const toastOptions= {
        position: "bottom-right",
        autoClose: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    // If user is already logged in redirect to the chat page
    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
            navigate('/');
        }
    },[])

    const handleSubmit = async (event)=>{
        event.preventDefault();
        // Checking for succesfull register
        if(handleValidation()){
            // console.log("in validation", loginRoute);
            const {password,username} = values;

            // Seding to the API Routes on the server
            const {data} = await axios.post(loginRoute,{
                username,
                password,
            });

            // checking the status 
            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/");
            }
        }
    }

    // using toastify generating notification error alert
    const handleValidation = ()=>{
        const {password,username} = values;
        if (password === ""){
            toast.error("password and confirm password not same.", toastOptions);
            return false;
        }else if (username.length === ""){
            toast.error("Email & password is required",toastOptions);
            return false;
        }
        return true;
    }

    const handleChange = (event) =>{
        setValues({...values, [event.target.name]: event.target.value});
    }

    // Form Container
    return (
        <>
            <FormContainer>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>PulseTalk</h1>
                    </div>
                    <input 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    onChange={(e)=> handleChange(e)} 
                    min="3"
                    />
                    <input 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    onChange={(e)=> handleChange(e)} 
                    />
                    <button type="submit">Login</button>
                    <span>
                    Don't have an account?<Link to="/register"> Register</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
};

// Styling the form
const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items:center;
    background-color: rgba(17, 24, 39, 1);
    .brand{
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{
            height: 5rem;
        }
        h1{
            color: white;
        }
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus{
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button{
            background-color: rgba(167, 139, 250, 1);
            color: white;
            padding: 1rem 2rem;
            cursor: pointer;
            border: none;
            font-weight: bold;
            font-size: 1rem;
            text-transform: uppercase;
            border-radius: 0.4rem;
            transition: 0.5 ease-in-out;
            &:hover{
                background-color: #4e0eff;
            }
        }
        span{
            color: white;
            text-transform: uppercase;
            a{
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;

export default Login;