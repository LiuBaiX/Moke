import React from "react";
import { MokeCard, MokeCardAsType, MokeArticleTemplate, MokeSubsidiaryDetailsTemplate, MokeInvitation } from "moke-components";
import { Row, Col, ListGroup, Table } from "react-bootstrap";
import "./index.scss";
import { IAppState } from "moke-state";
import { ArticleActionCreator } from "moke-action-creator";
import { connect } from "react-redux";
import { ArticleView } from "../article/ArticleView";

const mapStateToProps = ({ articles }: IAppState) => {
    return {
        articles: articles.myArticle.data
    }
}

const mapDispatchToProps = {
    fetchArticles: ArticleActionCreator.fetchMyArticles
}

const MyArticles = connect(mapStateToProps, mapDispatchToProps)(ArticleView);

export const CreateCenter: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <Row className="moke-create-center-card">
                <Col>
                    <MokeCard headerText={"我的作品"} styles={{
                        body: {
                            root: "moke-create-center-card-body"
                        }
                    }}>
                        <MyArticles />
                    </MokeCard>
                </Col>
            </Row>
            <Row className="moke-create-center-card">
                <Col>
                    <MokeCard headerText={"合著邀请函"}>
                        <MokeInvitation dataSource={[]} />
                    </MokeCard>
                </Col>
            </Row>
        </React.Fragment>
    );
}