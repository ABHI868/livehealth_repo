


import * as actiontypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initial_state={
    token:null,
    error:null,
    loading:false,


}

const authStart=(state, action)=>{
    return updateObject(state,{
        error:null,
        loading:true
    })

}

const authSuccess = (state,action) =>{
    return updateObject (state,{
        token:action.token,
        loading:false,
        error:null
    })

} 

const authFail = (state,action) =>{
    return updateObject (state,{
        error:action.error,
        loading:false,
        
    })

} 


const authLogout = (state,action) =>{
    return updateObject (state,{
        token:null
    });

} 


const reducer= (state=initial_state, action) =>{
    switch(action.type){
        case actiontypes.AUTH_START: return authStart(state,action);
        case actiontypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actiontypes.AUTH_FAIL: return authFail(state,action);
        case actiontypes.AUTH_LOGOUT: return authLogout(state,action);

        default:
                return state;
    }
}

export default reducer;

