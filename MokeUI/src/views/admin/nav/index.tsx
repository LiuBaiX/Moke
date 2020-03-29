import { connect } from 'react-redux';
import { IAppState } from 'moke-state';
import { MokeAdminNavView } from './MokeAdminNavView';
import { AdminActionCreator } from 'moke-action-creator';
import { useHistory } from 'react-router';
import React from "react";

const mapStateToProps = ({ admin }: IAppState) => {
    return {
        uid: admin.id,
        username: admin.username
    };
};

const {
    logout
} = AdminActionCreator;

const mapDispatchToProps = {
    logout
};

const MiddleComponent = connect(mapStateToProps, mapDispatchToProps)(MokeAdminNavView);

const MokeAdminNav = () => {
    const history = useHistory();
    return <MiddleComponent history={history} />;
}

export {
    MokeAdminNav
}

