import { Token } from '@core/models/token';
import * as fromAuth from 'src/app/store/auth/auth.actions'

export interface State {
    isAuthenticated: boolean;
    tokens: Token[];
    p_o_sesion: string;
    isLoading: boolean;
    error: string;
}

const estadoInicial: State = {
    isAuthenticated: false,
    tokens: null,
    p_o_sesion: null,
    isLoading: false,
    error: null
}

export function authReducer( state = estadoInicial, action: fromAuth.Acciones){
    switch(action.type){

        case fromAuth.EAuthActions.GetAuthAction:
            return state;
        case fromAuth.EAuthActions.SetAuthAction:
            return { 
                    ...state, 
                    isLoading: true,
                    error: null
                }
        case fromAuth.EAuthActions.SetAuthSuccessAction:
                return { 
                    ...state,
                    isAuthenticated: true,
                    p_o_sesion: action.auth.p_o_sesion,
                    // tokens: mergeObject( state.tokens , action.auth.tokens ),
                    tokens: { ...state.tokens , ...action.auth.tokens },
                    isLoading: false,
                    error: null
                };
        case fromAuth.EAuthActions.SetAuthFailureAction:
            return {
                ...state,
                isAuthenticated: false,
                p_o_sesion: null,
                isLoading: false,
                error: action.error
                
            }
        
        default:
            return state;
    }
}

