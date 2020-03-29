import { LoginModalView } from "./LoginModalView";
import { AdminActionCreator } from "moke-action-creator";
import { connect } from "react-redux";

const {
    login
} = AdminActionCreator;

const mapDispatchToProps = {
    login
};

export const LoginModal = connect(null, mapDispatchToProps)(LoginModalView);
