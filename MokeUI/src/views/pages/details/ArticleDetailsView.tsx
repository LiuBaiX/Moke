import React from "react";
import { ArticleService, SubsidiaryService } from "moke-service";
import { mokeMapper } from "moke-mapper";
import { IArticleForDisplay, ISubsidiary, IInvitationRequest, IUser, IInvitationResponse } from "moke-model";
import { MokeLoadingPage, MokeArticleDetailsTemplate, MokeSubsidiaryDetailsTemplate } from "moke-components";
import { Row, Col } from "react-bootstrap";
import "./index.scss";
import { IBasePicker, IPersonaProps } from "office-ui-fabric-react";

interface IArticleDetailsViewOwnProps {
    id: string;
    uid?: number;
}

interface IArticleDetailsViewState {
    isLoading: boolean;
    articleDataSource?: IArticleForDisplay;
    subsidiaryDataSource?: ISubsidiary[];
}

interface IArticleDetailsViewMapDispatchToProps {
    onSubmitInvitation?: (data: IInvitationRequest) => Promise<IInvitationResponse>;
    fetchUserDataByFuzzyName?: (fuzzyName: string) => Promise<IUser[]>;
}

export type IArticleDetailsViewProps = IArticleDetailsViewOwnProps
    & IArticleDetailsViewMapDispatchToProps;

export class ArticleDetailsView extends React.Component<IArticleDetailsViewProps, IArticleDetailsViewState> {
    private pickerRef: React.RefObject<IBasePicker<IPersonaProps>>;
    constructor(props: IArticleDetailsViewProps) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.pickerRef = React.createRef();
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
                                    <MokeSubsidiaryDetailsTemplate
                                        isDisplayInviteButton={
                                            this.props.uid?.toString() === this.state.articleDataSource?.authorId
                                        }
                                        dataSource={this.state.subsidiaryDataSource!}
                                        fetchUserDataByFuzzyName={this.props.fetchUserDataByFuzzyName}
                                        onSubmit={(description: string) => {
                                            const dataSource: IInvitationRequest = {
                                                from: this.props.uid!.toString(),
                                                to: this.pickerRef.current?.items?.map((item) => item.optionalText).join(";") as string,
                                                description,
                                                ref: this.state.articleDataSource?.articleId!.toString(),
                                            };
                                            console.log(this.pickerRef.current?.items);
                                            return this.props.onSubmitInvitation!(dataSource);
                                        }}
                                        pickerRef={this.pickerRef}
                                    />
                                </Col>
                            </Row>
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}