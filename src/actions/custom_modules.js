import ActionType from "../type/actionType";

export const customModules = (data)=>{
    return{
        payload : data,
        type : ActionType.CUSTOMMODULES

    };
}