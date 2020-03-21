import { HomePageView } from "./HomePageView";
import { IAppState } from "moke-state";
import { connect } from "react-redux";

const mapStateToProps = ({ user }: IAppState) => {
    return {
        username: user.username
    }
}

const HomePage = connect(mapStateToProps)(HomePageView);

export {
    HomePage
}