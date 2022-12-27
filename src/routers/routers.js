import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {
    Login,
    Registration,
    Home,
    Error,
    DetailsOfAd
} from '../components';

export const Routers = () => {
    return (
        <Switch>
            <Route path={'/'} exact component={Home}/>
            <Route path={`/registration`} component={Registration}/>
            <Route path={`/login`} component={Login}/>
            <Route component={Error}/>
        </Switch>
    );
};
