import React from "react";
import { Form, Spinner, } from "react-bootstrap";
import "./index.scss";

export interface IMokeFormLabelProps {
    className?: string;
    text?: string;
    required?: boolean;
    isLoading?: boolean;
}

const MokeFormLabel = (props: IMokeFormLabelProps) => {
    const spinner = (
        <React.Fragment>
            <div className={"moke-label-spinner-container float-right"}>
                <Spinner animation={"border"} size={"sm"} />
                <b className={"moke-label-spinner-loading-text"}>加载中...</b>
            </div>
        </React.Fragment>
    )
    return (
        <Form.Label className={`${props.className} moke-label-container`}>
            <b>{props.text} <span className="text-danger">{props.required ? "*" : null}</span></b>
            {props.isLoading ? spinner : null}
        </Form.Label>
    );
}

export {
    MokeFormLabel
}