import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import { default as _rollupMoment, Moment} from 'moment';
import { Moment } from 'moment';

// const moment = _rollupMoment || _moment;
const moment = _moment;

export class Asegurado {
    condicion_iva: string;
    desc_condicion_iva: string;

    tipo_documento: string; 
    desc_tipo_documento: string; // falta

    tipo_persona: string; // no se si este o la desc
    desc_tipo_persona: string; // no se si este o el cod   

    nro_documento: string;
    cuit: string;
    nombre: string;
    apellido: string;
    razon_social: string;
    
    actividad: string;
    desc_actividad: string;

    fecha_nacimiento: any;

    sexo: string;
    desc_sexo: string;

    nacionalidad: string;
    desc_nacionalidad: string;

    calle: string;
    numero: string;
    piso: string;
    departamento: string;
    
    provincia: string;
    desc_provincia: string;

    localidad: string;
    desc_localidad: string;

    cod_postal: string;
    cod_area: string;
    telefono: string;
    email: string;

    poliza_electronica: string;

    constructor(data: object){
        this.condicion_iva = data['cod_iva'] || null;
        this.desc_condicion_iva = data['x_iva'] || null;

        this.tipo_documento = data['tipo_doc'] || null;
        this.desc_tipo_documento = data['x_tipo_doc'] || null;

        this.tipo_persona = data['personeria'] || null;
        this.desc_tipo_persona = data['personeria'] || null;

        this.cuit = data['cuit'] || null;
        this.nro_documento = data['n_documento'] || null;
        this.nombre = data['x_nombre'] || null;
        this.apellido = data['x_apellido'] || null;
        this.razon_social = data['x_apellido'] || data['x_apellido'] ? `${data['x_apellido']} ${data['x_nombre']}` : null;

        this.actividad = data['cod_activi'] || null;
        this.desc_actividad = data['desc_activi'] || null;

        this.fecha_nacimiento = moment(data['fec_nacim'],'DD/MM/YYYY') || null;
        
        this.sexo = data['sexo'] || null;
        this.desc_sexo = data['desc_sexo'] || null;
        
        this.nacionalidad = data['x_nacionalidad'] || null;
        this.desc_nacionalidad = data['x_nacionalidad'] || null;
        
        this.calle = data['x_domicilio_ase'] || null;
        this.numero = data['dcom_puert'] || null;
        this.piso = data['dcom_piso'] || null;
        this.departamento = data['dcom_depto'] || null;
        
        this.provincia = data['cod_prov'] || null;
        this.desc_provincia = data['x_provincia'] || null;
       
        this.localidad = data['dcom_loc'] || null;
        this.desc_localidad = data['x_localidad'] || null;
        
        this.cod_postal = data['cod_postal'] || null;
        this.cod_area = data['cod_area'] || null;
        this.telefono = data['dcom_telef'] || null; 
        this.email = data['dcom_email'] || null;

        this.poliza_electronica = '' || null;
       
    }

    getRawValue(){
        return JSON.stringify(this);
    }
}