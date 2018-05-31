import React from 'react'

import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Components/Search/Search'
import Shelf from './Components/Shelf/Shelf'

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
    }

    this.showShelf = this.showShelf.bind(this);
    this.showSearch = this.showSearch.bind(this);
  }

  showSearch(e){
    e.preventDefault();
    this.setState({showSearchPage: true})
  }

  showShelf(e){
    e.preventDefault();
    this.setState({showSearchPage: false})
  }

  render() {
    return (
      <div className="app">
        { this.state.showSearchPage ? <Search showShelf={this.showShelf}/> : <Shelf showSearch={this.showSearch}/> }
      </div>
    )
  }
}

export default BooksApp;
