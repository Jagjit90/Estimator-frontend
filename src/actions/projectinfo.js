
import ActionType from "../type/actionType";

export const projectInfo = (data) => {
    return {
        payload :data,
        type: ActionType.PROJECTINFO,
    };
  };