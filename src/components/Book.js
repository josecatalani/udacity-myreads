import React from 'react'

const Book = ({
    id,
    width = 128,
    height = 192,
    background,
    title,
    author,
    onChange,
    shelfKey
}) => (
    <li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width, height, backgroundImage: `url(${background})` }}></div>
                <div className="book-shelf-changer">
                    <select 
                        onChange={(e) => {
                            onChange({
                                id,
                                title,
                                author
                            }, e.target.value)
                        }}
                        value={shelfKey}
                    >
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{author}</div>
        </div>
    </li>
)

export default Book