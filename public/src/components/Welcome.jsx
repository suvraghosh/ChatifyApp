import React from 'react'
import styled from 'styled-components';
import Robot from "../assets/robot.gif";

// Showing the user Welcome Messages
export default function Welcome({ currentUser }) {
  return (
    <Container>
        <img src={Robot} alt="Robot" />
        <h1>
            Welcome, <span>{currentUser.username} !</span>
        </h1>
        <h3>Please select a chat to start Messaging</h3>
    </Container>
  );
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items:center;
flex-direction: column;
color: white;
line-height: 2.5rem;
img{
    height:20rem;
}
span{
    color: #B983FF;
}
`;