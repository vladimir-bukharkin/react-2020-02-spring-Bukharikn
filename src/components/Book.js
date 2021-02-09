import React, {PureComponent} from 'react';
import {withRouter} from "react-router-dom";

const Header = (props) => (
    <h1>{props.title}</h1>
);

class Book extends PureComponent {

    constructor(props) {
        console.log("Book")
        super(props);
        this.state = {book: {}}
    }

    componentDidMount() {
        console.warn(this.props);
        const {match} = this.props;
        if (match && match.params) {
            const id = match.params.id;
            console.warn(id);
            fetch(`/api/book/${id}`)
                .then(response => response.json())
                .then(book => this.setState({
                    book: book
                }));
        }
    }

    render() {
        const book = this.state.book;
        return (
            <React.Fragment>
                <Header title={book.name}/>
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
                    {
                        <tr>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>{book.genre == null ? "" : book.genre.name}</td>
                            <td>{book.authors == null ? "" : book.authors.map(a => a.firstName + " " + a.lastName)
                                .join(", ")}</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default withRouter(Book);
