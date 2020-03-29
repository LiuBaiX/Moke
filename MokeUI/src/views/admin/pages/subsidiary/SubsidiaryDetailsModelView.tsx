import React from "react";
import { MokeModal } from "moke-components"
import { Button, Spinner } from "react-bootstrap";
import { MokeVideoTemplate } from "src/components/template/MokeVideoTemplate";
import { MokeImageTemplate } from "src/components/template/MokeImageTemplate";
import { MokeAudioTemplate } from "src/components/template/MokeAudioTemplate";
import { MokeAppreciationTemplate } from "src/components/template/MokeAppreciationTemplate";
import { ISubsidiary } from "moke-model";
import { SubsidiaryType } from "moke-enum";

interface ILoginModalViewProps {
    isOpen: boolean;
    dataSource: ISubsidiary;
    onClose: () => void;
    onAccept: (id: string) => Promise<void>;
}

interface ILoginModalViewState {
    isLoading: boolean;
}

export class SubsidiaryDetailsModalView extends React.Component<ILoginModalViewProps, ILoginModalViewState>{
    constructor(props: ILoginModalViewProps) {
        super(props);
        this.state = { isLoading: false };
    }

    public render() {
        return (
            <MokeModal
                isOpen={this.props.isOpen}
                title={"登录"}
                content={this.renderContent()}
                footer={this.renderFooter()}
                onClose={this.props.onClose} />
        );
    }

    private renderContent = () => {
        return (
            <React.Fragment>
                {
                    this.props.dataSource
                        ? this.renderDetails(this.props.dataSource)
                        : null
                }
            </React.Fragment>
        );
    }

    private renderFooter = () => {
        return (
            <React.Fragment>
                <Button
                    className="login-modal-button-login"
                    variant="outline-success"
                    onClick={() => {
                        this.setState({
                            isLoading: true
                        });
                        this.props.onAccept(this.props.dataSource.subsidiaryId).then(() => {
                            this.setState({
                                isLoading: false
                            });
                            this.props.onClose();
                        });
                    }}
                    disabled={this.state.isLoading}
                >
                    {
                        this.state.isLoading
                            ? this.renderSpinner()
                            : "审核通过"
                    }
                </Button>
            </React.Fragment>
        );
    }

    private renderSpinner = () => {
        return (
            <Spinner animation="border" role="status" size="sm">
                <span className="sr-only">Loading...</span>
            </Spinner>
        );
    }

    private renderDetails = (dataSource: ISubsidiary): JSX.Element => {
        switch (dataSource.type) {
            case SubsidiaryType.Video:
                return <MokeVideoTemplate dataSource={dataSource} />;
            case SubsidiaryType.Drawing:
                return <MokeImageTemplate dataSource={dataSource} />;
            case SubsidiaryType.Declaim:
                return <MokeAudioTemplate dataSource={dataSource} />;
            case SubsidiaryType.Appreciation:
                return <MokeAppreciationTemplate dataSource={dataSource} />;
            case SubsidiaryType.Music:
                return <MokeAudioTemplate dataSource={dataSource} />;
            default:
                return <div />;
        }
    }
}