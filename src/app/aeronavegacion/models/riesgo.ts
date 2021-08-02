import { Cobertura } from './cobertura';
export class Riesgo {
    /** Flota o individual */
    nro_rie: number; // flota | no_es_flota 
    cod_marca: number; // flota | no_es_flota marca
    cod_modelo: number; // flota | no_es_flota cod_modelo
    anio: number;  // flota | no_es_flota anio
    matricula: string; // flota | no_es_flota matricula
    nro_serie: string; // buscar ******************
    plazas: string; // flota | no_es_flota plazas
    peso_maximo_des: string; // buscar
    zona: string; // buscar ******************
    suma_asegurada: number = 0; // es suma total?
    tipo_aeronave: number;
    /* Producto */
    cod_riesgo: number; // producto riesgo
    producto: string; // producto producto
    list_cob: Cobertura[];
    list_usos: object[];
    cant_pasajeros: number;
    cant_tripulantes: number;
    cod_jur: number;
    x_ubicacion_riesgo: string = null;

    constructor(riesgo, coberturas: object[]){
        this.nro_rie = riesgo['nro_rie'] || 1;
        this.cod_riesgo = riesgo['cod_riesgo'] || '';
        this.cod_marca = riesgo['cod_marca'] || ''; 
        this.cod_modelo = riesgo['cod_modelo'] || ''; 
        this.tipo_aeronave = riesgo['cod_tipo_aeronave'] || ''; 
        this.anio = riesgo['anio'] || ''; 
        this.suma_asegurada = riesgo['suma_asegurada'] || ''; 
        this.matricula = riesgo['matricula'] || ''; 
        this.nro_serie = riesgo['nro_serie'] || '0';
        this.producto = riesgo['cod_producto'] || '';
        this.plazas = riesgo['cant_plazas'] || ''; 
        this.peso_maximo_des = riesgo['peso_max_des'] || ''; 
        this.zona = riesgo['zona'] || ''; 
        this.cant_pasajeros = parseInt(riesgo["pasajeros"]);
        this.cant_tripulantes = parseInt(riesgo["tripulantes"]);
        this.cod_jur = riesgo["cod_provincia_riesgo"];

        ////////////////////////////////////////////////////////////
        // Coberturas
        ////////////////////////////////////////////////////////////
        this.list_cob = [];

        this.addCoberturas(coberturas);
        this.calcSumaAsegurada(coberturas);
        this.list_usos = this.addUsos(riesgo.usos);
    }


    addCoberturas(coberturas){
        let i = 1;
        for(let c of coberturas){
            c['n_secuencia']=i;
            let cob = new Cobertura(c);
            this.list_cob.push({ ...cob });
            i++;

        }
    }

    calcSumaAsegurada(coberturas){
        this.suma_asegurada = 0;
        for(let cob of coberturas){
            this.suma_asegurada = this.suma_asegurada + cob['imp_suma_asegurada'];
        }
    }

    addUsos(usos){
        let listUsos = [];
        for(let u of usos){
            const uso = {
                cod_uso: u
            };
            listUsos.push(uso);
        }

        return listUsos;
    }



}
