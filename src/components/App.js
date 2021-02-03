import React, {PureComponent} from 'react';
import rootRouter from "./RootRouter";

export default class App extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return rootRouter();
    }
};
