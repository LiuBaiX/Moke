import React from "react";
import { Route, Redirect, Switch } from "react-router";
import HomePage from "src/views/pages/homepage";
import { Article } from "src/views/pages/article";
import { CreateNewArticle } from "src/views/pages/createcenter/article";
import Welcome from "../pages/welcome";
import { connect } from "react-redux";
import { IAppState } from "moke-state";
import { ArticleDetails } from "src/views/pages/details";
import { CreateCenter } from "../pages/createcenter";

function renderRouter() {
    const routeConfig = [
        {
            path: "/",
            children: <Redirect to="/home" />,
            exact: true,
        },
        {
            path: "/home",
            children: <HomePage />,
        },
        {
            path: "/article",
            children: <Article />
        },
        {
            path: "/create",
            children: <CreateCenter />,
            exact: true,
        },
        {
            path: "/create/article",
            children: <CreateNewArticle />,
        },
        {
            path: "/details/:id",
            children: <ArticleDetails />,
        },
        {
            path: "/user",
            children: <React.Fragment></React.Fragment>
        }
    ];
    return (
        <React.Fragment>
            <Switch>
                {
                    routeConfig.map((route, index) => {
                        return <Route key={index} path={route.path} exact={route.exact}>
                            {route.children}
                        </Route>
                    })
                }
            </Switch>
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

