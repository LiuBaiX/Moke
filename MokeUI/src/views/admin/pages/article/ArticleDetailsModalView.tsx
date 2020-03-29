import React from "react";
import { MokeModal } from "moke-components"
import { Button, Spinner, Badge } from "react-bootstrap";
import { IArticleForDisplay } from "moke-model";
import { SimpleString } from "moke-util";

interface IArticleModalViewProps {
    isOpen: boolean;
    dataSource: IArticleForDisplay;
    onClose: () => void;
    onAccept: (id: string) => Promise<void>;
}

interface IArticleModalViewState {
    isLoading: boolean;
}

export class ArticleDetailsModalView extends React.Component<IArticleModalViewProps, IArticleModalViewState>{
    constructor(props: IArticleModalViewProps) {
        super(props);
        this.state = { isLoading: false };
    }

    public render() {
        return (
            <MokeModal
                isOpen={this.props.isOpen}
                title={"登录"}
                content={this.renderContent()}
                footer={this.renderFooter()}
                onClose={this.props.onClose} />
        );
    }

    private renderContent = () => {
        const { dataSource } = this.props;
        return (
            <React.Fragment>
                <div className={"moke-article-details-template"}>
                    <h4>
                        {dataSource.name} <Badge variant="info">{dataSource.articleTypeDisplayName}</Badge> <Badge variant="info">{dataSource.articleSubTypeDisplayName}</Badge>
                    </h4>
                    <p className="text-muted">
                        {dataSource.authorDisplayName} 作于 {dataSource.createdDate} 字数{SimpleString.getStringLength(dataSource.content || "")}
                    </p>
                    <p>
                        {
                            dataSource.content
                        }
                    </p>
                </div>
            </React.Fragment>
        );
    }

    private renderFooter = () => {
        return (
            <React.Fragment>
                <Button
                    className="login-modal-button-login"
                    variant="outline-success"
                    onClick={() => {
                        this.setState({
                            isLoading: true
                        });
                        this.props.onAccept(this.props.dataSource.articleId.toString()).then(() => {
                            this.setState({
                                isLoading: false
                            });
                            this.props.onClose();
                        });
                    }}
                    disabled={this.state.isLoading}
                >
                    {
                        this.state.isLoading
                            ? this.renderSpinner()
                            : "审核通过"
                    }
                </Button>
            </React.Fragment>
        );
    }

    private renderSpinner = () => {
        return (
            <Spinner animation="border" role="status" size="sm">
                <span className="sr-only">Loading...</span>
            </Spinner>
        );
    }
}