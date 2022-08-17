
import axios from 'axios';
import ActionType from '../type/actionType'


export const loginUserDispatch = (data) => {
  return {
    payload:data,
    type: ActionType.LOGINUSER,
  };
};

