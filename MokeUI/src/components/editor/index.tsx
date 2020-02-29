import { connect } from "react-redux";
import { MokeArticleEditorView } from "./MokeArticleEditorView";
import { ArticleSubTypeService } from "moke-service";
import { mokeMapper } from "moke-mapper";

const mapDispatchToProps = () => {
    return {
        fetchArticleSubTypeList: (id: number) => {
            return ArticleSubTypeService.getArticleSubType(id)
                .then((data) => {
                    return data.map((item) => {
                        return mokeMapper.mapArticleSubTypeInfoToModel(item);
                    })
                })
        }
    }
}

const MokeArticleEditor = connect(null, mapDispatchToProps)(MokeArticleEditorView);

export { MokeArticleEditor };