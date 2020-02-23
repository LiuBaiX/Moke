import { connect } from "react-redux";
import { CreateNewArticleView } from "./CreateNewArticleView";
import { IAppState } from "moke-state";

const mapStateToProps = ({  }: IAppState) => {
    return {
        
    };
}

const mapDispatchToProps = {};

const CreateNewArticle = connect()(CreateNewArticleView);

export {
    CreateNewArticle
}