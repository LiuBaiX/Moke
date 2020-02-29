import { connect, } from "react-redux";
import { CreateNewArticleView } from "./CreateNewArticleView";
import { IAppState } from "moke-state";
import { ArticleTypeActionCreator, ArticleActionCreator } from "moke-action-creator";
import { bindActionCreators, Dispatch } from "redux";

const mapStateToProps = ({ articleTypes }: IAppState) => {
    return {
        articleTypeList: articleTypes.articleType
    };
}

const mapDispatchToProps = {
    fetchArticleTypeList: ArticleTypeActionCreator.fetchArticleTypeList,
    onSave: ArticleActionCreator.addArticle,
}

const CreateNewArticle = connect(mapStateToProps, mapDispatchToProps)(CreateNewArticleView);

export {
    CreateNewArticle
}