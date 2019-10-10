import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

export default class App extends Component {

    constructor(props) {
        super(props);

        console.log('test 2');
    }

    render() {
        console.log('test');
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        )
    }
}