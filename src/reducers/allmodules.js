
const initialState = {allmodules:""}

const allModulesReducer = (state = initialState , action) =>{
    
    switch(action.type){

  case "ALLMODULES":
    console.log("dtatatattata")
  return {...state, allmodules :action.payload}

  default:
    return state
 }
}

export default allModulesReducer