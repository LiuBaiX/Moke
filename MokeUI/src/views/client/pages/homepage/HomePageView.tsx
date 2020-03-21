import React from 'react';
import {
    Jumbotron, Container
} from 'react-bootstrap';
import './index.scss';

export interface IHomePageProps {
    username?: string;
}

export class HomePageView extends React.Component<IHomePageProps>{
    public render(): JSX.Element {
        return (
            <Jumbotron fluid>
                <Container className="text-muted">
                    <h2>亲爱的 {this.props.username} ，欢迎回到 墨客 ~</h2>
                </Container>
            </Jumbotron>
        )
    }
}
