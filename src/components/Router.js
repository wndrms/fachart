import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Main from "./Main";
import Manage from "./Manage";
import List from "./List";
import Analytics from "./Analytics";
import Pricedata from "./Pricedata";
import Chart from "./Chart";

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
                <Route exact path="/Pricedata">
                    <Pricedata></Pricedata>
                </Route>
                <Route exact path="/Chart">
                    <Chart></Chart>
                </Route>
            </Switch>
        </Router>
    );
}

export default AppRouter;