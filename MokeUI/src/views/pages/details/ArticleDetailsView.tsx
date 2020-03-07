import React from "react";
import { ArticleService, SubsidiaryService } from "moke-service";
import { mokeMapper } from "moke-mapper";
import { IArticleForDisplay, ISubsidiary } from "moke-model";
import { MokeLoadingPage, MokeArticleDetailsTemplate, MokeSubsidiaryDetailsTemplate } from "moke-components";
import { Row, Col } from "react-bootstrap";
import "./index.scss";

interface IArticleDetailsViewOwnProps {
    id: string
}

interface IArticleDetailsViewState {
    isLoading: boolean;
    articleDataSource?: IArticleForDisplay;
    subsidiaryDataSource?: ISubsidiary[];
}

export class ArticleDetailsView extends React.Component<IArticleDetailsViewOwnProps, IArticleDetailsViewState> {
    constructor(props: IArticleDetailsViewOwnProps) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    public componentDidMount() {
        const fetchSubsidiariesPromise = SubsidiaryService.getSubsidiariesByArticleId(this.props.id || "")
            .then((subsidiaries) => {
                return subsidiaries.map((item) => {
                    return mokeMapper.mapSubsidiaryInfoToModel(item);
                });
            });
        const fetchArticlePromise = ArticleService.getDisplayArticleById(parseInt(this.props.id || ""))
            .then((data) => {
                return mokeMapper.mapDisplayArticleInfoToModel(data);
            });
        Promise.all([fetchArticlePromise, fetchSubsidiariesPromise])
            .then((data) => {
                this.setState({
                    isLoading: false,
                    articleDataSource: data[0],
                    subsidiaryDataSource: data[1],
                });
            });

    }

    public render() {
        return (
            <React.Fragment>
                {
                    this.state.isLoading
                        ? <MokeLoadingPage progress={this.state.isLoading ? undefined : 100} />
                        : <React.Fragment>
                            <Row className="moke-article-details-margin-bottom">
                                <Col>
                                    <MokeArticleDetailsTemplate dataSource={this.state.articleDataSource!} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <MokeSubsidiaryDetailsTemplate dataSource={this.state.subsidiaryDataSource!} />
                                </Col>
                            </Row>
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}