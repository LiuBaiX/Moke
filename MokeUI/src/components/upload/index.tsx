import React from "react";
import "./index.scss";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { FileMIMEType, ImageMIMEType, AudioMIMEType, VideoMIMEType, SubsidiaryType } from "moke-enum";

export interface IMokeUploadProps {
    type: SubsidiaryType;
    src: string;
    onChange: (newValue?: string, newFile?: File) => void;
}

type FileType = FileMIMEType | ImageMIMEType | AudioMIMEType | VideoMIMEType;

const mapSubsidiaryTypeToMIMEType = (type: SubsidiaryType): FileType[] => {
    switch (type) {
        case SubsidiaryType.Drawing:
            return [ImageMIMEType.Png, ImageMIMEType.Gif, ImageMIMEType.Jpg];
        case SubsidiaryType.Declaim:
            return [AudioMIMEType.Mp3]
        case SubsidiaryType.Music:
            return [AudioMIMEType.Mp3];
        default:
        case SubsidiaryType.Video:
            return [VideoMIMEType.Mp4];
    }
}

const getMIMETypeByFileType = (type: FileType) => {
    switch (type) {
        default:
        case FileMIMEType.All:
            return "image/*,audio/*,video/*";
        case FileMIMEType.Audio:
            return "audio/*";
        case FileMIMEType.Image:
            return "image/*";
        case FileMIMEType.Video:
            return "video/*";
        case ImageMIMEType.Gif:
            return "image/gif";
        case ImageMIMEType.Jpg:
            return "image/jpeg";
        case ImageMIMEType.Png:
            return "image/png";
        case AudioMIMEType.Mp3:
            return "audio/mp3";
        case VideoMIMEType.Mp4:
            return "audio/mp4";
    }
}

export const MokeUpload: React.FunctionComponent<IMokeUploadProps> = (props) => {
    const {
        type,
        src,
        onChange,
    } = props;

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const [isInputDisabled, setIsInputDisabled] = React.useState(false);

    const acceptFileMIME: string[] = mapSubsidiaryTypeToMIMEType(type).map((type) => {
        return getMIMETypeByFileType(type);
    });

    React.useEffect(() => {
        setIsButtonDisabled(false);
        setIsInputDisabled(false);
    }, [type]);

    return (
        <React.Fragment>
            <input
                id={"moke-upload-file-source"}
                type="file"
                className={"moke-upload-hidden"}
                accept={acceptFileMIME.join(",")}
                onChange={(event) => {
                    const fileInput = event.currentTarget;
                    const files = fileInput.files!;
                    if (files.length > 1) {
                        alert("当前仅支持单个文件上传！");
                        return;
                    }
                    if (acceptFileMIME.indexOf(files[0].type) !== -1) {
                        const newFile = files[0];
                        const filesName = newFile.name;
                        onChange(filesName, newFile);
                    } else {
                        alert("文件格式不符");
                        return;
                    }
                    setIsInputDisabled(files.length > 0);
                }} />
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="请输入文件完整URL"
                    value={src}
                    disabled={isInputDisabled}
                    title={src}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                        const value = event.currentTarget.value;
                        onChange(value);
                        if (value.length > 0) {
                            setIsButtonDisabled(true);
                        } else {
                            setIsButtonDisabled(false);
                        }
                    }}
                />
                <InputGroup.Append>
                    <Button
                        variant="outline-secondary"
                        disabled={isButtonDisabled}
                        onClick={() => {
                            document.getElementById("moke-upload-file-source")?.click();
                        }}
                    >上传</Button>
                </InputGroup.Append>
            </InputGroup>
            <span className="text-muted moke-upload-text-sm">支持文件MIME格式 : [ {
                acceptFileMIME.join("; ")
            } ]；如果输入完整URL，则无法使用上传功能；当前仅支持单个文件上传</span>
        </React.Fragment>
    );
}