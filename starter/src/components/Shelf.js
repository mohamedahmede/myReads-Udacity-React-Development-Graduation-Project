import React from "react";
import Book from "./Book";

//taking to props from the library one for the books on each shelf 
//and the other is for the name of the shelf to put in the heading
function Shelf({books, shelfName, bookNewShelf}) {


    return <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    books.map((book) => {
                        return <li key={book.id}>
                            <Book book={book} bookNewShelf={bookNewShelf} />
                        </li>
                    })

                }

            </ol>
        </div>
    </div>
}


export default Shelf;