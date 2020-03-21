import React from "react";
import { Route, Redirect, Switch } from "react-router";
import { connect } from "react-redux";
import { IAppState } from "moke-state";
import {
    HomePage,
    Article,
    Notification,
    InvitationCenter,
    CreateNewArticle, EditArticle,
    Welcome,
    ArticleDetails,
    CreateCenter,
    SubsidiaryEditor,
    UserCenter
} from "../client";

function renderRouter() {
    const routeConfig = [
        {
            path: "/client",
            children: <Redirect to="/client/home" />,
            exact: true,
        },
        {
            path: "/client/home",
            children: <HomePage />,
        },
        {
            path: "/client/notification",
            children: <Notification />,
        },
        {
            path: "/client/article",
            children: <Article />,
            exact: true,
        },
        {
            path: "/client/invitation",
            children: <InvitationCenter />,
            exact: true,
        },
        {
            path: "/client/create",
            children: <CreateCenter />,
            exact: true,
        },
        {
            path: "/client/create/article/add",
            children: <CreateNewArticle />,
            exact: true,
        },
        {
            path: "/client/create/article/edit/:id",
            children: <EditArticle />,
        },
        {
            path: "/client/create/subsidiary/:id/:invitationId",
            children: <SubsidiaryEditor />,
        },
        {
            path: "/client/details/:id",
            children: <ArticleDetails />,
        },
        {
            path: "/client/user",
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

interface IClientRouterMapStateToProps {
    uid?: number;
}

type IClientRouterProps = IClientRouterMapStateToProps;

function ClientRouterView(props: IClientRouterProps) {
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

const ClientRouter = connect(mapStateToProps)(ClientRouterView);

export { ClientRouter };