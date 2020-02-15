import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import TypeService from "../../../api/service/TypeService";

export interface ICreateProps {

}
export interface ICreateState {
    typeList: string[];
}

export default class Create extends React.Component<ICreateProps, ICreateState> {
    constructor(props: ICreateProps) {
        super(props);
        this.state = {
            typeList: [],
        };
        this.fetchData();
    }
    public render = () => {
        console.log(this.state.typeList);
        const type = [...this.state.typeList];
       
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <h2>选择类型</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Control as="select">
                                {type.map((item:any, index) => {
                                    return <option key={index}>{item.type_name}</option>;
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }

    private fetchData = () => {
        TypeService
            .getType()
            .then(({data}) => {
                console.log(data);
                this.setState({ typeList: data });
            })
    }
}