import React, {PureComponent} from 'react'

const Header = (props) => (
    <h1>{props.title}</h1>
);

export default class App extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {persons: []};
    }

    componentDidMount() {
        fetch('/api/persons')
            .then(response => response.json())
            .then(persons => this.setState({persons}));
    }

    componentWillUnmount() {
        console.warn("Will")
    }

    render() {
        return (
            <React.Fragment>
                <Header title={'Persons'}/>
                <table>
                    <thead>
                    <tr>
                        <th>ID23</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.persons.map((person, i) => (
                            <tr key={i}>
                                <td>{person.id}</td>
                                <td>{person.name}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
};
