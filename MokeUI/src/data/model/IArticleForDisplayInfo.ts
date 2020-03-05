export interface IArticleForDisplayInfo {
    article_id: number;
    author:number;//author's id
    name: string;//author's name
    title: string;
    type_name:string;//type
    display_name:string;//subtype
    content:string;
    last_modified_date:string;
    description:string;
    create_date:string;
}