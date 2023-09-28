import axios from "axios";
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import Logout from './Logout';
import ChatInput from './ChatInput';
import {v4 as uuidv4} from "uuid";


export default function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage,setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id,
                });
                setMessages(response.data);
            } catch (error) {
                // Handle errors
                console.error('Error fetching messages:', error);
            }
        };
        fetchData(); // Call the async function immediately
    }, [currentChat]);


    // Send messages and save to the database
    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit("send-msg",{
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        setMessages(msgs);
    };

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                setArrivalMessage({fromSelf: false,message: msg});
            })
        }
    },[])

    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
    },[arrivalMessage]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    },[messages]);


    return (
        <>
            {/* If Current chat is there then show the container */}
            {
                currentChat && (
                    <Container>
                        <div className='chat-header'>
                            <div className='user-details'>
                                <div className='avatar'>
                                    <img
                                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                        alt="avatar"
                                    />
                                </div>
                                <div className='username'>
                                    <h3>{currentChat.username}</h3>
                                </div>
                            </div>
                            <Logout />
                        </div>

                        <div className="chat-messages">
                            {messages.map((message) => {
                                return (
                                    <div ref={scrollRef} key={uuidv4()}>
                                        <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                                            <div className="content">
                                                <p>{message.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <ChatInput handleSendMsg={handleSendMsg} />
                    </Container>
                )}
        </>
    );
}

const Container = styled.div`
padding: 1rem;
display: grid;
grid-template-rows: 10% 78% 12%;
gap: 0.1rem;
overflow: hidden;
    .chat-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2rem;
        .user-details{
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
                h3{
                    color: white;
                }
            }
        }
    }
    .chat-messages{
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color: #2C3333;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .message{
            display: flex;
            align-items: center;
            .content{
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: white;
            }
        }
        .sended{
            justify-content: flex-end;
            .content{
                background-color: green;
            }
        }
        .received{
            justify-content: flex-start;
            .content{
                background-color: #9900ff20;
            }
        }
    }
`;