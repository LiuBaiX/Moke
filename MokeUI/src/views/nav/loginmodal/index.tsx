import { LoginModalView } from "./LoginModal";
import { login } from "moke-action-creator";
import { connect } from "react-redux";

const mapDispatchToProps = login;

export const LoginModal = connect(null, mapDispatchToProps)(LoginModalView);
