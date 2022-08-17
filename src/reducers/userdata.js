
const initialState = { loginuser:"" , projectinfo :"" }



const userProjectReducer = (state = initialState, action) =>{
  switch (action.type) {
   case "LOGINUSER" :
  return {...state, loginuser:action.payload}
  case "PROJECTINFO":
    return{...state, projectinfo : action.payload}
    
    default:
      return state
  }
}

export default userProjectReducer;