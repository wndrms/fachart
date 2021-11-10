import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Main from "./Main";
import Manage from "./Manage";
import List from "./List";
import Analytics from "./Analytics";

const AppRouter = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Main></Main>
                </Route>
                <Route exact path="/Manage">
                    <Manage></Manage>
                </Route>
                <Route exact path="/List">
                    <List></List>
                </Route>
                <Route exact path="/Analytics">
                    <Analytics></Analytics>
                </Route>
            </Switch>
        </Router>
    );
}

export default AppRouter;