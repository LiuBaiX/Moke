import React, { createRef } from "react";
import { Form } from "react-bootstrap";
import { IUser } from "moke-model";

export interface IMokePeoplePickerProps {
    fetchUserData: (id: string[]) => Promise<IUser>;
}

export class MokePeoplePicker extends React.Component<IMokePeoplePickerProps> {
    private inputRef: React.RefObject<any>;

    constructor(props: IMokePeoplePickerProps) {
        super(props);
        this.inputRef = createRef();
    }

    public render() {
        return (
            <Form.Control
                ref={this.inputRef}
            />
        );
    }
}