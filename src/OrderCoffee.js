import React from 'react'
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';

const myTheme = {
    ...AmplifyTheme,
    sectionHeader: {
      ...AmplifyTheme.sectionHeader,
      backgroundColor: 'brown',
    },
  };
  
const StyledOrderCoffee = () => {
    const handleComplete = (err, confirmation) => {
        if (err) {
          alert('Bot conversation failed')
          return;
        }
        console.log('Confirmation', confirmation)
        alert('Success: ' + JSON.stringify(confirmation, null, 2));
        return 'Coffee order placed. Thank you! what would you like to do next?';
      }
    return (
        <ChatBot
        title="My Bot"
        theme={myTheme}
        botName="CoffeeBot_dev"
        welcomeMessage="Welcome, how can I help you today?"
        onComplete={handleComplete}
        clearOnComplete={true}
        conversationModeOn={false}
      />
    )
}


export default StyledOrderCoffee
