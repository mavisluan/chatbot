import React from 'react'
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';

const myTheme = {
    ...AmplifyTheme,
    sectionHeader: {
      ...AmplifyTheme.sectionHeader,
      backgroundColor: 'brown',
    },
  };
  
const OrderCoffee = () => {
    const customerVoiceConfig = {
      silenceDetentionConfig: {
        time: 2000,
        amplitude: 0.2
      }
    }

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
        botName="ServiceBot_dev"
        welcomeMessage="Welcome, how can I help you today?"
        onComplete={handleComplete}
        clearOnComplete={true}
        conversationModeOn={true}
        voiceEnabled={true}
        voidCOnfig={customerVoiceConfig}
      />
    )
}


export default OrderCoffee
