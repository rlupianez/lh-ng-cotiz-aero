import * as fromAuth from 'src/app/store/auth/auth.reducer';
import * as fromReport from 'src/app/store/report/report.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    auth: fromAuth.State;
    report: fromReport.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    report: fromReport.userReducer
}