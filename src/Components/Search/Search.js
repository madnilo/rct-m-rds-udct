import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import Spinner from '../Utils/Spinner';
import Book from '../Book/Book';
import NoResults from '../Utils/NoResults'
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
  'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'].map(item => item.toLowerCase());
  
  constructor(props) {
    super(props);
    
    this.state = {
      results: null,
      myBooks: null,
      searchTerm: '',
      invalidTerm: true,
    }
    
    this.inputSearch = React.createRef();

    this.handleSearch = this.handleSearch.bind(this);
    this.fillResults = this.fillResults.bind(this);
    this.changeShelf = this.changeShelf.bind(this);
  }

  componentWillMount(){
    BooksAPI.getAll()
    .then(myBooks => this.setState({myBooks}));
  }

  componentDidMount(){
    this.inputSearch.current.focus();
  }

  handleSearch(e){
    e.preventDefault();
    let newTerm = e.target.value;
    this.setState({searchTerm: newTerm})
    if(this.allowedTerms.includes(newTerm.toLowerCase())){
      this.setState({invalidTerm: false});
      this.fillResults(newTerm);
    }
    else
      this.setState({results: null, invalidTerm: true});
  }

  fillResults(searchTerm){
    let myBooks = this.state.myBooks;
    BooksAPI.search(searchTerm)
    .then(data => {
      data = data.map(book => {
        let myBook = myBooks.filter(item => item.id === book.id);
        return ({...book, shelf: myBook.length > 0 ? myBook[0].shelf : "none"});
      });
      this.setState({results: data});
    })
    .catch(err => console.log('error fetching results', err));
  }

  changeShelf(book, e){
    let newShelf = e.target.value;
    BooksAPI.update(book, newShelf)
    .then(res => {
      let index = this.state.results.findIndex(item => item.id === book.id);
      let results = this.state.results;
      results[index].shelf = newShelf;
      this.setState({results})
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input ref={this.inputSearch} 
            type="text" 
            placeholder="Search by title or author"
            value={this.state.searchTerm} 
            onChange={this.handleSearch}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.results === null
              ?
              (this.state.invalidTerm ? <NoResults/> : <Spinner/>)
              : 
              (this.state.results.map(book => (
              <li key={book.id}>
                <Book data={book} changeShelf={this.changeShelf}/>
              </li>
            )))}
          </ol>
        </div>
      </div>
    )
  }
}
 
export default Search;