import { connect } from "react-redux";
import { MokeArticleEditorView } from "./MokeArticleEditorView";
import { ArticleSubTypeService } from "moke-service";
import { mokeMapper } from "moke-mapper";
import { MokeSubsidiaryEditorView } from "./MokeSubsidiaryEditorView";

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

const MokeSubsidiaryEditor = MokeSubsidiaryEditorView;

export { MokeArticleEditor, MokeSubsidiaryEditor };