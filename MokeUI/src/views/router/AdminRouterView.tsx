import React from "react";
import { Route, Redirect, Switch } from "react-router";
import { connect } from "react-redux";
import { IAppState } from "moke-state";

function renderRouter() {
    const routeConfig = [
        {
            path: "/admin",
            children: <Redirect to="/admin/home" />,
            exact: true,
        },
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

interface IAdminRouterMapStateToProps {
    uid?: number;
}

type IAdminRouterProps = IAdminRouterMapStateToProps;

function AdminRouterView(props: IAdminRouterProps) {
    return (
        <React.Fragment>
            {
                props.uid
                    ? renderRouter()
                    : null
            }
        </React.Fragment>
    );
}

const mapStateToProps = ({ user }: IAppState) => {
    return {
        uid: user.uid
    }
}

const AdminRouter = connect(mapStateToProps)(AdminRouterView);

export { AdminRouter };