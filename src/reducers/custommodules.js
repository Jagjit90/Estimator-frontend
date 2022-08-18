const initialState = {custommodules :""}


const customModulesReducer = (state = initialState , action) =>{
  
    switch(action.type){
        case "CUSTOMMODULES":
            return {...state, custommodules :action.payload}

            default:
              return state
           
    }
}

export default customModulesReducer