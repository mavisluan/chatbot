import React from 'react'
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
// Imported default theme can be customized by overloading attributes
const myTheme = {
    ...AmplifyTheme,
    sectionHeader: {
      ...AmplifyTheme.sectionHeader,
      backgroundColor: '#ff6600',
    },
  };
  
const BookTrip = () => {
    const handleComplete = (err, confirmation) => {
        if (err) {
          alert('Bot conversation failed')
          return;
        }
    
        alert('Success: ' + JSON.stringify(confirmation, null, 2));
        return 'Trip booked. Thank you! what would you like to do next?';
      }
    return (
        <ChatBot
        title="My Bot"
        theme={myTheme}
        botName="BookTrip_dev"
        welcomeMessage="Welcome, how can I help you today?"
        onComplete={handleComplete}
        clearOnComplete={true}
        conversationModeOn={false}
      />
    )
}


export default BookTrip
