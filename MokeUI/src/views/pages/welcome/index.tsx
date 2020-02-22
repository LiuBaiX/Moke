import React from "react";
import { Jumbotron, Container, Badge } from "react-bootstrap";
import { MokeCard } from "moke-components";

export default class Welcome extends React.Component {
    public render = () => {
        return (
            <React.Fragment>
                <Jumbotron fluid>
                    <Container>
                        <h2>欢迎访问 墨客 ~</h2>
                        <p className="text-muted">墨客致力于为所有古代文学爱好者提供优质古代文学资源~</p>
                        <p className="text-muted moke-font-sm">
                            在开始访问之前,请先
                            <Badge className="moke-font-sm" variant="warning">登录</Badge>
                            /
                            <Badge className="moke-font-sm" variant="warning">注册</Badge>
                            ~
                        </p>
                    </Container>
                </Jumbotron>
                <MokeCard headerText={"随机推荐"} onRenderBody={this.renderBody} />
            </React.Fragment>
        );
    }

    private renderBody = () => {
        return (
            <React.Fragment>
                <h4>青玉案·元夕</h4>
                <p>
                    东风夜放花千树，更吹落，星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。
                </p>
                <p>
                    蛾儿雪柳黄金缕，笑语盈盈暗香去。众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。
                </p>
            </React.Fragment>
        );
    }
}