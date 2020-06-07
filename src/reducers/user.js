import * as types from './../constants/ActionType';

const initialState = {
    infoUser: [],
    checked : '',
    token : '',
};

const signin = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGN_IN:
            return { ...state, infoUser: action.info, checked : action.checked, token : action.token } 
        case types.SIGN_OUT:
            return { ...state, infoUser: action.info, checked : action.checked, token: action.token } 
        case types.CHANGE_INFO:
            return {...state, infoUser : action.info}  
    
        default: return { ...state };
    }
}


export default signin;