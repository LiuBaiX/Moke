import React from "react";
import { Col, Row } from "react-bootstrap";
import "./index.scss";

export interface IMokeBasicListProps {
    dataSource: JSX.Element[];
    row: number;
}

export const MokeBasicList = (props: IMokeBasicListProps): JSX.Element => {
    const wrapperComponents = [];
    for (let i = 0; i < props.dataSource.length; i += props.row) {
        const row = [];
        for (let j = 0; j < props.row; j++) {
            if (i + j === props.dataSource.length) {
                break;
            }
            row.push(
                <Col md={12 / props.row} key={j}>{props.dataSource[i + j]}</Col>
            );
        }
        if (row.length === 0) {
            break;
        }
        wrapperComponents.push(
            <Row className={"moke-basic-list-row"} key={i}>{row}</Row>
        );
    }

    return <React.Fragment>{wrapperComponents}</React.Fragment>;
}