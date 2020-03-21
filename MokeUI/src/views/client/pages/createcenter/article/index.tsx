import { connect, } from "react-redux";
import { CreateNewArticleView } from "./CreateNewArticleView";
import { IAppState } from "moke-state";
import { ArticleTypeActionCreator, ArticleActionCreator } from "moke-action-creator";
import { useParams } from "react-router";
import React from "react";
import { IArticle } from "moke-model";
import { ArticleService } from "moke-service";
import { mokeMapper } from "moke-mapper";

/* Create article page */
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

/* Edit article page */

const mapDispatchToEditProps = {
    fetchArticleTypeList: ArticleTypeActionCreator.fetchArticleTypeList,
    onSave: ArticleActionCreator.editArticle,
}

const ConnectedEditArticle = connect(mapStateToProps, mapDispatchToEditProps)(CreateNewArticleView);

class MiddleComponent extends React.Component<{ id: number }, { isLoading: boolean, dataSource?: IArticle }> {
    constructor(props: { id: number }) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    public componentDidMount() {
        ArticleService.getArticleById(this.props.id).then((data) => {
            this.setState({
                isLoading: false,
                dataSource: mokeMapper.mapArticleInfoToModel(data)
            });
        });
    }

    public render() {
        return (
            <React.Fragment>
                <ConnectedEditArticle dataSource={this.state.dataSource} />
            </React.Fragment>
        );
    }
}

const EditArticle: React.FunctionComponent = () => {
    const { id } = useParams();
    return <MiddleComponent id={parseInt(id || "")} />
}

export {
    CreateNewArticle,
    EditArticle,
}