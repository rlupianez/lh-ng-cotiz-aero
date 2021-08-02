export const ActionNav = {
    // denunciar: { class: '', icon: 'alert', text: 'Denunciar' },
    // endosar: { class: '', icon: 'contract', text: 'Endosar' },
    // forma_pago: { class: '', icon: 'credit_card', text: 'Forma de pago' },
    comprobando_poliza: { class: '', icon: 'group', text: 'Comprobante Póliza', disabled: true }
}

export const PolizaEnCarteraDetail = {
    nav: {
        type: 'nav-list',
        items: {
            denunciar: { class: '', icon: 'alert', text: 'Denunciar' },
            endosar: { class: '', icon: 'contract', text: 'Endosar' },
            forma_pago: { class: '', icon: 'credit_card', text: 'Forma de pago' },
            comprobando_poliza: { class: '', icon: 'group', text: 'Comprobante Póliza', disabled: true }
        }
    },
    card_form: {
        type: 'form-card', class: '', path: '',
        form: {
            col_1: {
                type: 'form',
                class: '',
                fields: {
                    poliza: { type: 'field', label: 'Póliza' },
                    fec_vig: { type: 'field', label: 'Fecha de Vigencia' },
                    suma_aseg: { type: 'field', label: 'Suma Asegurada' },
                    productor: { type: 'field', label: 'Productor' },
                    poliza_anterior: { type: 'field', label: 'Póliza Anterior' }
                }
            },
            col_2: {
                type: 'form',
                class: '',
                fields: {
                    fec_emi: { type: 'field', label: 'Fecha de Emisión' },
                    fec_vto: { type: 'field', label: 'Fecha de Vencimiento' },
                    prima_np: { type: 'field', label: 'Prima' },
                    asegurado: { type: 'field', label: 'Asegurado' },
                    poliza_a_ini: { type: 'field', label: 'Póliza a Iniciar' },
                }
            },
            col_3: {
                type: 'form',
                class: '',
                fields: {
                    estado: { type: 'field', label: 'Estado' },
                    moneda: { type: 'field', label: 'Moneda' },
                    franquicia: { type: 'field', label: 'Franquicia' },
                    forma_de_pago: { type: 'field', label: 'Forma de Pago' },
                    poliza_electronica: { type: 'field', label: 'Póliza Electrónica' }
                }
            }
        }
    },
    expansion_form: {
        type: 'expansion-form',
        header: true,
        panels: {
            bien_asegurado: {
                icon: 'asegurado',
                text: 'Bien Asegurado',
                type: 'expansion-panel',
                expanded: false,
                content: {
                    bienes: {
                        form: {
                            /** Crear algo generico para utilizar esto dinamicamente */
                            title: 'Bien Asegurado',
                            path: '/listados/DETALLE_RIESGO',
                            filters: {
                                p_id_rie: 'id_rie',
                                p_tipo_rie: 'tipo_rie'
                            },
                            responseField: 'p_detalle_rgo',
                            cols: 3,
                            fields: {
                                estado: {
                                    type: 'field',
                                    label: 'Estado'
                                },
                                cod_sec: {
                                    type: 'field',
                                    label: 'Sección'
                                },
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
                                anio_fab: {
                                    type: 'field',
                                    label: 'Año Fabricación',
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
                                    estado: {
                                        label: 'Estado',
                                        editable: false,
                                        cellStyle: 'text-left',
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    desc_riesgo: {
                                        label: 'Descripción',
                                        cellStyle: 'text-left',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    suma_aseg: {
                                        label: 'Suma Asegurada',
                                        cellStyle: 'text-right',
                                        editable: false,
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
                                            icon: 'group'
                                        }
                                    }
                                },
                                defaultData: [],
                                columns: ['nro_rie', 'estado', /*'cod_sec',*/ 'desc_riesgo', 'suma_aseg', 'prima', 'acciones'],
                                
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
                            hideDetailDialog: true,
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
                                    /*cod_cobert: {
                                        label: 'Código',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    nro_cob: {
                                        label: 'Cobertura',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },*/
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
                                        cellStyle: 'text-right',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    prima: {
                                        label: 'Prima',
                                        cellStyle: 'text-right',
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
                                },
                                defaultData: [],
                                columns: [/*'cod_cobert', 'nro_cob',*/'l_cob_descri', 'suma_aseg', 'prima', 'franquicia'],
                            }
                        }
                    }
                }
            },
            endosos: {
                icon: 'files',
                text: 'Endosos',
                type: 'expansion-panel',
                expanded: false, 
                content: {
                    endoso: {
                        form: {
                            title: 'Endoso',
                            hideDetailDialog: true,
                            showActionBar: true,
                            cols: 3,
                            fields: {
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
                                tipo_emision: {
                                    label: 'Tipo Emisión',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                fec_emi: {
                                    label: 'Emisión',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                fec_vig: {
                                    label: 'Inicio Vigencia',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                },
                                fec_vto: {
                                    label: 'Fin Vigencia',
                                    editable: false,
                                    control: {
                                        type: 'text',
                                    }
                                }
                            }
                        },
                        list: {
                            label: 'Pólizas Anteriores',
                            editable: false,
                            selectable: false,
                            control: {
                                type: 'table',
                                items: {
                                    /*cod_sec: {
                                        label: 'Sección',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },*/
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
                                    tipo_emision: {
                                        label: 'Tipo Emisión',
                                        cellStyle: 'text-left',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    fec_emi: {
                                        label: 'Emisión',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    fec_vig: {
                                        label: 'Inicio Vigencia',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    fec_vto: {
                                        label: 'Fin Vigencia',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    acciones: {
                                        label: 'Ver Endoso',
                                        editable: false,
                                        control: {
                                            type: 'custom_action',
                                            icon: 'files',
                                            action: 'open_detail'
                                        }
                                    }
                                },
                                defaultData: [],
                                columns: [ 'poliza', 'endoso','tipo_emision', 'fec_emi', 'fec_vig', 'fec_vto', 'acciones'],
                            }

                        }
                    }
                }
            },
            polizas_vinculadas: {
                icon: 'files',
                text: 'Pólizas Vinculadas',
                type: 'expansion-panel',
                expanded: false,
                content: {
                    poliza: {
                        form: {
                            title: 'Póliza Vinculada',
                            showActionBar: true,
                            actions: {
                                view: {
                                    text: 'Ver Detalle',
                                    icon: 'group'
                                }
                            },
                            filters: {
                                p_poliza: 'poliza',
                                p_cod_sec: 'cod_sec',
                                p_endoso: 'endoso'
                            },
                            hideDetailDialog: true,
                            cols: 3,
                            fields: {
                                tipo_emision: {
                                    type: 'field',
                                    label: 'Tipo de Emisión',
                                    // fieldname: ''
                                },
                                ubicacion: {
                                    type: 'field',
                                    label: 'Ubicación',
                                    // fieldname: ''
                                },
                                riesgo: {
                                    type: 'field',
                                    label: 'Riesgo',
                                    // fieldname: ''
                                },
                                poliza_ant: {
                                    type: 'field',
                                    label: 'Póliza Anterior',
                                    // fieldname: ''
                                },
                                poliza_ini: {
                                    type: 'field',
                                    label: 'Póliza a Iniciar',
                                    // fieldname: ''
                                },
                                poliza_electronica: {
                                    type: 'field',
                                    label: 'Póliza Electrónica',
                                    // fieldname: ''
                                }
                            }
                        },
                        list: {
                            label: 'Polizas Anteriores',
                            editable: false,
                            selectable: false,
                            control: {
                                type: 'table',
                                items: {
                                    poliza: {
                                        label: 'Póliza',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    fec_emi: {
                                        label: 'Fecha Emisión',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    fec_vig: {
                                        label: 'Inicio Vigencia',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    fec_vto: {
                                        label: 'Fin Vigencia',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    acciones: {
                                        label: 'Detalle',
                                        editable: false,
                                        control: {
                                            type: 'custom_action',
                                            icon: 'group'
                                        }
                                    }
                                },
                                defaultData: [],
                                columns: [ 'poliza', 'fec_emi', 'fec_vig', 'fec_vto', 'acciones'],
                            }

                        }
                    }
                }
            },
            siniestros: {
                icon: 'siniestros',
                text: 'Siniestros',
                type: 'expansion-panel',
                expanded: false,
                content: {
                    siniestros_section: {
                        form: {
                            title: 'Siniestro',
                            showActionBar: false,
                            path: '/listados/DETALLE_SINIESTRO',
                            filters: {
                                p_o_siniestro: 'o_siniestro',
                                p_cod_sec: 'cod_sec'
                            },
                            responseField: 'p_list_det_siniestro',
                            cols: 3,
                            fields: {
                                nro_siniestro: {
                                    type: 'field',
                                    label: 'Número de Siniestro',
                                    // fieldname: ''
                                },
                                desc_tipo_siniestro: {
                                    type: 'field',
                                    label: 'Tipo de Siniestro',
                                    // fieldname: ''
                                },
                                desc_estado: {
                                    type: 'field',
                                    label: 'Estado',
                                    // fieldname: ''
                                },
                                desc_tramite: {
                                    type: 'field',
                                    label: 'Trámite',
                                    // fieldname: ''
                                },
                                detalle_riesgo: {
                                    type: 'field',
                                    label: 'Detalle Riesgo',
                                    // fieldname: ''
                                },
                                desc_cobertura: {
                                    type: 'field',
                                    label: 'Cobertura',
                                    // fieldname: ''
                                },
                                desc_tercero: {
                                    type: 'field',
                                    label: 'Tercero',
                                    // fieldname: ''
                                },
                                desc_juicio: {
                                    type: 'field',
                                    label: 'Juicio',
                                    // fieldname: ''
                                },
                                fecha_demanda: {
                                    type: 'field',
                                    label: 'Fecha Demanda',
                                    // fieldname: ''
                                },
                                imp_demanda: {
                                    type: 'field',
                                    label: 'Importe Demanda',
                                    // fieldname: ''
                                },
                                moneda_indemn: {
                                    type: 'field',
                                    label: 'Indem. Moneda',
                                    // fieldname: ''
                                },
                                imp_indemn_pagado: {
                                    type: 'field',
                                    label: 'Indem. Pagado',
                                    // fieldname: ''
                                },
                                moneda_gastos: {
                                    type: 'field',
                                    label: 'Gs. Moneda',
                                    // fieldname: ''
                                },
                                imp_gastos_pagado: {
                                    type: 'field',
                                    label: 'Gs. Pagados',
                                    // fieldname: ''
                                }
                            }
                        },
                        list: {
                            label: 'Siniestros',
                            editable: false,
                            selectable: false,
                            control: {
                                type: 'table',
                                items: {
                                    o_siniestro: {
                                        label: 'Número de Siniestro',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    fec_denuncia: {
                                        label: 'Fecha Denuncia',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    fec_siniestro: {
                                        label: 'Fecha Siniestro',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    o_aviso: {
                                        label: 'Número Aviso',
                                        editable: false,
                                        control: {
                                            type: 'text',
                                        }
                                    },
                                    acciones: {
                                        label: 'Ver Siniestro',
                                        editable: false,
                                        control: {
                                            type: 'custom_action',
                                            icon: 'group',
                                            action: 'open_detail'
                                        }
                                    }
                                },
                                defaultData: [],
                                columns: ['o_siniestro', 'fec_denuncia', 'fec_siniestro', 'o_aviso', 'acciones'],
                            }
                        }
                    }
                }
            }
        }
    }

};