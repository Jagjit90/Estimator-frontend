
import ActionType from "../type/actionType";

export const allModulesData =(data) =>{
    return{
        payload : data,
        type : ActionType.ALLMODULES

    };
};