import * as fromReport from 'src/app/store/report/report.actions';
import { Filters } from '@core/models/report/filters';

export interface State {
    lastAppliedFilters: Filters;
    lastApiFilters: Filters;
    reportPath: string;
    reportResults: object[];
    route: string;
}

const estadoInicial: State = {
    lastAppliedFilters: null,
    lastApiFilters: null,
    reportPath: null,
    reportResults: [],
    route: null
};

export function userReducer( state = estadoInicial, action: fromReport.Acciones ): State {

    switch(action.type){

        case fromReport.ADD_LAST_APPLIED_FILTERS:
            //const user = new User(action.cod_prod, action.session_id, action.token);
            // const filters = new Filters(action.lastFilters);
            return { 
                ...state,
                lastAppliedFilters: { ... action.lastFilters },
                lastApiFilters: { ...action.modelFilters },
                reportPath: action.reportPath,
                route: action.route,
            };

        case fromReport.GET_ALL_REPORT_DATA:
            return state;

        case fromReport.ADD_REPORT_RESULTS:
            //const user = new User(action.cod_prod, action.session_id, action.token);
            // const filters = new Filters(action.lastFilters);
            return { 
                ...state,
                reportResults: { ... action.reportData }
            };
        default: 
        return state;
    }
}