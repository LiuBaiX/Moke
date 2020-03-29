import React from "react";
import { ArticleDetailsModalView } from "./ArticleDetailsModalView";
import { IArticleForDisplay } from "moke-model";
import { Table, Button } from "react-bootstrap";

export interface IArticleManagementViewProps {
    dataSource?: IArticleForDisplay[];
    fetchArticles?: () => Promise<IArticleForDisplay[]>;
    onAccept?: (id: string) => Promise<void>;
}

export const ArticleManagementView: React.FunctionComponent<IArticleManagementViewProps> = (props) => {
    const {
        dataSource,
        onAccept,
        fetchArticles
    } = props;

    const [data, setData] = React.useState<IArticleForDisplay>();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        fetchArticles!();
    },[]);

    return (
        <React.Fragment>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>作品名</th>
                        <th>作品类型</th>
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
                                <td>{item.articleId}</td>
                                <td>{item.name}</td>
                                <td>{item.articleTypeDisplayName} {item.articleSubTypeDisplayName || ""}</td>
                                <td>ID:{item.authorId} Name:{item.authorDisplayName}</td>
                                <td>{item.createdDate}</td>
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
            {
                data
                    ? <ArticleDetailsModalView
                        dataSource={data!}
                        isOpen={isOpen}
                        onClose={() => { setIsOpen(false); }}
                        onAccept={onAccept!}
                    />
                    : null
            }
        </React.Fragment>
    );
}