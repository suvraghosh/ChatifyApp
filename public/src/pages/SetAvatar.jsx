import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

// Creating Avatar Function
export default function SetAvatar() {
    const api = "https://api.multiavatar.com/45678945"
    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    // If user is want to set the avatar but not logged in then navigate the login page
    useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem("chat-app-user")) {
                navigate('/login');
            }
        };
        checkUser(); // Call the async function
    }, []);
    

    // Setting up profile picture
    const setProfilePicture = async () => {
        // If avatar is not selected showing an error msg
        if(selectedAvatar===undefined){
            toast.error("Please select an avatar", toastOptions);
        }else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image: avatars[selectedAvatar],
            });
            console.log(data)
            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user));
                navigate("/");
            }else{
                toast.error("Error setting avatar. Please try again", toastOptions);
            }
        }
    };

    // Hooks for setting up the avatar
    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                try {
                    const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                    const buffer = new Buffer(response.data);
                    data.push(buffer.toString("base64"));
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
            setAvatars(data);
            setIsLoading(false);
        };
    
        fetchData();  // Call the fetchData function
    }, []);
    

    return (
        <>
        {
            /* When loading show the loader gif then show avatar*/
            isLoading ? <Container>
                <img src={loader} alt="loader" className="loader" />
            </Container> : (
            
            /* Avatar Container */
            <Container>
                <div className="title-container">
                    <h1>
                        Pick an avatar as your profile picture.
                    </h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div key={index} className={`avatar 
                                    ${selectedAvatar === index ? "selected" : ""}`}
                                >
                                    <img src={`data:image/svg+xml;base64,${avatar}`}
                                        alt="avatar"
                                        onClick={() => setSelectedAvatar(index)}
                                    />
                                </div>
                            );
                        })}
                </div>
                <button className="submit-btn" onClick={setProfilePicture}>
                Set as Profile Picture
                </button>
            </Container>
            )}
            <ToastContainer />
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader{
        width: 300px;
        height: 300px;
        border: none;
    }
    .title-container{
        h1{
            color: white;
        }
    }
    .avatars{
        display: flex;
        gap: 2rem;
        .avatar{
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
            }
        }
        .selected{
            border: 0.4rem solid #fff;
        }
    }
    .submit-btn{
        background-color: #997af0;
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
`;