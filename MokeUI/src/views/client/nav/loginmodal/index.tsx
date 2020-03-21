import { LoginModalView } from "./LoginModalView";
import { UserActionCreator } from "moke-action-creator";
import { connect } from "react-redux";
import { IAppState } from "moke-state";

const mapStateToProps = ({ error }: IAppState) => {
    return {
        error: error.message
    };
}
const { login } = UserActionCreator;
const mapDispatchToProps = { login };

export const LoginModal = connect(mapStateToProps, mapDispatchToProps)(LoginModalView);
