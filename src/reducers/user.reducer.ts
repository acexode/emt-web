import {userActions} from "../actions/user.actions";
import tokenService from "../services/tokenService";

export const authUserReducer = (state: any, action: { type: any; payload: any; }) =>{
    const {type,payload} = action;
    const getToken = tokenService.getToken()
     switch (type) {
        case userActions.SIGN_IN: {
            return {
                ...state,
                signedIn: true,
                token: payload.token,
                userRole:payload?.user?.userRole,
                userProfile: payload?.user
            }
        }
        case userActions.SET_USER_PROFILE: {
            return {
                ...state,
                userProfile: payload,
                userRole:payload?.role,
                token: getToken,
            }
        }
        case userActions.SIGN_OUT : {
            return {
                ...state,
                userProfile: null,
                signIn: false,
                token: null,
                userRole:''
            }
        }
        default: return state
    }
}