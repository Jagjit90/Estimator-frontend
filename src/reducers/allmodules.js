
const initialState = {allmodules:""}

const allModulesReducer = (state = initialState , action) =>{
    
    switch(action.type){

  case "ALLMODULES":
  return {...state, allmodules :action.payload}

  default:
    return state
 }
}

export default allModulesReducer