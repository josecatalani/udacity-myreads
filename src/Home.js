import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Shelf from './components/Shelf'

class Home extends Component {
    state = {
        shelfs: [{
            key: "currentlyReading",
            title: "Currently"
        }, {
            key: "wantToRead",
            title: "Want to Read"
        }, {
            key: "read",
            title: "Read"
        }]
    }

    render() {
        const { shelfs } = this.state
        const { books, onChange } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        { shelfs.map(shelf => {
                            const booksShelf = books.filter(book => book.shelf === shelf.key)
                            return (
                                <Shelf
                                    key={shelf.key}
                                    title={shelf.title}
                                    books={booksShelf}
                                    onChange={onChange}
                                    shelfKey={shelf.key}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Home