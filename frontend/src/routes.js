import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {MainPage} from './pages/MainPage';
import {RegPage} from './pages/RegPage';
import {LoginPage} from './pages/LoginPage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/main" exact> <MainPage /> </Route>
                <Redirect to="/main"/>
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path="/login" exact> <LoginPage /> </Route>
            <Route path="/reg" exact> <RegPage /> </Route>
            <Redirect to="/login"/>
        </Switch>
    );
}
