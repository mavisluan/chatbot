import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import StyledOrderCoffee from './StyledOrderCoffee'
// import OrderCoffee from './OrderCoffee'
Amplify.configure(awsconfig);

const App = () =>  {
    return (
      <div className="mt-3">
        <header className="App-header">
          <h3 className="App-title text-center">Welcome to ChatBot Demo</h3>
        </header>
        <StyledOrderCoffee />
      </div>
    );
}

export default App;