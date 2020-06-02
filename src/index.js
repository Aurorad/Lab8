import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import {Login, Authorization} from "./cmponents/login";
import Weather from "./cmponents/weather";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
    Authorization.isAuthorized === true
        ? <Component {...props} />
: <Redirect to="/" />
)} />
);

function Main() {

    return (
        <Switch>
            <Route exact path="/" component={Login}/>
            <PrivateRoute exact path="/weather" component={Weather}/>

        </Switch>

);
}

ReactDOM.render(
<BrowserRouter>
<Main/>
</BrowserRouter>,
document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
