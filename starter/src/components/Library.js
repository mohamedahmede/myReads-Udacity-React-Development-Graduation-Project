import React from "react";
import Shelf from "./Shelf";

function Library({books, bookNewShelf}) {
    //const variable for each shelf
    // where b is for each book
    //maping through each book objects returning each book to it's shelf
    const currentlyReading = books.filter((b) => {
        return b.shelf === "currentlyReading";
    });
    const wantToRead = books.filter((b) => {
        return b.shelf === "wantToRead";
    });
    const read = books.filter((b) => {
        return b.shelf === "read";
    });

    return <div>
    <Shelf shelfName={"Currently Reading"} books={currentlyReading} bookNewShelf={bookNewShelf} />
    <Shelf shelfName={"Want To Read"} books={wantToRead} bookNewShelf={bookNewShelf} />
    <Shelf shelfName={"Read"} books={read} bookNewShelf={bookNewShelf} />
</div>


}


export default Library;