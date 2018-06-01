import React from 'react';

import './Book.css';

const Book = (props) => {
	let book = props.data;
	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
				<div className="book-shelf-changer">
					<select onChange={(e) => props.changeShelf(book, e)} value={book.shelf}>
						<option value="0" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">{book.authors}</div>
		</div>
);
};

export default Book;