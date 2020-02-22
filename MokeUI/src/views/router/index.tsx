import React from "react";
import { Route, Redirect } from "react-router";
import HomePage from "src/views/pages/homepage";
import Article from "src/views/pages/article";
import Create from "src/views/pages/create";
import Welcome from "../pages/welcome";
import { connect } from "react-redux";
import { IAppState } from "moke-state";

function renderRouter() {
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

interface IMokeRouterMapStateToProps {
    uid?: number;
}

type IMokeRouterProps = IMokeRouterMapStateToProps;

function MokeRouterView(props: IMokeRouterProps) {
    return (
        <React.Fragment>
            {
                props.uid
                    ? renderRouter()
                    : <Welcome />
            }
        </React.Fragment>
    );
}

const mapStateToProps = ({ user }: IAppState) => {
    return {
        uid: user.uid
    }
}

const MokeRouter = connect(mapStateToProps)(MokeRouterView);

export { MokeRouter };

