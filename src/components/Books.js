import React, {PureComponent} from 'react';
import {
    Redirect
} from "react-router-dom";

export default class Books extends PureComponent {

    constructor(param) {
        super(param);
        this.state = {books: []};
    }

    componentDidMount() {
        fetch('/api/book')
            .then(response => response.json())
            .then(books => this.setState({
                books: books
            }));
    }

    render() {
        return (
            <BookList books = {this.state.books}/>
        )
    }
}

class BookList extends React.Component {
    render() {
        const books = this.props.books.map(book =>
            <BookElement key={book.id} book={book}/>
        );
        return (
            <React.Fragment>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Authors</th>
                    </tr>
                    </thead>
                    <tbody>
                        {books}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

class BookElement extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {redirectBookId: null};
    }

    render() {
        console.warn("redirect ", this.state.redirectBookId);
        if (this.state.redirectBookId != null) {
            return (this.redirectToBook(this.state.redirectBookId));
        }
        const book = this.props.book;
        return (
            <tr onClick={() => this.handleClick(book.id)}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.genre == null ? "" : book.genre.name}</td>
                <td>{book.authors == null ? "" : book.authors.map(a => a.firstName + " " + a.lastName)
                    .join(", ")}</td>
            </tr>
        )
    }

    handleClick(bookId) {
        console.warn("set new state", bookId);

        this.setState({
            redirectBookId: bookId
        });
    }

    redirectToBook(bookId) {
        console.warn("redirect!!!!");
        return (<Redirect to={"/book/" + bookId}/>)
    }
}
