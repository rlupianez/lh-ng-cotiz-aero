import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/http/api.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ValidatorService {
    constructor(private apiService: ApiService) {

    }

    /*
    {
  "p_o_sesion":7588755453,
     "p_cod_sec":3,
     "p_patente":"VHS-948",
     "p_poliza":"10657519"
     }  
    */

    /**
     * 
     * @param plate 
     * @param policy 
     */
    isValidPlateAndPolicy(plate: string, policy: string) {
        return this.apiService.post('/denuncia_tercero/DATOSPRIMARIOS', {
            p_cod_sec: 3,
            p_patente: plate,
            p_poliza: policy
        }, false).pipe(map(
            res => {
                return (res["p_cod_error"] == 0)
            }
        ));
    }


    saveSinister(request: any) {
        return this.apiService.post('/denuncia_tercero/INGRESAR_DENUNCIA',
            request
            , false).pipe(map(
                res => {
                    return (res["p_nro_denuncia"] > 0);
                }
            ));
    }

    addUser(numberDocument: number) {
        return this.apiService.post('/denuncia_tercero/DATOSUSUARIO', {
            p_t_doc: 4,
            p_x_accion: "ALTA",
            p_nro_doc: numberDocument
        }, false).pipe(map(
            res => {
                return (res["p_cod_error"] == 0)
            }
        ));
    }


    anyUser(numberDocument: number) {
        return this.apiService.post('/denuncia_tercero/DATOSUSUARIO', {
            p_t_doc: 4,
            p_x_accion: "CONTROL",
            p_nro_doc: numberDocument
        }, false).pipe(map(
            res => {
                return (res["p_cod_error"] == 0)
            }
        ));
    }

}
