import { ArticleView } from "./ArticleView";
import { IAppState } from "moke-state";
import { ArticleActionCreator } from "moke-action-creator";
import { connect } from "react-redux";

const mapStateToProps = ({ articles }: IAppState) => {
    return {
        articles: articles.data
    }
}

const mapDispatchToProps = {
    fetchArticles: ArticleActionCreator.fetchArticles
}

const Article = connect(mapStateToProps, mapDispatchToProps)(ArticleView);

export { Article }