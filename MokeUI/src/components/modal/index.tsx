import React from "react";
import { Modal } from "react-bootstrap";

export interface IMokeModalProps {
    title: string;
    content: React.ReactElement;
    footer: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export class MokeModal extends React.Component<IMokeModalProps>{
    public render() {
        return (
            <Modal show={this.props.isOpen}
                onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.content}
                </Modal.Body>
                <Modal.Footer>
                    {this.props.footer}
                </Modal.Footer>
            </Modal>
        );
    }
}