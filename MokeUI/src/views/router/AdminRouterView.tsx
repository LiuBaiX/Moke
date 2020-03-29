import React from "react";
import { Route, Redirect, Switch } from "react-router";
import { connect } from "react-redux";
import { IAppState } from "moke-state";
import {
    ArticleManagement,
    SubsidiaryManagement,
    UserManagement
} from "../admin";
import { Alert } from "react-bootstrap";

function renderRouter() {
    const routeConfig = [
        {
            path: "/admin",
            children: <Redirect to="/admin/article" />,
            exact: true,
        },
        {
            path: "/admin/article",
            children: <ArticleManagement />,
            exact: true,
        },
        {
            path: "/admin/subsidiary",
            children: <SubsidiaryManagement />,
            exact: true,
        },
        {
            path: "/admin/user",
            children: <UserManagement />,
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
    id?: string;
}

type IAdminRouterProps = IAdminRouterMapStateToProps;

function AdminRouterView(props: IAdminRouterProps) {
    const [isDisplay, setIsDisplay] = React.useState(true);
    return (
        <React.Fragment>
            {
                props.id !== ""
                    ? renderRouter()
                    : isDisplay
                        ? <Alert
                            variant="warning"
                            dismissible
                            onClose={() => { setIsDisplay(false); }}
                        >管理员用户请先登录</Alert>
                        : null
            }
        </React.Fragment>
    );
}

const mapStateToProps = ({ admin }: IAppState) => {
    return {
        uid: admin.id
    }
}

const AdminRouter = connect(mapStateToProps)(AdminRouterView);

export { AdminRouter };