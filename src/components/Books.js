import React, {PureComponent} from 'react';

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


    // handleChange(e) {
    //     this.setState({temperature: e.target.value});
    // }

    render() {
        return (
            <BookList books = {this.state.books}/>
        )
    }
}

class BookList extends React.Component {
    render() {
        const books = this.props.books.map(book =>
            <Book book={book}/>
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

class Book extends React.Component{
    render() {
        const book = this.props.book;
        return (
            <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.genre == null ? "" : book.genre.name}</td>
                <td>{book.authors == null ? "" : book.authors.map(a => a.firstName + " " + a.lastName)
                    .join(", ")}</td>
            </tr>
        )
    }
}
