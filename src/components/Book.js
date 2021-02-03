import React, {PureComponent} from 'react';

const Header = (props) => (
    <h1>{props.title}</h1>
);

export default class Book extends PureComponent {

    constructor(props) {
        console.log("Book")
        super(props);
        this.state = {book: {}}
    }

    componentDidMount() {
        fetch('/api/book/5fe6575849ebe14c47ab3f80')
            .then(response => response.json())
            .then(book => this.setState({
                book: book
            }));
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
