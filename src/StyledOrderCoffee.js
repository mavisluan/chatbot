import React, { Component } from 'react';
import {Alert, Container} from 'react-bootstrap'
import { Interactions } from 'aws-amplify';
import { Message } from 'react-chat-ui'

class StyledOrderCoffee extends Component {
  state = {
    input: '',
    finalMessage: '',
    messages: [
      new Message({
        id: 1,
        message: "Hello, how can I help you today?",
        senderName:'robot'
      })
    ]
  }
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitMessage()
    }
  }
  onChange(e) {
    const input = e.target.value
    this.setState({
      input
    })
  }

  async submitMessage() {
    const { input } = this.state
    if (input === '') return
    const message = new Message({
      id: 0,
      message: input,
      senderName: 'user'
    })
    let messages = [...this.state.messages, message]

    this.setState({
      messages,
      input: ''
    })
    const response = await Interactions.send("CoffeeBot_dev", input);
    const responseMessage = new Message({
      id: 1,
      message: response.message,
      senderName: 'robot'
    })
    messages  = [...this.state.messages, responseMessage]
    this.setState({ messages })
  }

  render() {
    const background = (senderName) => {
      return (senderName === 'robot') ? 'secondary' : 'success'
    }

    const textAlign=(senderName) => {
      return (senderName === 'robot') ? 'p-2 float-left' : 'p-2 float-right'
    }

    const height = window.screen.height * 0.65

    return (
      <Container className='mt-5 clearfix text-center' style={{height: height, overflow:'scroll', width: '40rem'}}>
          <h2 className='text-danger'>{this.state.finalMessage}</h2>
          <div> 
            {this.state.messages.map((msg, index) => (
              <div key={index} className='clearfix'>
              <Alert  variant={background(msg.senderName)} className={textAlign(msg.senderName)} style={{maxWidth: '80%'}}> 
                {msg.message}
              </Alert>
              </div>
            ))}
          </div>
          <input
            onKeyPress={this._handleKeyPress}
            onChange={this.onChange.bind(this)}
            style={styles.input}
            value={this.state.input}
          />
      </Container>
    );
  }
}

const styles = {
  messagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    padding: 10,
    outline: 'none',
    width: 350,
    border: 'none',
    borderBottom: '2px solid rgb(0, 132, 255)'
  }
}

export default StyledOrderCoffee