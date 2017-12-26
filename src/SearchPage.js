import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './components/Book'
import { DebounceInput } from 'react-debounce-input';

class SearchPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: ""
        }
    }
    
    render() {
        const { books, onChange } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                    <DebounceInput
                        minLength={2}
                        debounceTimeout={500}
                        placeholder="Search by title or author"
                        onChange={event => this.props.creatingQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { books.map((book, index) => (
                            <Book
                                key={`${book.title}_${index}`}
                                id={book.id}
                                title={book.title}
                                author={book.authors[0]}
                                background={book.imageLinks.smallThumbnail}
                                onChange={(id, value) => {
                                    onChange(id, value)
                                }}
                                shelfKey={book.shelf}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage