import React from "react";
import { Card } from "react-bootstrap";

export interface IMokeCardProps {
    headerText?: string;
    footerText?: string;
    bodyTitle?: string;
    bodyContent?: string;
    onRenderHeader?: () => JSX.Element;
    onRenderFooter?: () => JSX.Element;
    onRenderBody?: () => JSX.Element;
    styles?: IMokeCardStyle;
}

interface IMokeCardStyle {
    root?: string;
    header?: string;
    body?: IMokeCardBodyStyle;
    footer?: string;
}

interface IMokeCardBodyStyle {
    root?: string;
    title?: string;
    content?: string;
}

export class MokeCard extends React.Component<IMokeCardProps>{

    public render() {
        return (
            <Card className={this.props.styles?.root}>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </Card>
        );
    }

    private renderHeader = () => {
        return this.props.onRenderHeader || this.props.headerText
            ? <Card.Header className={this.props.styles?.header}>
                <b>{this.props.headerText}</b>
                {
                    this.props.onRenderHeader
                        ? this.props.onRenderHeader()
                        : null
                }
            </Card.Header>
            : null;
    }

    private renderFooter = () => {
        return this.props.onRenderFooter || this.props.footerText
            ? <Card.Footer className={`text-muted ${this.props.styles?.footer}`}>
                {this.props.footerText}
                {
                    this.props.onRenderFooter
                        ? this.props.onRenderFooter()
                        : null
                }
            </Card.Footer>
            : null;
    }

    private renderBody = () => {
        return this.props.onRenderBody
            ? <Card.Body className={`text-muted text-center ${this.props.styles?.body?.root}`}>
                {this.props.onRenderBody()}
            </Card.Body>
            : <Card.Body className={`text-muted text-center ${this.props.styles?.body?.root}`}>
                {this.renderTitle()}
                {this.renderContent()}
            </Card.Body>;
    }

    private renderTitle = () => {
        return this.props.bodyTitle
            ? <Card.Title className={this.props.styles?.body?.title}>
                {this.props.bodyTitle}
            </Card.Title>
            : null;
    }

    private renderContent = () => {
        return this.props.bodyContent
            ? <Card.Text className={this.props.styles?.body?.content}>
                {this.props.bodyContent}
            </Card.Text>
            : null;
    }
}