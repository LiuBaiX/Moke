import { LoginModalView } from "./LoginModal";
import { UserActionCreator } from "moke-action-creator";
import { connect } from "react-redux";

const { login } = UserActionCreator;
const mapDispatchToProps = { login };

export const LoginModal = connect(null, mapDispatchToProps)(LoginModalView);
