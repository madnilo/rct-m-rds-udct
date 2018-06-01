import React from 'react';

import Book from '../Book/Book';
import './BookShelf.css';

const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => 
            <li key={book.id}>
              <Book data={book} changeShelf={props.changeShelf}/>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
