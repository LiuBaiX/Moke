import React from "react";
import { Route, Redirect, Switch } from "react-router";
import { HomePage } from "src/views/pages/homepage";
import { Article } from "src/views/pages/article";
import { Notification } from "src/views/pages/notification";
import { InvitationCenter } from "src/views/pages/invitation";
import { CreateNewArticle, EditArticle } from "src/views/pages/createcenter/article";
import Welcome from "../pages/welcome";
import { connect } from "react-redux";
import { IAppState } from "moke-state";
import { ArticleDetails } from "src/views/pages/details";
import { CreateCenter } from "../pages/createcenter";
import { SubsidiaryEditor } from "../pages/createcenter/subsidiary";
import { UserCenter } from "../pages/usercenter";

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
            path: "/notification",
            children: <Notification />,
        },
        {
            path: "/article",
            children: <Article />,
            exact: true,
        },
        {
            path: "/invitation",
            children: <InvitationCenter />,
            exact: true,
        },
        {
            path: "/create",
            children: <CreateCenter />,
            exact: true,
        },
        {
            path: "/create/article/add",
            children: <CreateNewArticle />,
            exact: true,
        },
        {
            path: "/create/article/edit/:id",
            children: <EditArticle />,
        },
        {
            path: "/create/subsidiary/:id/:invitationId",
            children: <SubsidiaryEditor />,
        },
        {
            path: "/details/:id",
            children: <ArticleDetails />,
        },
        {
            path: "/user",
            children: <UserCenter />
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

