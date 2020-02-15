import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import {
    Row} from 'react-bootstrap';

export interface IHomePageOwnProps {

}
export interface IHomePageMapStateToProps {
    test?: string
}
export interface IHomePageMapDispatchToProps {

}
type IHomePageProps = IHomePageOwnProps & IHomePageMapStateToProps & IHomePageMapDispatchToProps;

const mapStateToProps = ({ testString }: any) => {
    return {
        testString
    }
}


connect(mapStateToProps);

export default class HomePage extends React.Component<IHomePageProps>{
    constructor(props: IHomePageProps) {
        super(props);
        this.state = {

        }
    }
    public render(): JSX.Element {
        return (
            <Row>
                this is home.
            </Row>
        )
    }
}
