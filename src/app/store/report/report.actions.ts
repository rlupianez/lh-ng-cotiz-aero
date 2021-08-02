import { Action } from '@ngrx/store';

export const ADD_LAST_APPLIED_FILTERS = '[ADD] Add Last Applied Filters';
export const ADD_REPORT_RESULTS = '[ADD] Add Report Results';
export const GET_ALL_REPORT_DATA = '[GET] Get All Report Data';

export class AddLastAppliedFilters implements Action {
    readonly type = ADD_LAST_APPLIED_FILTERS;

    constructor( public lastFilters, public modelFilters, public reportPath, public route ) {
    }
}


export class AddReportResults implements Action {
    readonly type = ADD_REPORT_RESULTS;

    constructor( public reportData ) {
    }
}


export class GetAllReportData implements Action {
    readonly type = GET_ALL_REPORT_DATA;
}

export type Acciones = AddLastAppliedFilters | AddReportResults | GetAllReportData;