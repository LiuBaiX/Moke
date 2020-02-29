import React from "react";
import {
    Col,
    Form,
    FormGroup,
    Button,
    ButtonGroup,
    Spinner,
} from "react-bootstrap";
import {
    MokeCard,
    MokeFormLabel
} from "moke-components";
import "./index.scss";
import { IArticleType, IArticleSubType, IArticle } from "moke-model";

interface IMokeArticleEditorViewOwnProps {
    dataSource?: IArticle;
    onSave: (article: IArticle) => Promise<void>;
    articleTypeList: IArticleType[];
};

interface IMokeArticleEditorViewMapDispatchToProps {
    fetchArticleSubTypeList: (id: number) => Promise<IArticleSubType[]>;
}

interface IMokeArticleEditorViewState {
    displaySmartTips: boolean;
    articleSubTypeList?: IArticleSubType[];
    isArticleSubTypeLoading: boolean;
    isSaving: boolean;
    error: IMokeArticleEditorViewError;
}

interface IMokeArticleEditorViewError {
    isNameNull: boolean;
}

export type IMokeArticleEditorProps =
    IMokeArticleEditorViewOwnProps
    & IMokeArticleEditorViewMapDispatchToProps;

export class MokeArticleEditorView extends React.Component<IMokeArticleEditorProps, IMokeArticleEditorViewState> {
    private nameFormControl: React.RefObject<any>;
    private descriptionFormControl: React.RefObject<any>;
    private typeFormSelect: React.RefObject<any>;
    private subTypeFormSelect: React.RefObject<any>;
    private isPublicFormChecked: React.RefObject<any>;
    private contentFormControl: React.RefObject<any>;

    constructor(props: IMokeArticleEditorProps) {
        super(props);
        this.state = {
            displaySmartTips: true,
            isArticleSubTypeLoading: false,
            isSaving: false,
            error: {
                isNameNull: false,
            },
            articleSubTypeList: []
        };
        this.nameFormControl = React.createRef();
        this.descriptionFormControl = React.createRef();
        this.typeFormSelect = React.createRef();
        this.subTypeFormSelect = React.createRef();
        this.isPublicFormChecked = React.createRef();
        this.contentFormControl = React.createRef();
        if (this.props.dataSource?.articleSubType) {
            this.props
                .fetchArticleSubTypeList(this.props.dataSource.articleType)
                .then((data) => {
                    this.setState({
                        articleSubTypeList: data,
                    });
                });
        } else {
            this.props
                .fetchArticleSubTypeList(1)
                .then((data) => {
                    this.setState({
                        articleSubTypeList: data,
                    });
                });
        }
    }
    public render = () => {
        return (
            <React.Fragment>
                <MokeCard>
                    {this.renderCardBody()}
                </MokeCard>
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
                            <Form.Row>
                                <FormGroup as={Col}>
                                    <Form.Control
                                        placeholder={"请输入作品名"}
                                        defaultValue={this.props.dataSource?.name}
                                        ref={this.nameFormControl}
                                        isInvalid={this.state.error.isNameNull}
                                        onChange={() => {
                                            this.setState({
                                                error: {
                                                    isNameNull: false
                                                }
                                            });
                                        }} />
                                    {
                                        this.state.error.isNameNull
                                            ? <Form.Control.Feedback type={"invalid"}>作品名不得为空！</Form.Control.Feedback>
                                            : null
                                    }
                                </FormGroup>
                                <FormGroup as={Col}>
                                    <Form.Check
                                        id="moke-new-article-switch-article"
                                        className="float-right"
                                        inline
                                        type="switch"
                                        label="设为私有"
                                        checked={this.props.dataSource?.isPublic}
                                        ref={this.isPublicFormChecked}
                                    />
                                </FormGroup>
                            </Form.Row>
                        </FormGroup>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <MokeFormLabel
                                required={true}
                                text={"作品类型"}
                            />
                            <Form.Control
                                as="select"
                                ref={this.typeFormSelect}
                                value={this.props.dataSource?.articleType.toString()}
                                onChange={() => {
                                    this.setState({
                                        isArticleSubTypeLoading: true
                                    });
                                    this.props
                                        .fetchArticleSubTypeList(this.typeFormSelect.current.value)
                                        .then((data) => {
                                            this.setState({
                                                articleSubTypeList: data,
                                                isArticleSubTypeLoading: false
                                            });
                                        })
                                }}>
                                {this.props.articleTypeList.map((item: IArticleType, index) => {
                                    return <option
                                        value={item.tid}
                                        key={index}>
                                        {item.displayName}
                                    </option>;
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <MokeFormLabel
                                required={true}
                                text={"子类型"}
                                isLoading={this.state.isArticleSubTypeLoading} />
                            <Form.Control
                                as="select"
                                ref={this.subTypeFormSelect}
                                disabled={this.state.isArticleSubTypeLoading
                                    || this.state.articleSubTypeList?.length === 0}
                                defaultValue={this.props.dataSource?.articleSubType?.toString()}>
                                {
                                    this.state.articleSubTypeList?.length === 0
                                        ? <option>该分类下无子分类</option>
                                        : this.state.articleSubTypeList?.map((item: IArticleSubType, index) => {
                                            return <option
                                                value={item.tid}
                                                key={index}>
                                                {item.displayName}
                                            </option>;
                                        })
                                }
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <FormGroup as={Col}>
                            <MokeFormLabel text={"作品描述"} />
                            <Form.Control
                                as={"textarea"}
                                placeholder={"请输入作品描述"}
                                defaultValue={this.props.dataSource?.description}
                                ref={this.descriptionFormControl} />
                        </FormGroup>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <MokeFormLabel text={"开始创作"} />
                            <Form.Check inline
                                id="moke-new-article-switch-template"
                                type="switch"
                                className="float-right"
                                label="打开智能提示模板"
                                checked={this.state.displaySmartTips}
                                onChange={() => {
                                    this.setState({
                                        displaySmartTips: !this.state.displaySmartTips
                                    });
                                }}
                            />
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Control
                                        as={"textarea"}
                                        rows={9}
                                        value={this.props.dataSource?.content}
                                        ref={this.contentFormControl}
                                    />
                                </Form.Group>
                                {
                                    this.state.displaySmartTips
                                        ? this.renderSmartTips()
                                        : null
                                }
                            </Form.Row>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <div className="moke-article-editor-footer">
                    <div className="moke-article-editor-spinner-container">
                        {this.state.isSaving ? this.renderSpinnerOnSubmit() : null}
                    </div>
                    <ButtonGroup>
                        <Button
                            variant="outline-success"
                            onClick={() => {
                                this.onSave();
                            }}>
                            发布
                        </Button>
                    </ButtonGroup>
                </div>
            </React.Fragment>
        );
    }

    private renderSmartTips = (): JSX.Element => {
        return (
            <Form.Group as={Col} md={4}>
                <Form.Control readOnly
                    as={"textarea"}
                    rows={9}
                    value={""} />
            </Form.Group>
        );
    }

    private validateData = (): boolean => {
        const name = this.nameFormControl.current.value;

        this.setState({
            error: {
                isNameNull: !!!name
            }
        })

        return !!name;
    }

    private onSave = (): void => {
        if (!this.validateData()) {
            return;
        }
        this.setState({
            isSaving: true,
        });
        const dataSource: IArticle = {
            isPublic: this.isPublicFormChecked.current.checked,
            name: this.nameFormControl.current.value,
            description: this.descriptionFormControl.current.value,
            articleType: this.typeFormSelect.current.value,
            articleSubType: this.subTypeFormSelect.current.value,
            content: this.contentFormControl.current.value,
        }
        console.log(dataSource);
        this.props.onSave(dataSource).then(() => {
            this.setState({
                isSaving: false,
            });
        });
    }

    private renderSpinnerOnSubmit = (): JSX.Element => {
        return (
            <React.Fragment>
                <Spinner animation="border" />
                <b className="text-dark moke-article-editor-spinner-text">文章本天成，妙手偶得之...</b>
            </React.Fragment>
        );
    }
}