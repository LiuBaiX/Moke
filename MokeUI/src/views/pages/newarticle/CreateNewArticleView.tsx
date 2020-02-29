import React from "react";
import { MokeArticleEditor, MokeCard } from "moke-components";
import { IArticleType, IArticle } from "moke-model";

interface ICreateNewArticleMapStateToProps {
    articleTypeList: IArticleType[];
}
interface ICreateNewArticleMapDispatchToProps {
    fetchArticleTypeList: () => Promise<void>;
    onSave: (dataSource: IArticle) => Promise<void>;
}
export type ICreateNewArticleProps = ICreateNewArticleMapDispatchToProps & ICreateNewArticleMapStateToProps;

interface ICreateNewArticleViewState {
    displaySmartTips: boolean;
    isLoading: boolean;
}

export class CreateNewArticleView extends React.Component<ICreateNewArticleProps, ICreateNewArticleViewState> {
    constructor(props: ICreateNewArticleProps) {
        super(props);
        //this.props.fetchArticleTypes();
        this.state = {
            displaySmartTips: true,
            isLoading: true,
        };
        this.props
            .fetchArticleTypeList()
            .then(() => {
                this.setState({
                    isLoading: false
                })
            })
    }
    public render = () => {
        return (
            <React.Fragment>
                {
                    this.state.isLoading
                        ? <MokeCard>
                            Loading...
                        </MokeCard>
                        : <MokeArticleEditor
                            onSave={(article) => {
                                return this.props.onSave(article);
                            }}
                            articleTypeList={this.props.articleTypeList}
                        />
                }
            </React.Fragment>
        )
    }
}