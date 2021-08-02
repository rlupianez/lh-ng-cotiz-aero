import * as moment from "moment";

export interface DatoTomador {
    desc_iva: string,
    nro_documento: number,
    cuit: number,
    nombre: string,
    apellido: string,
    razon_social: string,
    cod_actividad: number,
    fec_nacimiento: moment.Moment,
    cod_sexo: string,
    cod_nacionalidad: string,
    domicilio: string,
    nro_puerta: number,
    nro_piso: number,
    depto: string,
    cod_provincia: number,
    cod_localidad: string,
    cod_postal: number,
    telefono: number,
    email: string,
    telefonoValido: boolean
}; 


export interface DatosTomadorDataSet {
    datos: DatoTomador

};