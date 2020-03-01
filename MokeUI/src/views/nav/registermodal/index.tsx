import { RegisterModalView } from "./RegisterModalView";
import { UserActionCreator } from "moke-action-creator";
import { connect } from "react-redux";
import { IAppState } from "moke-state";

const mapStateToProps = ({ error }: IAppState) => {
    return {
        error: error.message
    }
}
const { register } = UserActionCreator;
const mapDispatchToProps = { register };

export const RegisterModal = connect(mapStateToProps, mapDispatchToProps)(RegisterModalView);
