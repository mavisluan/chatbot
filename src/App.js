import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import OrderCoffee from './OrderCoffee';

Amplify.configure(awsconfig);

const App = () =>  {
    return (
      <div className="mt-5 text-center">
        <header className="App-header">
          <h3 className="App-title">Welcome to ChatBot Demo</h3>
        </header>
        <OrderCoffee />
      </div>
    );
}

export default App;