import React from "react";
import { MokeBasicList, MokeLoadingPage, MokeArticleTemplate, MokeCardAsType } from "moke-components";
import { IArticleForDisplay } from "moke-model";
import { MokeNoDataTemplate } from "src/components/template/ModeNoDataTemplate";

interface IArticleViewMapStateToProps {
    articles?: IArticleForDisplay[];
}

interface IArticleViewMapDispatchToProps {
    fetchArticles?: () => Promise<void>;
}

export type IArticleViewProps = IArticleViewMapStateToProps & IArticleViewMapDispatchToProps;

interface IArticleViewState {
    isLoading: boolean;
}

export class ArticleView extends React.Component<IArticleViewProps, IArticleViewState> {
    constructor(props: IArticleViewProps) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    public componentDidMount() {
        this.props.fetchArticles!().then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    public render = () => {
        return (
            <React.Fragment>
                {
                    this.props.articles?.length === 0
                        ? <MokeNoDataTemplate />
                        : <MokeBasicList dataSource={this.getArticleList() || []} row={3} />
                }
                {this.state.isLoading
                    ? <MokeLoadingPage progress={!this.state.isLoading ? 100 : undefined} />
                    : null
                }
            </React.Fragment>
        )
    }

    public getArticleList = () => {
        return this.props.articles?.map((item, index) => {
            return <MokeArticleTemplate
                as={MokeCardAsType.button}
                id={`moke-article${index}`}
                dataSource={item}
                to={"/client/details"}
            />
        });
    }
}