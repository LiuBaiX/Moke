import React from "react";
import { Route, Redirect } from "react-router";
import HomePage from "src/views/pages/homepage";
import Article from "src/views/pages/article";
import { CreateNewArticle } from "src/views/pages/new_article";
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
                <CreateNewArticle />
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

