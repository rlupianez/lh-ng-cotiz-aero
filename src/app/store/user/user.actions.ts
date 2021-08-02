import { Action } from '@ngrx/store';

export const ADD_USER = '[USER] Add User';

export class AddUserAction implements Action {
    readonly type = ADD_USER;

    constructor( public cod_prod, public session_id, public token ) {

    }
}

export type Acciones = AddUserAction;