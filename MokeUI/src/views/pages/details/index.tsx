import React from "react";
import { ArticleDetailsView } from "./ArticleDetailsView";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { InvitationActionCreator, UserActionCreator, ArticleActionCreator } from "moke-action-creator";
import { IAppState } from "moke-state";

const mapStateToProps = ({ user }: IAppState) => {
    return {
        uid: user.uid
    };
}

const mapDispatchToProps = () => {
    return {
        onSubmitInvitation: InvitationActionCreator.sendInvitation,
        fetchUserDataByFuzzyName: UserActionCreator.fetchUserDataByFuzzyName,
        deleteArticle: ArticleActionCreator.deleteMyArticle
    };
}

const MiddleComponent = connect(mapStateToProps, mapDispatchToProps)(ArticleDetailsView);

export const ArticleDetails: React.FunctionComponent = () => {
    const { id } = useParams();
    return <MiddleComponent id={id || "1"} />;
}