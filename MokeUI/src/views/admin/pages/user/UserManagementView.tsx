import React from "react";
import { IUser } from "moke-model";
import { Table, Button, Spinner } from "react-bootstrap";
import { UserStatusType } from "moke-enum";

interface IUserManagementViewMapStateToProps {
    dataSource?: IUser[];
}

interface IUserManagementViewMapDispatchToProps {
    fetchUsers?: () => Promise<IUser[]>;
    setUserStatus?: (id: string, status: UserStatusType) => Promise<void>;
}

export type IUserManagementViewProps = IUserManagementViewMapStateToProps
    & IUserManagementViewMapDispatchToProps;

interface IUserManagementActionButtonProps {
    id: string;
    currentStatus: UserStatusType;
    setUserStatus: (id: string, status: UserStatusType) => Promise<void>;
}

const UserManagementActionButton: React.FunctionComponent<IUserManagementActionButtonProps> = (props) => {
    const {
        id,
        setUserStatus,
        currentStatus,
    } = props;

    const [isLoading, setIsLoading] = React.useState(false);

    const nextStatus = currentStatus === UserStatusType.Baned
        ? UserStatusType.Normal
        : UserStatusType.Baned
    return (
        <Button
            variant={nextStatus === UserStatusType.Baned ? "outline-danger" : "outline-success"}
            onClick={() => {
                setIsLoading(true);
                setUserStatus(id, nextStatus)
                    .then(() => {
                        setIsLoading(false);
                    })
            }}
        >
            {
                isLoading
                    ? <Spinner animation={"border"} size={"sm"} />
                    : nextStatus === UserStatusType.Baned
                        ? "封禁"
                        : "解封"
            }
        </Button>
    );
}

export const UserManagementView: React.FunctionComponent<IUserManagementViewProps> = (props) => {
    const {
        dataSource,
        fetchUsers,
        setUserStatus
    } = props;

    React.useEffect(() => {
        fetchUsers!();
    }, []);

    return (
        <React.Fragment>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>用户名</th>
                        <th>状态</th>
                        <th>注册时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                {
                    dataSource?.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{UserStatusType[item.status!]}</td>
                                <td>{item.createDate}</td>
                                <td>
                                    <UserManagementActionButton
                                        id={item.id}
                                        currentStatus={item.status!}
                                        setUserStatus={setUserStatus!}
                                    />
                                </td>
                            </tr>
                        );
                    })
                }
            </Table>
        </React.Fragment>
    );
}