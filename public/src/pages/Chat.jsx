import React, {useState, useEffect,useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Contacts from "../components/Contacts";
import { allUsersRoute,host } from "../utils/APIRoutes";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client";


function Chat(){
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts,setContacts] = useState([]);
    const [currentUser,setCurrentUser] = useState(undefined);
    const [currentChat,setCurrentChat] = useState(undefined);
    const [isLoaded,setIsLoaded] = useState(false);

    //If the user is new then navigate the login page
    useEffect(()=> {
        const checkUser = async () =>{
            if (!localStorage.getItem("chat-app-user")) {
                navigate('/login');
            }else{
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
                setIsLoaded(true);
            }
        }
        checkUser();
    },[])

    // Sockets
    useEffect(()=>{
        if(currentUser){
            socket.current = io(host);
            socket.current.emit("add-user",currentUser._id);
        }
    },[currentUser])

    useEffect(()=> {
        const curUser = async ()=>{
            if(currentUser){
                if(currentUser.isAvatarImageSet){
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                }else{
                    navigate("/setAvatar");
                }
            }
        }
        curUser();
    },[currentUser]);

    const handleChatChange = (chat)=>{
        setCurrentChat(chat);
    }

    return (
    <Container>
        <div className="container">
        {/* User Contacts */}
        <Contacts 
            contacts={contacts} 
            currentUser={currentUser} 
            changeChat={handleChatChange}
        />

        {/* Conditionally Welcome User or show the existing chats if user loaded */}
        {
            isLoaded && currentChat === undefined ?
            (<Welcome 
                currentUser={currentUser} 
            />)
            :
            (<ChatContainer 
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
            />)
        }
        </div>
    </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    with: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #080202;
    .container{
        height: 85vh;
        width: 85vw;
        background-color: #352F44;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width:1080px){
            grid-template-columns: 35% 65%;
        }
    }
`;

export default Chat;