import React from "react";
import { Route, Redirect } from "react-router";
import HomePage from "src/views/pages/homepage";
import Article from "src/views/pages/article";
import Create from "src/views/pages/create";

export function MokeRouter() {
    return (
        <React.Fragment>
            <Route exact path="/" >
                <Redirect to="/home" />
            </Route>
            <Route exact path="/home">
                <HomePage />
            </Route>
            <Route path="/article" >
                <Article />
            </Route>
            <Route path="/daily" >

            </Route>
            <Route path="/story" >

            </Route>
            <Route path="/center" >

            </Route>
            <Route path="/create" >
                <Create></Create>
            </Route>
        </React.Fragment>
    );
}