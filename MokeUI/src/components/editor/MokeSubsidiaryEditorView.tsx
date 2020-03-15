import React, { useState } from "react";
import { Form, FormGroup, Col, ButtonGroup, Button, Spinner } from "react-bootstrap";
import { MokeFormLabel } from "../label";
import { ISubsidiary, ISubsidiaryForm, ICommonResponseInfo } from "moke-model";
import { SubsidiaryType, ResponseStatusType } from "moke-enum";
import { MokeUpload } from "moke-components";
import { SimpleSession, SimpleString } from "moke-util";
import { useParams, useHistory } from "react-router";

export interface IMokeSubsidiaryEditorViewProps {
    dataSource?: ISubsidiary;
    onSubmit: (data: ISubsidiaryForm) => Promise<ICommonResponseInfo>;
}

export const MokeSubsidiaryEditorView: React.FunctionComponent<IMokeSubsidiaryEditorViewProps> = (props) => {
    const { dataSource } = props;

    const { id, invitationId } = useParams<{ id: string, invitationId: string }>();
    const history = useHistory();

    const [type, setType] = useState(dataSource?.type || SubsidiaryType.Appreciation);
    const [title, setTitle] = useState(dataSource?.title || "");
    const [src, setSrc] = React.useState(dataSource?.src || "");
    const [content, setContent] = React.useState(dataSource?.content || "");
    const [file, setFile] = React.useState<File>();
    const [isSaving, setIsSaving] = React.useState(false);

    React.useEffect(() => {
        setSrc("");
    }, [type]);

    return (
        <React.Fragment>
            <Form>
                <Form.Row>
                    <FormGroup as={Col}>
                        <MokeFormLabel required={true} text={"作品名"} />
                        <Form.Row>
                            <FormGroup as={Col}>
                                <Form.Control
                                    as="input"
                                    placeholder={"请输入作品名"}
                                    value={title}
                                    onChange={(event) => {
                                        const newValue = event.currentTarget.value;
                                        setTitle(newValue);
                                    }} />
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
                            onChange={(event) => {
                                const type = event.currentTarget.value;
                                setType(parseInt(type));
                            }}>
                            <option value={SubsidiaryType.Appreciation}>鉴赏</option>
                            <option value={SubsidiaryType.Declaim}>朗诵</option>
                            <option value={SubsidiaryType.Music}>音乐</option>
                            <option value={SubsidiaryType.Drawing}>绘画</option>
                            <option value={SubsidiaryType.Video}>视频</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <MokeFormLabel text={"开始创作"} />
                        {
                            type === SubsidiaryType.Appreciation
                                ? <Form.Control
                                    as={"textarea"}
                                    rows={9}
                                    value={content}
                                    onChange={(event) => {
                                        const newValue = event.currentTarget.value;
                                        setContent(newValue);
                                    }}
                                />
                                : <MokeUpload
                                    src={src}
                                    type={type}
                                    onChange={(newValue, newFile) => {
                                        setSrc(newValue || "");
                                        if (newFile) {
                                            setFile(newFile);
                                            setSrc(newFile.name);
                                        }
                                    }} />
                        }
                    </Form.Group>
                </Form.Row>
            </Form>
            <div className="moke-article-editor-footer">
                <div className="moke-article-editor-spinner-container">
                    {isSaving
                        ? <React.Fragment>
                            <Spinner animation="border" />
                            <b className="text-dark moke-article-editor-spinner-text">文章本天成，妙手偶得之...</b>
                        </React.Fragment>
                        : null
                    }
                </div>
                <ButtonGroup>
                    <Button
                        variant="outline-success"
                        onClick={() => {
                            if (title === "") {
                                alert("标题不能为空！");
                                return;
                            }
                            if (type === SubsidiaryType.Appreciation && SimpleString.getStringLength(content) < 30) {
                                alert("内容不得少于30字，不含标点符号");
                                return;
                            }
                            const data: ISubsidiaryForm = {
                                uid: SimpleSession.getSession("user")?.uid,
                                articleId: id,
                                invitationId,
                                title,
                                content,
                                src,
                                file,
                                type,
                            };
                            setIsSaving(true);
                            props.onSubmit(data).then((data) => {
                                if (data.status === ResponseStatusType.Success) {
                                    alert(`操作成功，服务器返回消息：${data.message}`);
                                } else {
                                    alert(`操作失败，服务器返回消息：${data.message}`);
                                }
                                setIsSaving(false);
                                history.push(`/details/${id}`);
                            });
                        }}
                    >保存</Button>
                </ButtonGroup>
            </div>
        </React.Fragment>
    );
}