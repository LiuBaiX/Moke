import React from "react";
import { ProgressBar } from "react-bootstrap";

interface IMokeLoadingPageProps {
    progress?: number;
}

interface IMokeLoadingPageState {
    progress: number;
}

export class MokeLoadingPage extends React.Component<IMokeLoadingPageProps, IMokeLoadingPageState>{
    private timeId!: number;

    constructor(props: IMokeLoadingPageProps) {
        super(props);
        this.state = {
            progress: 20
        };
    }

    public componentDidMount() {
        this.timeId = setInterval(() => {
            this.setState({
                progress: this.state.progress + 1
            });
        }, 100);
    }

    public componentWillUnmount() {
        clearInterval(this.timeId);
        this.setState({
            progress: 100
        });
    }

    public render() {
        return (
            <React.Fragment>
                <ProgressBar animated now={this.props.progress || this.state.progress} />
            </React.Fragment>
        );
    }
}