import React from "react";


function Book({book, bookNewShelf, commonShelf}) {
  let noBookCover = "https://drupal.nypl.org/sites-drupal/default/files/blogs/J5LVHEL.jpg";

    function handleChange(event) {
        //handling the option the user choose and for which function
        //bookNewShelf is a function in app.js file and passed doen using props to this file
       return bookNewShelf(book, event.target.value);
    
    }

    //this function is to give default value to none for books without shelf
    function noneShelf (book) {
        let noShelf;

    if(book.shelf) {
        return noShelf= book.shelf;
    }else {
        return noShelf= "none";
    }

    }
    
 
    
    return <div>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
            //If the book does not have a cover insert default book cover set in a variable called noBookCover
              `url(${book.imageLinks ? book.imageLinks.smallThumbnail : noBookCover })`    
          }
          
          }
        ></div>
        <div className="book-shelf-changer">
          <select defaultValue={noneShelf(book)} onChange={handleChange}>
          
            <option  disabled>
              Move to...
            </option>
            <option value="currentlyReading">
            Currently Reading
            </option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  </div>
}



export default Book;