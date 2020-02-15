import React from "react";
import { Modal } from "react-bootstrap";

export interface MokeModalProps {
    title: string;
    content: React.ReactElement;
    footer: React.ReactElement;
    isOpen: boolean;
}

export class MokeModal extends React.Component<MokeModalProps>{
    public render() {
        return (
            <Modal show={this.props.isOpen}>
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