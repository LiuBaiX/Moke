import React from "react";
import { ArticleDetailsView } from "./ArticleDetailsView";
import { useParams } from "react-router";

export const ArticleDetails: React.FunctionComponent = () => {
    const { id } = useParams();
    return <ArticleDetailsView id={id || "1"} />;
}