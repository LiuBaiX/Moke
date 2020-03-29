import { ArticleManagementView } from "./ArticleManagementView";
import { connect } from "react-redux";
import { IAppState } from "moke-state";
import { ManagementActionCreator } from "moke-action-creator";

const mapStateToProps = ({ management }: IAppState) => {
    return {
        dataSource: management.article.articles
    }
}

const mapDispatchToProps = {
    fetchArticles: ManagementActionCreator.getAllBanedArticles,
    onAccept: ManagementActionCreator.acceptArticle
}

const ArticleManagement = connect(mapStateToProps, mapDispatchToProps)(ArticleManagementView);

export {
    ArticleManagement
}