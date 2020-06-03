import React, { useState, useRef, useEffect } from 'react';
import {Alert, Container} from 'react-bootstrap'
import { Interactions } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';

const StyledOrderCoffee = () => {
  const [msg, setMsg] = useState('')
  const [chat, setChat] = useState({
    finalMessage: '',
    messages: [{id: uuidv4(),
      message: "Hello, what kind of coffee would you like today?",
      senderName:'robot'
    }]
  })
  const { finalMessage, messages} = chat;

  useEffect(() => {
    scrollToBottom()
  }, [messages.length])

  const _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitMessage()
    }
  }
  
  const onChange =(e)=> {
    setMsg(e.target.value)
  }

  const submitMessage = async () => {
    if (msg === '') return
    const message = {
      id: uuidv4(),
      message: msg,
      senderName: 'user'
    }

    let messages = [...chat.messages, message]
    setMsg('')
    setChat({
      ...chat,
      messages
    })

    const response = await Interactions.send("CoffeeBot_dev", msg);
    const responseMessage = {
      id: uuidv4(),
      message: response.message,
      senderName: 'robot'
    }

    setChat({
      ...chat,
      messages: [ ...messages, responseMessage]
    })
  }

    const background = (senderName) => {
      return (senderName === 'robot') ? 'secondary' : 'success'
    }

    const textAlign=(senderName) => {
      return (senderName === 'robot') ? 'p-2 float-left' : 'p-2 float-right'
    }

    const height = window.screen.height * 0.65
    const width = window.screen.width * 0.5

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({bahavior: 'smooth'})
    }

    return (
      <Container className='mt-2' style={{height: height, width: width, overflow:'scroll'}}>
          <h2 className='text-danger'>{finalMessage}</h2>
          <div> 
            {messages.map(msg => (
              <div key={msg.id} className='clearfix'>
              <Alert variant={background(msg.senderName)} className={textAlign(msg.senderName)} style={{maxWidth: '80%'}}> 
                {msg.message}
              </Alert>
              </div>
            ))}
          </div> 
          <input 
            className='form-control fixed-bottom mx-auto mb-3' 
            onKeyPress={_handleKeyPress}
            onChange={onChange}
            value={msg}
            style={{width: width}}
          />
          <div ref={messagesEndRef} type='text'/>
      </Container>
    );
}

export default StyledOrderCoffee