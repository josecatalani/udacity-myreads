import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Home from './Home'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      books: [],
      searchBooks: [],
      query: ""
    }

    this.getAllBooks = this.getAllBooks.bind(this)
    this.onChange = this.onChange.bind(this)
    this.updateBooks = this.updateBooks.bind(this)
    this.makeSearch = this.makeSearch.bind(this)
    this.creatingQuery = this.creatingQuery.bind(this)
    this.onChangeSearch = this.onChangeSearch.bind(this)
  }

  getAllBooks() {
    BooksAPI.getAll().then(books => this.setState({ books }))
  }
  
  componentDidMount(){
    this.getAllBooks();
  }

  onChange(book, newShelf) {
    BooksAPI.update(book, newShelf).then(() => {
      this.getAllBooks()
    })
  }

  creatingQuery(value) {
    this.setState({
        query: value
    }, this.makeSearch)
  }

  updateBooks(newBooks) {
    if(newBooks) {
      const mergeBooks = newBooks.map(book => {
        book.shelf = "none";
        this.state.books.forEach(bookOnShelf => {
          if (book.id === bookOnShelf.id) {
            book.shelf = bookOnShelf.shelf;
          }
        });
        return book;
      });

      this.setState({
        searchBooks: mergeBooks
      });
    }
  }

  makeSearch() {
    BooksAPI.search(this.state.query, 20).then(
        response => {
            if (response.error) {
                this.setState({
                    books: []
                });
            } else {
                this.updateBooks(response);
            }
        }
    );
  }
  
  onChangeSearch(book, shelf) {
    let allBooks = this.state.searchBooks;
    const bookToUpdate = allBooks.filter(t => t.id === book.id)[0];
    bookToUpdate.shelf = shelf;
    this.setState({
      searchBooks: allBooks
    });
    this.onChange(book, shelf);
  }

  render() {
    return (
      <div className="app">
        <Route 
          path="/search" 
          render={() => (
            <SearchPage
              books={this.state.searchBooks}
              creatingQuery={this.creatingQuery}
              makeSearch={this.makeSearch}
              onChange={this.onChangeSearch}
            />
          )}
        />
        <Route 
          exact 
          path="/" 
          render={() => (
            <Home
              books={this.state.books}
              onChange={this.onChange}
              />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
