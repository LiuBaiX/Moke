import React from "react";
import { Card } from "react-bootstrap";

export interface IMokeCardProps {
    as?: MokeCardAsType;
    headerText?: string;
    footerText?: string;
    bodyTitle?: string;
    bodyContent?: string;
    onRenderHeader?: () => JSX.Element;
    onRenderFooter?: () => JSX.Element;
    onRenderBody?: () => JSX.Element;
    styles?: IMokeCardStyle;
    onClick?: (event?: React.MouseEvent) => void;
}

export enum MokeCardAsType {
    none = 0,
    button = 1,
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
        const { children } = this.props;
        const content = <React.Fragment>
            {this.renderHeader()}
            <Card.Body className={this.props.styles?.body?.root}>
                {this.renderBody()}
                {children}
            </Card.Body>
            {this.renderFooter()}
        </React.Fragment>

        return this.renderComponentAs(content, this.props.as || MokeCardAsType.none);
    }

    private renderComponentAs = (content: React.ReactNode, type: MokeCardAsType): JSX.Element => {
        switch (type) {
            case MokeCardAsType.button:
                return <button className={`card ${this.props.styles?.root}`}
                    onClick={this.props.onClick}>
                    {content}
                </button>;
            case MokeCardAsType.none: default:
                return <Card className={`card ${this.props.styles?.root}`}>
                    {content}
                </Card>;
        }
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
            ? this.props.onRenderBody()
            : <React.Fragment>
                {this.renderTitle()}
                {this.renderContent()}
            </React.Fragment>
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