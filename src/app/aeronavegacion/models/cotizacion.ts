export class Cotizacion {
    p_cod_prod: number; // datos_productor codpas
    p_cod_provincia: number; // datos_productor cod_jur
    p_cod_postal: number; 
    p_sub_cod_postal: number;
    p_apellido: string;  // cond_fiscal_tomador apellido
    p_nombre: string; // cond_fiscal_tomador nombre
    p_cod_doc: number; // buscar
    p_cuit: number;
    p_documento: number; // cond_fiscal_tomador nro_documento
    p_cod_asegu: number; // cond_fiscal_tomador cod_asegurado
    p_cod_iva: string; // cond_fiscal_tomador cod_iva
    p_cod_mon: number; // forma_pago moneda
    p_cod_plan: number; // forma_pago cantidad_cuotas
    p_forma_pago: string; // forma_pago forma_pago
    p_cod_suc: number; // forma_pago cod_suc
    p_pct_comision: number; // condiciones_comerciales porcentaje_comision
    //////////////////////////////////
    p_fec_cotizacion: string;
    p_solicitud: number;
    p_o_cotizacion_version: number;
    p_dias: number;
    p_emitir_certificado: string


    constructor(productor: object, condicionFiscal: object, formaPago: object ){
        this.p_cod_prod = productor['codpas'] || ''; // datos_productor codpas
        this.p_cod_provincia = condicionFiscal['cod_provincia'] || formaPago['cod_provincia'] || ''; // datos_productor cod_jur
        this.p_cod_postal = productor['cod_postal'] || ''; // buscar
        this.p_sub_cod_postal = productor['sub_cod_postal'] || ''; // buscar
        this.p_apellido = condicionFiscal['apellido'] || formaPago['apellido'] || '';  // cond_fiscal_tomador apellido
        this.p_nombre = condicionFiscal['nombre'] || formaPago['nombre'] ||''; // cond_fiscal_tomador nombre
        this.p_cod_doc = formaPago['cod_tipo_doc'] || ''; // buscar
        this.p_documento = condicionFiscal['nro_documento'] || formaPago['nro_documento'] || condicionFiscal['cuit'] || formaPago['cuit'] || ''; //cond_fiscal_tomador nro_documento
        this.p_cuit = condicionFiscal['cuit'] ||formaPago['cuit'] || ''; //cond_fiscal_tomador nro_documento
        this.p_cod_asegu = condicionFiscal['cod_asegurado'] || ''; // cond_fiscal_tomador cod_asegurado
        this.p_cod_iva = condicionFiscal['cod_iva'] || formaPago['cod_iva'] || ''; // cond_fiscal_tomador cod_iva
        this.p_cod_mon = formaPago['cod_mon'] || '' // forma_pago moneda
        this.p_cod_plan = formaPago['cod_plan'] || ''// forma_pago cantidad_cuotas
        this.p_forma_pago = formaPago['cod_forma_pago'] || '' // forma_pago forma_pago
        this.p_cod_suc = productor['cod_suc'] !== null ? productor['cod_suc'] : '' // forma_pago cod_suc
        this.p_pct_comision =formaPago['porc_comision'] || '';
    }
}
