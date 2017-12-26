import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
    render() {
        const { books, onChange, shelfKey } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
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
                                shelfKey={shelfKey}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf