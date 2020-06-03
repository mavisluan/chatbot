import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import OrderCoffee from './OrderCoffee';
import StyledCoffee from './StyledOrderCoffee'
Amplify.configure(awsconfig);

const App = () =>  {
    return (
      <div className="mt-5 text-center container">
        <header className="App-header">
          <h3 className="App-title">Welcome to ChatBot Demo</h3>
        </header>
        <StyledCoffee />
      </div>
    );
}

export default App;