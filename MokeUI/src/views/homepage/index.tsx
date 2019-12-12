import React from 'react';
import './index.scss';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IHomePageState } from '../../redux/state/IHomePageState';
import reducer from '../../redux/reducer';

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

const mapDispatchToProps = () => {
    return reducer
}

connect(mapStateToProps);

export default class HomePage extends React.Component<IHomePageProps>{
    constructor(props: IHomePageProps) {
        super(props);
    }
    public render(): JSX.Element {
        return (
            <div>
                this is HomePage.
                {this.props.test}
            </div>
        )
    }
}
