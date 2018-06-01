import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Search from './Components/Search/Search';
import MyReadings from './Components/Main/MyReadings';

class BooksApp extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' component={MyReadings}/>
        <Route path='/search' component={Search}/>       
      </div>
    )
  }
}

export default BooksApp;
