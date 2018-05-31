import React from 'react'

import './App.css'
import Search from './Components/Search/Search'
import Shelf from './Components/Shelf/Shelf'

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {

      showSearchPage: false,
      results: null
    }

    this.showShelf = this.showShelf.bind(this);
    this.showSearch = this.showSearch.bind(this);
  }

  showSearch(e){
    e.preventDefault();
    this.setState({showSearchPage: true});
  }

  showShelf(e){
    e.preventDefault();
    this.setState({showSearchPage: false});
  }
 

  render() {
    return (
      <div className="app">
        { this.state.showSearchPage 
          ? <Search showShelf={this.showShelf} /> 
          : <Shelf showSearch={this.showSearch} /> }
      </div>
    )
  }
}

export default BooksApp;
