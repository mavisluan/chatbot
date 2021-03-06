import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import OrderService from './components/OrderService'

Amplify.configure(awsconfig);

const App = () =>  {
    return (
      <div className="mt-3">
        <header className="App-header">
          <h3 className="App-title text-center">Welcome to ChatBot Demo</h3>
        </header>
        <OrderService />
      </div>
    );
}

export default App;