import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from "emoji-picker-react"
import { IoMdSend } from "react-icons/io"
import { BsEmojiSmileFill } from "react-icons/bs"

export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker,setShowEmojiPicker] = useState(false);
    const [msg,setMsg] = useState("");

    const handleEmojiPickerHideShow = () =>{
        setShowEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick = (event,emoji) =>{
        // console.log(emoji);
        let message = msg;
        message += event.emoji;
        setMsg(message);
    };

    const sendChat = (event) =>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('')
        }
    }

    return (
        <Container>
            <div className='button-container'>
                <div className='emoji'>
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {/* Show emojis when clicked */}
                    {
                        showEmojiPicker && 
                        <Picker 
                            onEmojiClick={handleEmojiClick} 
                            searchDisabled="false"  
                            emojiStyle="google"
                            previewConfig={{
                                showPreview: false,
                            }}
                            height={350}
                        />
                    }
                </div>
            </div>
            <form className='input-container' onSubmit={(e)=>sendChat(e)}>
                <input 
                    className='send-input' 
                    type='text' 
                    placeholder='Type a message' 
                    value={msg} onChange={(e) => setMsg(e.target.value)} 
                />
                <button className='submit'>
                    <IoMdSend className='SendSVG'/>
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    padding: 0 2rem;
    background-color: #40414F;
    box-shadow: 0px 0px 5px -3px #111;
    border-radius: 10px;
    .button-container{
        display: flex;
        align-items: center;
        color: white;
        .emoji{
            position: relative;
            svg{
                font-size: 1.4rem;
                fill: #84D65A;
                cursor: pointer;
            }
            .EmojiPickerReact{
                position: absolute;
                top: -380px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9186f3;
                .epr-emoji-category-label{
                    background-color: #080420;
                }
            }
        }
    }
    .input-container{
        width: 100%;
        display: flex;
        gap: 3rem;
        justify-content: center;
        height: 60%;
        input{
            width: 90%;
            background-color: transparent;
            border: none;
            color: white;
            padding: 1rem;
            font-size: 1.3rem;
            &::selection{
                background-color: #2C3333;
            }
            &::placeholder{
                font-size: 1rem;
            }
            &:focus{
                outline: none;
            }
        }
        button{
            display: flex;
            align-items: center;
            background-color: transparent;
            border: none;
            cursor: pointer;
            svg{
                font-size: 1.3rem;
                fill: #828E9E;
            }
        }
    }
`;
