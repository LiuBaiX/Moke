import React from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";

export interface IMokeTooltipProps {
    id: string;
    headerText: string;
    content: string;
}

export const MokeTooltip: React.FunctionComponent<IMokeTooltipProps> = (props) => {
    const overlay = (
        <Popover id={props.id}>
            <Popover.Title as="h3">{props.headerText}</Popover.Title>
            <Popover.Content>
                {props.content}
            </Popover.Content>
        </Popover>
    );
    return (
        <OverlayTrigger overlay={overlay}>
            {props.children}
        </OverlayTrigger>
    );
}