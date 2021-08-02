export const ActionNav = {
    poliza_vigente: { class: 'mr-4', icon: 'polizaactual', text: 'Póliza Actual' },
    // denunciar: { class: '', icon: 'alert', text: 'Denunciar' },
    // endosar: { class: '', icon: 'contract', text: 'Endosar' },
    // forma_pago: { class: '', icon: 'credit_card', text: 'Forma de pago' },
    comprobando_poliza: { class: '', icon: 'group', text: 'Póliza Digital' }
}


export const ExpansionForm = {
    type: 'expansion-form',
    header: true,
    panels: {
        riesgos_endoso: {
            icon: 'detalle_bienes',
            text: 'Bienes Asegurados',
            type: 'expansion-panel',
            expanded: false,
            content: {
                riesgos_endoso: {
                    form: {
                        title: 'Bien Asegurado',
                        path: '/listados/DETALLE_RIESGO',
                        filters: {
                            p_id_rie: 'id_rie',
                            p_tipo_rie: 'tipo_rie'
                        },
                        responseField: 'p_detalle_rgo',
                        cols: 3,
                        fields: {
                            descri: {
                                type: 'field',
                                label: 'Descripción'
                            },
                            suma_aseg: {
                                type: 'field',
                                label: 'Suma Asegurada'
                            },
                            prima: {
                                type: 'field',
                                label: 'Prima'
                            },
                            patente: {
                                type: 'field',
                                label: 'Patente',
                                // fieldname: ''
                            },
                            marca: {
                                type: 'field',
                                label: 'Marca Vehiculo',
                                // fieldname: ''
                            },
                            modelo: {
                                type: 'field',
                                label: 'Modelo Vehiculo',
                                // fieldname: ''
                            },
                            motor: {
                                type: 'field',
                                label: 'Motor',
                                // fieldname: ''
                            },
                            chasis: {
                                type: 'field',
                                label: 'Chasis',
                                // fieldname: ''
                            },
                            carroceria: {
                                type: 'field',
                                label: 'Carroceria',
                                // fieldname: ''
                            },
                            uso: {
                                type: 'field',
                                label: 'Año Fabricación',
                                // fieldname: ''
                            },
                            conservac: {
                                type: 'field',
                                label: 'Conservación',
                                // fieldname: ''
                            }
                        }
                    },
                    list: {
                        label: 'Riesgos',
                        editable: false,
                        selectable: true,
                        control: {
                            type: 'table',
                            items: {
                                nro_rie: {
                                    label: 'Riesgo',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                /*modelo_rgo_dsp: {
                                    label: 'Sección',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },*/
                                descri: {
                                    label: 'Descripción',
                                    editable: false,
                                    cellStyle: 'text-left',
                                    control: {
                                        type: 'text',
                                    }
                                },
                                suma_aseg: {
                                    label: 'Suma Asegurada',
                                    editable: false,
                                    cellStyle: 'text-right',
                                    control: {
                                        type: 'text',
                                    }
                                },
                                prima: {
                                    label: 'Prima',
                                    editable: false,
                                    cellStyle: 'text-right',
                                    control: {
                                        type: 'text',
                                    }
                                },
                                acciones: {
                                    label: 'Ver Detalle',
                                    editable: false,
                                    control: {
                                        type: 'custom_action',
                                        icon: 'group',
                                        action: 'open_detail'
                                    }
                                }
                            },
                            defaultData: [],
                            columns: ['nro_rie',/* 'modelo_rgo_dsp',*/  'descri', 'suma_aseg', 'prima','acciones']
                        }
                    }
                }
            }
        },
        cobertura: {
            icon: 'cobertura_poliza',
            text: 'Cobertura',
            type: 'expansion-panel',
            expanded: false,
            content: {
                cobertura_section: {
                    form: {
                        path: '/listados/DETALLE_RIESGO_COB_ENDOSO',
                        hideActionBar: true,
                        filters: {
                            p_poliza: 'poliza',
                            p_cod_sec: 'cod_sec',
                            p_nro_rie: 'nro_rie'
                        },
                        responseField: 'p_detalle_riesgo_cob',
                        cols: 2,
                        fields: {
                            l_cob_descri: {
                                label: 'Descripción',
                                editable: false,
                                control: {
                                    type: 'text',
                                }
                            },
                            suma_aseg: {
                                label: 'Suma Asegurada',
                                editable: false,
                                control: {
                                    type: 'text',
                                }
                            },
                            prima: {
                                label: 'Prima',
                                editable: false,
                                control: {
                                    type: 'text',
                                }
                            },
                            franquicia: {
                                label: 'Franquicia',
                                editable: false,
                                control: {
                                    type: 'text',
                                }
                            }
                        }
                    },
                    list: {
                        label: 'Coberturas',
                        editable: false,
                        selectable: false,
                        control: {
                            type: 'table',
                            emptyMessage: 'No se encontraron coberturas. Para empezar seleccione un riesgo en la sección de "Bienes Asegurados"',
                            items: {
                                l_cob_descri: {
                                    label: 'Descripción',
                                    cellStyle: 'text-left',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                suma_aseg: {
                                    label: 'Suma Asegurada',
                                    editable: false,
                                    cellStyle: 'text-right',
                                    control: {
                                        type: 'text',
                                    }
                                },
                                prima: {
                                    label: 'Prima',
                                    editable: false,
                                    cellStyle: 'text-right',
                                    control: {
                                        type: 'text',
                                    }
                                },
                                franquicia: {
                                    label: 'Franquicia',
                                    cellStyle: 'text-right',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                            },
                            defaultData: [],
                            columns: ['l_cob_descri', 'suma_aseg', 'prima', 'franquicia'],
                        }
                    }
                }
            }
        },
        comisiones: {
            icon: 'comisiones_poliza',
            text: 'Comisiones',
            type: 'expansion-panel',
            expanded: false,
            content: {
                com_section: {
                    form: {
                        title: 'Comisión',
                        hideDetailDialog: true,
                        cols: 3,
                        fields: {
                            cod_comis: {
                                label: 'Concepto',
                                editable: false,
                                control: {
                                    type: 'text',
                                }
                            },
                            cod_prod: {
                                label: 'Cód. Productor',
                                editable: false,
                                control: {
                                    type: 'text',
                                }
                            },
                            apeynom_dsp: {
                                label: 'Nombre Productor',
                                editable: false,
                                control: {
                                    type: 'text',
                                }
                            },
                            pct_comis: {
                                label: '% Comisión',
                                editable: false,
                                control: {
                                    type: 'text',
                                }
                            },
                            comis: {
                                label: 'Monto Comisión',
                                editable: false,
                                control: {
                                    type: 'text',
                                }
                            }
                        }
                    },
                    list: {
                        label: 'Comisiones',
                        editable: false,
                        selectable: true,
                        control: {
                            type: 'table',
                            items: {
                                cod_comis: {
                                    label: 'Concepto',
                                    editable: false,
                                    cellStyle: 'text-left',
                                    control: {
                                        type: 'text',
                                    }
                                },
                                cod_prod: {
                                    label: 'Cód. Productor',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                apeynom_dsp: {
                                    label: 'Nombre Productor',
                                    editable: false,
                                    cellStyle: 'text-left',
                                    control: {
                                        type: 'text',
                                    }
                                },
                                pct_comis: {
                                    label: '% Comisión',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                comis: {
                                    label: 'Monto Comisión',
                                    editable: false,
                                    cellStyle: 'text-right',
                                    control: {
                                        type: 'text',
                                    }
                                }
                            },
                            defaultData: [],
                            columns: ['cod_comis', 'cod_prod', 'apeynom_dsp', 'pct_comis', 'comis']
                        }
                    }
                }
            }
        },
        plan_pagos: {
            icon: 'files',
            text: 'Plan de Pagos',
            type: 'expansion-panel',
            expanded: false,
            content: {
                pagos_cabecera: {
                    form: {
                        cols: 3,
                        fields: {
                            tot_cuotas: {
                                type: 'field',
                                label: 'Cuotas',
                                // fieldname: ''
                            },
                            cod_estado: {
                                type: 'field',
                                label: 'Estado',
                                // fieldname: ''
                            },
                            premio: {
                                type: 'field',
                                label: 'Premio',
                                // fieldname: ''
                            },
                            premio_np: {
                                type: 'field',
                                label: 'Premio Holando',
                                // fieldname: ''
                            },
                            nro_anul: {
                                type: 'field',
                                label: 'Endoso Anul',
                                // fieldname: ''
                            },
                            detall: {
                                type: 'field',
                                label: 'Detalle',
                                // fieldname: ''
                            },
                            cod_mon: {
                                type: 'field',
                                label: 'Moneda',
                                // fieldname: ''
                            },
                            saldo: {
                                type: 'field',
                                label: 'Saldo',
                                // fieldname: ''
                            },
                            asegurado_dsp: {
                                type: 'field',
                                label: 'Asegurado',
                                // fieldname: ''
                            },
                            fec_anul: {
                                type: 'field',
                                label: 'Fecha Anul',
                                // fieldname: ''
                            }
                        }
                    },
                    list: {
                        label: 'Plan de Pagos',
                        editable: false,
                        selectable: true,
                        control: {
                            type: 'table',
                            items: {
                                seccion: {
                                    label: 'Sección',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                poliza: {
                                    label: 'Póliza',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                endoso: {
                                    label: 'Endoso',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                fec_vig: {
                                    label: 'Fecha Vigencia',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                fec_vto: {
                                    label: 'Fecha Vto',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                }
                            },
                            defaultData: [],
                            columns: ['seccion', 'poliza', 'endoso', 'fec_vig', 'fec_vto'],
                        }

                    }
                }
            }
        },
        pagos: {
            icon: 'pagos',
            text: 'Pagos',
            type: 'expansion-panel',
            expanded: false,
            content: {
                pagos_sec: {
                    /*form:  {
                        cols:3,
                        fields: {
                            nro_pag: {
                                type: 'field',
                                label: 'Cuotas',
                                // fieldname: ''
                            },
                            estado: {
                                type: 'field',
                                label: 'Estado',
                                // fieldname: ''
                            },
                            premio: {
                                type: 'field',
                                label: 'Premio',
                                // fieldname: ''
                            },                        
                            premio_holando: {
                                type: 'field',
                                label: 'Premio Holando',
                                // fieldname: ''
                            },
                            endoso_anul: {
                                type: 'field',
                                label: 'Endoso Anul',
                                // fieldname: ''
                            },
                            detalle: {
                                type: 'field',
                                label: 'Detalle',
                                // fieldname: ''
                            },
                            moneda: {
                                type: 'field',
                                label: 'Moneda',
                                // fieldname: ''
                            },
                            pago: {
                                type: 'field',
                                label: 'Saldo',
                                // fieldname: ''
                            },
                            asegurado: {
                                type: 'field',
                                label: 'Asegurado',
                                // fieldname: ''
                            },
                            fecha_anul: {
                                type: 'field',
                                label: 'Fecha Anul',
                                // fieldname: ''
                            }
                        }
                    },*/
                    list: {
                        label: 'Pagos',
                        editable: false,
                        selectable: true,
                        control: {
                            type: 'table',
                            items: {
                                /**** Pagos */
                                nro_cuo: {
                                    label: 'Cuota',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                fec_vtocuo: {
                                    label: 'Vencimiento',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                i_cuota: {
                                    label: 'Valor',
                                    editable: false,
                                    cellStyle: 'text-right',
                                    control: {
                                        type: 'text',
                                    }
                                },
                                i_saldo: {
                                    label: 'Saldo',
                                    editable: false,
                                    cellStyle: 'text-right',
                                    control: {
                                        type: 'text',
                                    }
                                },
                                fec_pago: {
                                    label: 'Fecha de Pago',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                pago: {
                                    label: 'Importe',
                                    editable: false,
                                    cellStyle: 'text-right',
                                    control: {
                                        type: 'text',
                                    }
                                },
                                /**** Cuotas */
                                fec_liqui: {
                                    label: 'Fecha Liquidación',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                nro_liqui: {
                                    label: 'Nro Liquidación',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                nro_recibo: {
                                    label: 'Recibo',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                fecha_cambio: {
                                    label: 'Fecha Dif. Cambio',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                acciones: {
                                    label: 'Ver Recibo',
                                    editable: false,
                                    control: {
                                        type: 'custom_action',
                                        icon: 'group',
                                        action: 'open_pago'
                                    }
                                }

                            },
                            defaultData: [],
                            columns: [/*Pagos*/'nro_cuo', 'fec_vtocuo', 'i_cuota', 'i_saldo', 'fec_pago', 'pago',/*Cuotas*/'fec_liqui', 'nro_liqui', 'nro_recibo', 'fecha_cambio', 'acciones'],
                        }
                    }
                }
            }
        }
    }
}


export const Detail = {
    card_form: {
        type: 'form-card', class: '', path: '',
        form: {
            // fieldname: 'p_detalle_poliza',
            col_1: {
                type: 'form',
                class: '',
                fields: {
                    poliza: { type: 'field', label: 'Póliza' },
                    fec_vig: { type: 'field', label: 'Fecha de Vigencia' },
                    suma_aseg: { type: 'field', label: 'Suma Asegurada' },
                    nombre_prod: { type: 'field', label: 'Productor' },
                    poliza_ant: { type: 'field', label: 'Póliza Anterior' },
                    
                }
            },
            col_2: {
                type: 'form',
                class: '',
                fields: {
                    fec_emi: { type: 'field', label: 'Fecha de Emisión' },
                    fec_vto: { type: 'field', label: 'Fecha de Vencimiento' },
                    prima: { type: 'field', label: 'Prima' },
                    asegurado: { type: 'field', label: 'Asegurado' },
                    poliza_ini: { type: 'field', label: 'Póliza a Iniciar' }
                }
            },
            col_3: {
                type: 'form',
                class: '',
                fields: {
                    tipo_emision: { type: 'field', label: 'Tipo Emisión' },
                    moneda: { type: 'field', label: 'Moneda' },
                    forma_pago: { type: 'field', label: 'Forma de Pago' },
                    franquicia: { type: 'field', label: 'Franquicia' },
                    p_poliza_electronica: { type: 'field', label: 'Póliza Electrónica' }
                    //'': { type: 'field', label: '' }
                }
            }
        }
    },
    expansion_form: {
        type: 'expansion-form',
        header: true,
        panels: {
            riesgos_endoso: {
                icon: 'detalle_bienes',
                text: 'Bienes Asegurados',
                type: 'expansion-panel',
                expanded: false,
                content: {
                    riesgos_endoso: {
                        form: {
                            title: 'Bien Asegurado',
                            path: '/listados/DETALLE_RIESGO',
                            filters: {
                                p_id_rie: 'id_rie',
                                p_tipo_rie: 'tipo_rie'
                            },
                            responseField: 'p_detalle_rgo',
                            cols: 3,
                            fields: {
                                descri: {
                                    type: 'field',
                                    label: 'Descripción'
                                },
                                suma_aseg: {
                                    type: 'field',
                                    label: 'Suma Asegurada'
                                },
                                prima: {
                                    type: 'field',
                                    label: 'Prima'
                                },
                                patente: {
                                    type: 'field',
                                    label: 'Patente',
                                    // fieldname: ''
                                },
                                marca: {
                                    type: 'field',
                                    label: 'Marca Vehículo',
                                    // fieldname: ''
                                },
                                modelo: {
                                    type: 'field',
                                    label: 'Modelo Vehículo',
                                    // fieldname: ''
                                },
                                motor: {
                                    type: 'field',
                                    label: 'Motor',
                                    // fieldname: ''
                                },
                                chasis: {
                                    type: 'field',
                                    label: 'Chasis',
                                    // fieldname: ''
                                },
                                carroceria: {
                                    type: 'field',
                                    label: 'Carrocería',
                                    // fieldname: ''
                                },
                                uso: {
                                    type: 'field',
                                    label: 'Año Fabricación',
                                    // fieldname: ''
                                },
                                conservac: {
                                    type: 'field',
                                    label: 'Conservación',
                                    // fieldname: ''
                                }
                            }
                        },
                        list: {
                            label: 'Riesgos',
                            editable: false,
                            selectable: true,
                            control: {
                                type: 'table',
                                items: {
                                    nro_rie: {
                                        label: 'Riesgo',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    /*modelo_rgo_dsp: {
                                        label: 'Sección',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },*/
                                    descri: {
                                        label: 'Descripción',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    suma_aseg: {
                                        label: 'Suma Asegurada',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    prima: {
                                        label: 'Prima',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    acciones: {
                                        label: 'Ver Detalle',
                                        editable: false,
                                        control: {
                                            type: 'custom_action',
                                            icon: 'group',
                                            action: 'open_detail'
                                        }
                                    }
                                },
                                defaultData: [],
                                columns: ['nro_rie',/* 'modelo_rgo_dsp',*/  'descri', 'suma_aseg', 'prima','acciones']
                            }
                        }
                    }
                }
            },
            cobertura: {
                icon: 'cobertura_poliza',
                text: 'Cobertura',
                type: 'expansion-panel',
                expanded: false,
                content: {
                    cobertura_section: {
                        form: {
                            path: '/listados/DETALLE_RIESGO_COB_ENDOSO',
                            hideActionBar: true,
                            filters: {
                                p_poliza: 'poliza',
                                p_cod_sec: 'cod_sec',
                                p_nro_rie: 'nro_rie'
                            },
                            responseField: 'p_detalle_riesgo_cob',
                            cols: 2,
                            fields: {
                                l_cob_descri: {
                                    label: 'Descripción',
                                    editable: false,
                                    cellStyle: 'text-left',
                                    control: {
                                        type: 'text',
                                    }
                                },
                                suma_aseg: {
                                    label: 'Suma Asegurada',
                                    editable: false,
                                    cellStyle: 'text-right',
                                    control: {
                                        type: 'text',
                                    }
                                },
                                prima: {
                                    label: 'Prima',
                                    editable: false,
                                    cellStyle: 'text-right',
                                    control: {
                                        type: 'text',
                                    }
                                },
                                franquicia: {
                                    label: 'Franquicia',
                                    editable: false,
                                    cellStyle: 'text-right',
                                    control: {
                                        type: 'text',
                                    }
                                }
                            }
                        },
                        list: {
                            label: 'Coberturas',
                            editable: false,
                            selectable: false,
                            control: {
                                type: 'table',
                                emptyMessage: 'No se encontraron coberturas. Para empezar seleccione un riesgo en la sección de "Bienes Asegurados"',
                                items: {
                                    l_cob_descri: {
                                        label: 'Descripción',
                                        cellStyle: 'text-left',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    suma_aseg: {
                                        label: 'Suma Asegurada',
                                        editable: false,
                                        cellStyle: 'text-right',
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    prima: {
                                        label: 'Prima',
                                        editable: false,
                                        cellStyle: 'text-right',
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    franquicia: {
                                        label: 'Franquicia',
                                        cellStyle: 'text-right',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                },
                                defaultData: [],
                                columns: ['l_cob_descri', 'suma_aseg', 'prima', 'franquicia'],
                            }
                        }
                    }
                }
            },
            comisiones: {
                icon: 'comisiones_poliza',
                text: 'Comisiones',
                type: 'expansion-panel',
                expanded: false,
                content: {
                    com_section: {
                        form: {
                            title: 'Comisión',
                            hideDetailDialog: true,
                            cols: 3,
                            fields: {
                                cod_comis: {
                                    label: 'Concepto',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                cod_prod: {
                                    label: 'Cód. Productor',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                apeynom_dsp: {
                                    label: 'Nombre Productor',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                pct_comis: {
                                    label: '% Comisión',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                comis: {
                                    label: 'Monto Comisión',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                }
                            }
                        },
                        list: {
                            label: 'Comisiones',
                            editable: false,
                            selectable: true,
                            control: {
                                type: 'table',
                                items: {
                                    cod_comis: {
                                        label: 'Concepto',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    cod_prod: {
                                        label: 'Cód. Productor',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    apeynom_dsp: {
                                        label: 'Nombre Productor',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    pct_comis: {
                                        label: '% Comisión',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    comis: {
                                        label: 'Monto Comisión',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    }
                                },
                                defaultData: [],
                                columns: ['cod_comis', 'cod_prod', 'apeynom_dsp', 'pct_comis', 'comis']
                            }
                        }
                    }
                }
            },
            plan_pagos: {
                icon: 'files',
                text: 'Plan de Pagos',
                type: 'expansion-panel',
                expanded: false,
                content: {
                    pagos_cabecera: {
                        form: {
                            cols: 3,
                            fields: {
                                tot_cuotas: {
                                    type: 'field',
                                    label: 'Cuotas',
                                    // fieldname: ''
                                },
                                cod_estado: {
                                    type: 'field',
                                    label: 'Estado',
                                    // fieldname: ''
                                },
                                premio: {
                                    type: 'field',
                                    label: 'Premio',
                                    // fieldname: ''
                                },
                                premio_np: {
                                    type: 'field',
                                    label: 'Premio Holando',
                                    // fieldname: ''
                                },
                                nro_anul: {
                                    type: 'field',
                                    label: 'Endoso Anul',
                                    // fieldname: ''
                                },
                                detall: {
                                    type: 'field',
                                    label: 'Detalle',
                                    // fieldname: ''
                                },
                                cod_mon: {
                                    type: 'field',
                                    label: 'Moneda',
                                    // fieldname: ''
                                },
                                saldo: {
                                    type: 'field',
                                    label: 'Saldo',
                                    // fieldname: ''
                                },
                                asegurado_dsp: {
                                    type: 'field',
                                    label: 'Asegurado',
                                    // fieldname: ''
                                },
                                fec_anul: {
                                    type: 'field',
                                    label: 'Fecha Anul',
                                    // fieldname: ''
                                }
                            }
                        },
                        list: {
                            label: 'Plan de Pagos',
                            editable: false,
                            selectable: true,
                            control: {
                                type: 'table',
                                items: {
                                    seccion: {
                                        label: 'Sección',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    poliza: {
                                        label: 'Póliza',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    endoso: {
                                        label: 'Endoso',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    fec_vig: {
                                        label: 'Fecha Vigencia',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    fec_vto: {
                                        label: 'Fecha Vto',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    }
                                },
                                defaultData: [],
                                columns: ['seccion', 'poliza', 'endoso', 'fec_vig', 'fec_vto'],
                            }

                        }
                    }
                }
            },
            pagos: {
                icon: 'pagos',
                text: 'Pagos',
                type: 'expansion-panel',
                expanded: false,
                content: {
                    pagos_sec: {
                        list: {
                            label: 'Pagos',
                            editable: false,
                            selectable: true,
                            control: {
                                type: 'table',
                                items: {
                                    /**** Pagos */
                                    nro_cuo: {
                                        label: 'Cuota',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    fec_vtocuo: {
                                        label: 'Vencimiento',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    i_cuota: {
                                        label: 'Valor',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    i_saldo: {
                                        label: 'Saldo',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    nro_pag: {
                                        label: 'Pagos',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    fec_pago: {
                                        label: 'Fecha de Pago',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    pago: {
                                        label: 'Importe',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    /**** Cuotas */
                                    fec_liqui: {
                                        label: 'Fecha Liquidación',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    nro_liqui: {
                                        label: 'Nro Liquidación',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    nro_recibo: {
                                        label: 'Recibo',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    fecha_cambio: {
                                        label: 'Fecha Dif. Cambio',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },

                                },
                                defaultData: [],
                                columns: [/*Pagos*/'nro_cuo', 'fec_vtocuo', 'i_cuota', 'i_saldo','nro_pag','fec_pago', 'pago',/*Cuotas*/'fec_liqui', 'nro_liqui', 'nro_recibo', 'fecha_cambio'],
                            }
                        }
                    }
                }
            }
        }
    }

};