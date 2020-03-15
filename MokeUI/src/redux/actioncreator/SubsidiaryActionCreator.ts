import { ISubsidiaryForm, ISubsidiary } from "moke-model";
import { SubsidiaryService } from "moke-service";
import { mokeMapper } from "moke-mapper";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "moke-state";
import constant from "moke-constants";
import { ISubsidiaryAction } from "moke-action";


const addSubsidiary = (data: ISubsidiaryForm) => {
    return SubsidiaryService.addSubsidiary(data);
}

const deleteSubsidiary = (id: string): ThunkAction<
    Promise<void>,
    IAppState,
    null,
    ISubsidiaryAction
> => {
    return (dispatch) => {
        return SubsidiaryService.deleteSubsidiary(id).then(() => {
            dispatch(removeSubsidiary(id));
        })
    }
}

const setSubsidiary = (subsidiaries: ISubsidiary[]): ISubsidiaryAction => {
    return {
        type: constant.SUBSIDIARY_SET,
        subsidiaries,
    }
}

const removeSubsidiary = (id: string): ISubsidiaryAction => {
    return {
        type: constant.SUBSIDIARY_DELETE,
        id,
    }
}

const getSubsidiaryByUserId = (): ThunkAction<
    Promise<void>,
    IAppState,
    null,
    ISubsidiaryAction
> => {
    return (dispatch, getState) => {
        const { uid } = getState().user;
        return SubsidiaryService.getSubsidiariesByUserId(uid!.toString()).then((data) => {
            const subsidiaries = data.map((item) => {
                return mokeMapper.mapSubsidiaryInfoToModel(item);
            });
            dispatch(setSubsidiary(subsidiaries));
        });
    }
}

export default {
    addSubsidiary,
    deleteSubsidiary,
    getSubsidiaryByUserId
}