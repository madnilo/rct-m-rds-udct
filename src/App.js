import React from 'react';
import { Route } from 'react-router-dom';
import Search from './Components/Search/Search';
import MyReadings from './Components/Main/MyReadings';
import './App.css';

const BooksApp = () => {
  return (
    <div className="app">
      <Route exact path='/' component={MyReadings}/>
      <Route path='/search' component={Search}/>       
    </div>
  )
}

export default BooksApp;
