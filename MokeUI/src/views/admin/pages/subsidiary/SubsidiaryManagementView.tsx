import React from "react";
import { Table, Button } from "react-bootstrap";
import { SubsidiaryDetailsModalView } from "./SubsidiaryDetailsModelView";
import { ISubsidiary } from "moke-model";

export interface ISubsidiaryManagementViewProps {
    dataSource?: ISubsidiary[];
    fetchSubsidiaries?: () => Promise<ISubsidiary[]>;
    onAccept?: (id: string) => Promise<void>;
}

export const SubsidiaryManagementView: React.FunctionComponent<ISubsidiaryManagementViewProps> = (props) => {
    const {
        dataSource,
        onAccept,
        fetchSubsidiaries,
    } = props;

    const [data, setData] = React.useState<ISubsidiary>();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        fetchSubsidiaries!();
    }, []);

    return (
        <React.Fragment>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>作品名</th>
                        <th>作者</th>
                        <th>创作时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                {
                    dataSource?.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.subsidiaryId}</td>
                                <td>{item.title}</td>
                                <td>ID:{item.authorId} Name:{item.authorDisplayName}</td>
                                <td>{item.createDate}</td>
                                <td>
                                    <Button
                                        variant="outline-warning"
                                        onClick={() => {
                                            setData(item);
                                            setIsOpen(true);
                                        }}
                                    >详情</Button>
                                </td>
                            </tr>
                        );
                    })
                }
            </Table>
            <SubsidiaryDetailsModalView
                dataSource={data!}
                isOpen={isOpen}
                onClose={() => { setIsOpen(false); }}
                onAccept={onAccept!}
            />
        </React.Fragment>
    );
}