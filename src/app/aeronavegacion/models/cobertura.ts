export class Cobertura {

    n_secuencia: string; // no esta
    cod_cobert: string; 
    tiene_adicionales: string; // no esta
    prima: string; 
    suma_asegurada: number;
    premio: string; 
    contado: string; // no esta
    en_cuotas: string; // no esta
    x_en_cuotas: string; // no esta
    tarifa: string; // no esta

    constructor(data){

        this.n_secuencia = data['n_secuencia'] || '';
        this.cod_cobert = data['cod_cobertura'] || '';
        this.tiene_adicionales = data['adicionales'] || 'N'; 
        this.prima = data['imp_prima'] || ''; 
        this.premio = data['imp_premio'] || ''; 
        this.contado = data['imp_premio'] || ''; 
        this.en_cuotas = data['cuotas'] || ''; 
        this.x_en_cuotas = data['cant_cuotas'] || ''; 
        this.tarifa = data['tarifa'] || ''; 
        this.suma_asegurada =  data['imp_suma_asegurada'] || ''; 

    }
}
