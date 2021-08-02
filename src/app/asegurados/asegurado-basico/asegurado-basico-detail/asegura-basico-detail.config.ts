export const DatosGeneralesConsumidorFinal = {
        type: 'form',
        text: 'Datos Generales',
        cols: 3,
        fields: {
            cod_asegurado: {
                type: 'field',
                label: 'Cód. Asegurado'
            },
            /*x_nacionalidad: {
                type: 'field',
                label: 'Nacionalidad'
            },*/
            fec_nacim: {
                type: 'field',
                label: 'Fecha Nacimiento'
            },
            desc_asegurado: {
                type: 'field',
                label: 'Apellido y Nombre'
            },
            edad: {
                type: 'field',
                label: 'Edad'
            },
            desc_sexo: {
                type: 'field',
                label: 'Sexo'
            }
        }
    }

export const DatosGeneralesNOConsumidorFinal = {
        type: 'form',
        text: 'Datos Generales',
        cols: 2,
        fields: {
            cod_asegurado: {
                type: 'field',
                label: 'Cód. Asegurado'
            },
            desc_asegurado: {
                type: 'field',
                label: 'Razón Social'
            },
            /*nacionalidad: {
                type: 'field',
                label: 'Radicación'
            },*/
        }
    }

export const AseguradoDetail = {
    datos_generales: {
        type: 'form',
        text: 'Datos Generales',
        cols: 3,
        fields: {
            cod_asegurado: {
                type: 'field',
                label: 'Cód. Asegurado'
            },
            /*x_nacionalidad: {
                type: 'field',
                label: 'Nacionalidad'
            },*/
            fec_nacim: {
                type: 'field',
                label: 'Fecha Nacimiento'
            },
            desc_asegurado: {
                type: 'field',
                label: 'Apellido y Nombre'
            },
            edad: {
                type: 'field',
                label: 'Edad'
            },
            desc_sexo: {
                type: 'field',
                label: 'Sexo'
            }
        }
    },
    domicilios: {
        type: 'form',
        text: 'Domicilios',
        cols: 4,
        fields: {
            domicilio: {
                type: 'field',
                label: 'Domicilio'
            },
            desc_provincia: {
                type: 'field',
                label: 'Provincia'
            },
            desc_localidad: {
                type: 'field',
                label: 'Localidad'
            },
            cod_postal: {
                type: 'field',
                label: 'CP'
            },
        }
    },
    contacto: {
        type: 'form',
        text: 'Contacto',
        cols: 3,
        fields: {
            email: {
                type: 'field',
                label: 'Email'
            },
            telefono: {
                type: 'field',
                label: 'Teléfono'
            },
            celular: {
                type: 'field',
                label: 'Celular'
            }
        }
    },
    datos_fiscales: {
        type: 'form',
        text: 'Datos Fiscales',
        cols: 3,
        fields: {
            desc_tipo_documento: {
                type: 'field',
                label: 'Tipo Documento'
            },
            desc_condicion_fiscal: {
                type: 'field',
                label: 'I.V.A'
            },
            nro_documento: {
                type: 'field',
                label: 'Número Documento'
            },
            desc_personeria: {
                type: 'field',
                label: 'Personeria'
            },
            digito_cuit: {
                type: 'field',
                label: 'CUIT'
            },
            desc_iibb: {
                type: 'field',
                label: 'Ingresos Brutos'
            }
        }
    },
    estado: {
        type: 'form',
        text: 'Estado',
        cols: 3,
        fields: {
            desc_causa_bloqueo: {
                type: 'field',
                label: 'Causa Bloqueo'
            },
            fec_bloqueo: {
                type: 'field',
                label: 'Fecha Bloqueo'
            },
            desc_situacion_bloqueo: {
                type: 'field',
                label: 'Situación'
            }
        }
    }
}