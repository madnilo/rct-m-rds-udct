import React from 'react';

import * as BooksAPI from '../../BooksAPI';
import Spinner from '../Spinner/Spinner';
import Book from '../Book/Book';
import './Search.css';

class Search extends React.Component{
  allowedTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 
  'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 
  'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 
  'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 
  'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 
  'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 
  'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 
  'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 
  'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];
  
  constructor(props) {
    super(props);
    
    this.state = {
      results: null,
      searchTerm: '',
    }
    
    this.handleSearch = this.handleSearch.bind(this);
    this.fillResults = this.fillResults.bind(this);
  }

  handleSearch(e){
    e.preventDefault();
    let newTerm = e.target.value;
    this.setState({searchTerm: newTerm})
    if(this.allowedTerms.includes(newTerm))
      this.fillResults(newTerm);
    else
      this.setState({results: null});
  }

  fillResults(searchTerm){
    BooksAPI.search(searchTerm)
    .then(data => this.setState({results: data}))
    .catch(err => console.log('error fetching results', err));
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={this.props.showShelf}>
            Close
          </a>
          <div className="search-books-input-wrapper">
            <input type="text" 
            placeholder="Search by title or author"
            value={this.state.searchTerm} 
            onChange={this.handleSearch}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.results === null
              ?
              (<Spinner/>)
              : 
              (this.state.results.map(bookData => (
              <li key={bookData.id}>
                <Book data={bookData}/>
              </li>
            )))}
          </ol>
        </div>
      </div>
    )
  }
}
 
export default Search;