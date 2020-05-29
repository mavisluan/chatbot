import React, { Component } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import awsconfig from './aws-exports';
import BookTrip from './BookTrip';
import OrderFlowers from './OrderFlowers';

Amplify.configure(awsconfig);

const App = () =>  {
    return (
      <div className="mt-5 text-center">
        <header className="App-header">
          <h3 className="App-title">Welcome to ChatBot Demo</h3>
        </header>
       <OrderFlowers />
      </div>
    );
}

export default App;