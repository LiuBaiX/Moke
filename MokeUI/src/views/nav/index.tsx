import { connect } from 'react-redux';
import { IAppState } from 'moke-state';
import { MokeNavView } from './MokeNavView';
import { UserActionCreator } from 'moke-action-creator';
import { useHistory } from 'react-router';
import React from "react";

const mapStateToProps = ({ user }: IAppState) => {
    return {
        uid: user.uid,
        username: user.username
    };
}
const { logout } = UserActionCreator;
const mapDispatchToProps = { logout };

const MokeNavWrapper = connect(mapStateToProps, mapDispatchToProps)(MokeNavView);

const MokeNav = () => {
    const history = useHistory();
    return <MokeNavWrapper history={history} />;
}

export {
    MokeNav
}

