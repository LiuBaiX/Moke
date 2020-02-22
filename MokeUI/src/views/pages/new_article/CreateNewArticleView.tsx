import React from "react";
import { Row, Col, Form, FormGroup } from "react-bootstrap";
import { MokeCard, MokeFormLabel } from "moke-components";

interface ICreateNewArticleMapStateToProps {

}

interface ICreateNewArticleMapDispatchToProps {

}
export type ICreateNewArticleProps = ICreateNewArticleMapDispatchToProps & ICreateNewArticleMapStateToProps;

export interface ICreateState {
}

export class CreateNewArticleView extends React.Component<ICreateNewArticleProps, ICreateState> {
    constructor(props: ICreateNewArticleProps) {
        super(props);
        //this.props.fetchArticleTypes();
    }
    public render = () => {
        return (
            <React.Fragment>
                <MokeCard headerText={"开始创作"} onRenderBody={this.renderCardBody} />
            </React.Fragment>
        )
    }

    private renderCardBody = (): JSX.Element => {
        return (
            <React.Fragment>
                <Form>
                    <Form.Row>
                        <FormGroup as={Col}>
                            <MokeFormLabel required={true} text={"作品名"} />
                            <Form.Control placeholder={"请输入作品名"} />
                        </FormGroup>
                        <Form.Group as={Col}>
                            <MokeFormLabel required={true} text={"作品类型"} />
                            <Form.Control as="select">
                                {[].map((item: any, index) => {
                                    return <option key={index}>{item.type_name}</option>;
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <FormGroup as={Col}>
                            <MokeFormLabel text={"作品描述"} />
                            <Form.Control as={"textarea"} placeholder={"请输入作品描述"} />
                        </FormGroup>
                    </Form.Row>
                    <Form.Row>

                    </Form.Row>
                </Form>
            </React.Fragment>
        );
    }
}