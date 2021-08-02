import { Action } from '@ngrx/store';
import { Auth } from '@core/models/auth';

export enum EAuthActions {
    SetAuthAction = '[Auth] Set Auth',
    SetAuthSuccessAction = '[Auth] Set Auth Success',
    SetAuthFailureAction = '[Auth] Set Auth Failure',
    GetAuthAction = '[Auth] Get Auth',
    GetAuthSuccessAction = '[Auth] Get Auth Success'
};


export class GetAuthAction implements Action {
    public readonly type = EAuthActions.GetAuthAction
    constructor(public payload: Auth){

    }
}

export class SetAuthAction implements Action {
    public readonly type = EAuthActions.SetAuthAction;
}

export class SetAuthSuccessAction implements Action {
    public readonly type = EAuthActions.SetAuthSuccessAction;
    constructor(public auth: Auth){

    }
}


export class SetAuthFailureAction implements Action {
    public readonly type = EAuthActions.SetAuthFailureAction;
    constructor(public error: any){

    }
}

export type Acciones = GetAuthAction | SetAuthAction | SetAuthSuccessAction | SetAuthFailureAction;