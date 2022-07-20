import "./App.css";
import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Title from "./components/Title";
import Library from "./components/Library";
import * as BooksAPI from "./BooksAPI";
import Book from "./components/Book";



function App() {

    const [books, setBooks] = useState([]); 
    
    //save typed input in search
    const [searchReq, setSearchReq] = useState("");
    
    // save books that includes what's typed in search
    const [includedBooks, setIncludedBooks] = useState([]);

    // //test state for library book object containing Id and shelf name
    // const [bookMap, setBookMap] = useState({id: "", shelf: ""});


  //FUNCTIONS

  //function for changing book's shelf by using the option menu
  function bookNewShelf(clickedBook, newShelf) {
    const upToDateLibrary = books.map((eachBook) => {
      if (eachBook.id === clickedBook.id) {
        //set the new shelf value to be the book's new shelf
        clickedBook.shelf = newShelf;  
   
        return clickedBook;     
      }
      else {
        return eachBook;
      }     
    }) 
    setBooks(upToDateLibrary);
    //using the update feature from the API file to keep the order after refreshing
    BooksAPI.update(clickedBook, newShelf);
  }


  //Search Function
  function handleSearch(event) {
    const newValue = event.target.value;
    setSearchReq(newValue);
  }

  function refreshLibrary () {
    let typing= true;
    
  if (searchReq.length > 0) {
    BooksAPI.search(searchReq).then((d) => {
      // {d.forEach((book)=> {book.imageLinks === undefined ? console.log("undefined") : console.log("No")})}

      if(d.error) {
        // console.log(d);
        //return nothing when the serch Request doesn't match
        setIncludedBooks([]);
      }else {
        //return the books that are relevent to the search request
        if (typing === true) {
          // scan all searched books and handle their default value
          //giving the searched books a shelf property
          //d is the data recieved from search
          d.map((booksFromSearch) => {
            books.forEach((book) => {
              if (booksFromSearch.id === book.id) {
                return booksFromSearch.shelf = book.shelf
                
              }else {
                return booksFromSearch;
              }
            })
          })
          setIncludedBooks(d);         
        }
      }
    })
  }
  //cleaning up
  return function unmount() {

    typing= false;
    setIncludedBooks([]);
  }    

  }

  useEffect(refreshLibrary(), [searchReq])


  //importing all the books from BooksAPI file
  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
   
  }, [])




  return (
    <div className="app">

        <Routes>
        <Route path="/search" element={
          <div className="search-books">
          <div className="search-books-bar">
          <Link to="/" className="close-search">
            
          </Link>

            <div className="search-books-input-wrapper">
              <input
                value={searchReq}
                onChange={handleSearch}
                type="text"
                placeholder="Search by title, author, or ISBN"

              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">

              {includedBooks.map((book) => {
                if (searchReq.length > 0) {
                  return <li key={book.id}>
                            <Book book={book} bookNewShelf={bookNewShelf} />
                        </li>
                } else {setIncludedBooks([])}
                        
                    })
            }
            </ol>
          </div>
        </div>
        }

        />
        <Route exact path="/" element={
          <div className="list-books">
          <Title />
          <div className="list-books-content">
            <div>
              
              <Library books={books} bookNewShelf={bookNewShelf}/>
            
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">
              
            </Link>

          </div>
        </div>
        }
        />
        </Routes>
    </div>
  );
}

export default App;
