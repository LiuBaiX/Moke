import { connect } from 'react-redux';
import { IAppState } from 'moke-state';
import { MokeNavView } from './MokeNavView';
import { UserActionCreator } from 'moke-action-creator';

const mapStateToProps = ({ user }: IAppState) => {
    return {
        uid: user.uid,
        username: user.username
    };
}
const { logout } = UserActionCreator;
const mapDispatchToProps = { logout };

const MokeNav = connect(mapStateToProps, mapDispatchToProps)(MokeNavView);

export {
    MokeNav
}

