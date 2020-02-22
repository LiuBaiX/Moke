import React from "react";
import { Form, } from "react-bootstrap";

export interface IMokeFormLabelProps {
    className?: string;
    text?: string;
    required?: boolean;
}

const MokeFormLabel = (props: IMokeFormLabelProps) => {
    return (
        <Form.Label className={props.className}>
            <b>{props.text} <span className="text-danger">{props.required ? "*" : null}</span></b>
        </Form.Label>
    );
}

export {
    MokeFormLabel
}