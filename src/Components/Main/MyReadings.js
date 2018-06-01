import React from 'react';

import * as BooksAPI from '../../BooksAPI';
import BookShelf from '../BookShelf/BookShelf';
import Spinner from '../Spinner/Spinner'
  
class MyReadings extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			currentlyReading: null,
			wantToRead: null,
			read:null,
		}
	}

	componentWillMount(){
		BooksAPI.getAll()
		.then(res => {
			let currentlyReading = res.filter(book => book.shelf === 'currentlyReading');
			let wantToRead = res.filter(book => book.shelf === 'wantToRead');
			let read = res.filter(book => book.shelf === 'read');
			this.setState({currentlyReading, wantToRead, read});
		});
	}

	changeShelf(book, e){
    BooksAPI.update(book, e.target.value)
    .then(res => console.log(res));
  }

	render(){
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					
						{this.state.currentlyReading == null 
							?	
							(<Spinner/>)
							: 
							(<div>
								<BookShelf changeShelf={this.changeShelf} title='Currently Reading' books={this.state.currentlyReading}/>
								<BookShelf changeShelf={this.changeShelf} title='Want to Read' books={this.state.wantToRead}/>
								<BookShelf changeShelf={this.changeShelf} title='Read' books={this.state.read}/>
							</div>)
						}
						
					
				</div>
				<div className="open-search">
					<a onClick={this.props.showSearch}>Add a book</a>
				</div>
			</div>
		);
	}
}
  
export default MyReadings;
  