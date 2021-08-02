import { User } from '@core/models/user';
import * as fromUser from 'src/app/store/user/user.actions';

export interface State {
    isAuthenticate: boolean;
    user: User;
}

const estadoInicial: State = {
    isAuthenticate: false,
    user: null
};

export function userReducer( state = estadoInicial, action: fromUser.Acciones ): State {

    switch( action.type){

        case fromUser.ADD_USER:
            const user = new User(action.cod_prod, action.session_id, action.token);
            return { 
                ...state,
                user: user,
                isAuthenticate: true
            };
        default: 
            return state;
    }
}