import { Validators } from '@angular/forms';
import * as moment from 'moment';

export const AeroCotizador = {
    datos_productor: {
        title: 'Datos del productor',
        icon: 'assignment_ind',
        container: 'expansion-panel',
        expanded: true,
        // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
        children: {
            productor: {
                label: 'Productor',
                control: {
                    type: 'typeahead',
                    appearance: 'standard',
                    path: '/listas/LIST_PAS',
                    options: {
                        value: 'nombre',
                        key: 'codpas',
                        description: 'codpas'
                    },
                    pasteFieldOnSelect: 'nombre',
                    defaultValue: '',
                },
                class: 'col-sm-12 col-md-12 col-lg-5',
                validators: [
                    'required'
                ]
            }
        }
    },
    cond_fiscal_tomador: {
        title: 'Condicion Fiscal del tomador',
        icon: 'info',
        container: 'expansion-panel',
        expanded: false,
        // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
        children: {
            condicion_iva: {
                label: 'Condición I.V.A',
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_COND_IVA',
                    options: {
                        value: 'descri',
                        key: 'cod_iva'
                    },
                    pasteFieldOnSelect: 'descri',
                    hasEmptyOption: true,
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            tipo_documento: {
                label: 'Tipo de Documento',
                // hidden: true,
                disabled: true,
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_TIPOS_DOC',
                    options: {
                        value: 'abrev',
                        key: 'cod_docum'
                    },
                    pasteFieldOnSelect: 'abrev',
                    hasEmptyOption: true,
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            nro_documento: {
                label: 'Número de Documento',
                // hidden: true,
                disabled: true,
                control: {
                    type: 'number',
                    appearance: 'standard',
                    config: {
                        maxlength: 8
                    }
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4',
                validators: [
                    Validators.minLength(8)
                ]
            },
            nro_cuit: {
                label: 'CUIT',
                disabled: true,
                // hidden: true,
                control: {
                    type: 'number',
                    appearance: 'standard',
                    config: {
                        maxlength: 11
                    }
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4',
                validators: [
                    Validators.minLength(11)
                ]
            },
            tipo_persona: {
                label: 'Tipo de persona',
                disabled: true,
                // hidden: true,
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_TIPOS_PERSONAS',
                    options: {
                        value: 'descri',
                        key: 'codigo'
                    },
                    pasteFieldOnSelect: 'descri',
                    hasEmptyOption: true
                },
                /*validators: [
                    'required'
                ],*/
                class: 'col-12 col-sm-3 col-md-3 col-lg-4'
            },
            /*personeria: {
                label: 'Personería',
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    options: [
                        { key: 'Persona Física', value: 'Persona Física' },
                        { key: 'Banco', value: 'Banco' },
                        { key: 'Club', value: 'Club' },
                        { key: 'Colegio Profesional', value: 'Colegio Profesional' },
                        { key: 'Consorcio de Propietarios', value: 'Consorcio de Propietarios' }
                    ],
                    pasteFieldOnSelect: 'key',
                    hasEmptyOption: true
                },
                class: 'col-12 col-sm-4 col-md-4 col-lg-4'
            },*/
            condicion_iibb: {
                label: 'Condicion IIBB',
                disabled: true,
                hidden: true,
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_INGRESOS_BRUTOS',
                    options: {
                        value: 'desc_iibb',
                        key: 'cod_iibb'
                    },
                    pasteFieldOnSelect: 'desc_iibb'
                },
                class: 'col-12 col-sm-4 col-md-4 col-lg-4'
            }
        }
    },
    datos_tomador: {
        title: `Datos del tomador`,
        icon: 'list_alt',
        container: 'expansion-panel',
        expanded: false,
        // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
        children: {
            nombre: {
                label: 'Nombre',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                /*validators: [
                    'required'
                ],*/
                class: 'col-6 col-sm-3 col-md-3 col-lg-4',
            },
            apellido: {
                label: 'Apellido',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            razon_social: {
                label: 'Razón Social',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            provincia: {
                label: 'Provincia',
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_PROVINCIAS',
                    options: {
                        value: 'descri',
                        key: 'cod_jur'
                    },
                    pasteFieldOnSelect: 'cod_jur',
                    hasEmptyOption: true
                },
                class: 'col-12 col-sm-3 col-md-3 col-lg-4'
            }
        },
    },
    vigencia_contrato:{
        title: `Vigencia del contrato`,
        icon: 'receipt',
        container: 'expansion-panel',
        expanded: false,
        // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
        children: {
            vigencia: {
                label: 'Vigencia',
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    options: {
                        value: 'value',
                        key: 'key'
                    },
                    list: [
                        { key: 'Anual', value: 'Anual' }
                    ],
                    pasteFieldOnSelect: 'key'
                },
                class: 'col-sm-12 col-md-12 col-lg-4',
            },
            vigencia_desde: {
                label: 'Fecha Vigencia Desde',
                hidden: true,
                control: {
                  type: 'datepicker',
                  appearance: 'standard',
                  config: {
                    min: moment().add(1,'days')
                  },
                },
                class: 'col-sm-12 col-md-12 col-lg-4'
            },
            vigencia_hasta: {
                label: 'Fecha Vigencia Hasta',
                hidden: true,
                control: {
                  type: 'datepicker',
                  appearance: 'standard',
                  format: 'dd/mm/yyyy'
                },
                class: 'col-sm-12 col-md-12 col-lg-4'
            }
        }
    },
    forma_pago: {
        title: `Forma de pago`,
        icon: 'payment',
        container: 'expansion-panel',
        expanded: false,
        // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
        children: {
            moneda: {
                label: 'Moneda',
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_MONEDAS',
                    options: {
                        value: 'descri',
                        key: 'cod_mon'
                    },
                    pasteFieldOnSelect: 'cod_mon',
                    hasEmptyOption: true
                },
                class: 'col-sm-12 col-md-12 col-lg-4',
                /*validators: [
                    'required'
                ] */
            },
            forma_pago: {
                label: 'Medios de Pago',
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_MEDIOS_PAGO',
                    options: {
                        value: 'rv_meaning',
                        key: 'rv_low_value'
                    },
                    pasteFieldOnSelect: 'rv_meaning',
                    hasEmptyOption: true
                },
                class: 'col-sm-12 col-md-12 col-lg-4',
            },
            cantidad_cuotas: {
                label: 'Planes de pago',
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_PLANES_PAGO',
                    filters: {
                        // p_seccion: 3,
                        p_seccion: 14
                    },
                    options: {
                        value: 'descri',
                        key: 'cod_plan'
                    },
                    pasteFieldOnSelect: 'descri',
                    hasEmptyOption: true
                },
                class: 'col-sm-12 col-md-12 col-lg-4',
            }
        }
    },
    condiciones_comerciales: {
        title: `Condiciones comerciales`,
        icon: 'assessment',
        container: 'expansion-panel',
        expanded: false,
        // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
        children: {
            porcentaje_comision: {
                label: '% de Comisión',
                control: {
                    type: 'number',
                    appearance: 'standard',
                    /*config: {
                        min: '0',
                        max: '100'
                    }*/
                },
                validators: [
                    Validators.min(1),
                    Validators.max(100)
                ],
                class: 'col-sm-12 col-md-12 col-lg-4',
            },
            porcentaje_rebaja: {
                label: '% de Rebaja / Recargo',
                control: {
                    type: 'number',
                    appearance: 'standard',
                    /* config: {
                        min: "-100",
                        max: "100"
                    } */
                },
                class: 'col-sm-12 col-md-12 col-lg-4',
            }
        }
    },
    datos_riesgo: {
        title: 'Datos de Riesgo',
        icon: 'warning',
        container: 'expansion-panel',
        expanded: false,
        // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
        children: {
            es_flota: {
                label: 'Flota',
                control: {
                    type: 'slide'
                },
                class: 'col-sm-12 col-md-12 col-lg-12'
            },
            /////////////////// No es Flotar form ///////////////////////
            no_es_flota: {
                class: 'container',
                hidden: false,
                disabled: false,
                children:{
                    matricula: {
                        label: 'Matricula',
                        control: {
                            type: 'text',
                            appearance: 'standard'
                        },
                        /*validators: [
                            'required'
                        ],*/
                        class: 'col-sm-12 col-md-3 col-lg-4'
                    },
                    anio: {
                        label: 'Año',
                        control: {
                            type: 'number',
                            appearance: 'standard'
                        },
                        validators: [
                            // 'required',
                            Validators.maxLength(4),
                            Validators.minLength(4)
                        ],
                        class: 'col-sm-12 col-md-3 col-lg-4',
                    },
                    marca: {
                        label: 'Marca',
                        disabled: true,
                        control: {
                            type: 'typeahead',
                            appearance: 'standard',
                            path: '/listas/LIST_MARCAS_AERO',
                            /*filters: {
                                // p_seccion: 3,
                                p_seccion: 14
                            },*/
                            options: {
                                value: 'marca',
                                key: 'cod_aero',
                                description: 'cod_aero'
                            },
                            apiSearchFieldname: 'p_buscar',
                            pasteFieldOnSelect: 'marca',
                            hasEmptyOption: true
                        },
                        class: 'col-sm-12 col-md-3 col-lg-4',
                        /*validators: [
                            'required'
                        ]*/
                    },
                    modelo: {
                        label: 'Modelo',
                        disabled: true,
                        control: {
                            type: 'text',
                            appearance: 'standard'
                        },
                        class: 'col-sm-12 col-md-3 col-lg-4',
                        validators: [
                            'required'
                        ]
                        // class: 'col-sm-12 col-md-3 col-lg-3'
                    },
                    plazas: {
                        label: 'Plazas',
                        disabled: true,
                        control: {
                            type: 'number',
                            appearance: 'standard'
                        },
                        class: 'col-sm-12 col-md-3 col-lg-4',
                        validators: [
                            'required'
                        ]
                    },
                    pmd: {
                        label: 'PMD',
                        disabled: true,
                        control: {
                            type: 'number',
                            appearance: 'standard'
                        },
                        class: 'col-sm-12 col-md-3 col-lg-4',
                        validators: [
                            'required'
                        ]
                        // class: 'col-sm-12 col-md-3 col-lg-3',
                    }
                }
            },
            ///////////////// ES FLOTA ////////////////////////
            riesgos: {
                title: 'Riesgos',
                hidden: true,
                disabled: true,
                control: {
                    type: 'table',
                    actions: {
                        addDialog: true
                    },
                    items: {
                        riesgo: {
                            title: `Datos de riesgo`,
                            icon: 'warning',
                            class: 'container',
                            hidden: false,
                            disabled: false,
                            children:{
                                matricula: {
                                    label: 'Matricula',
                                    control: {
                                        type: 'text',
                                        appearance: 'standard'
                                    },
                                    /*validators: [
                                        'required'
                                    ],*/
                                    class: 'col-sm-12 col-md-3 col-lg-4'
                                },
                                anio: {
                                    label: 'Año',
                                    control: {
                                        type: 'number',
                                        appearance: 'standard'
                                    },
                                    validators: [
                                        'required',
                                        Validators.maxLength(4),
                                        Validators.minLength(4)
                                    ],
                                    class: 'col-sm-12 col-md-3 col-lg-4',
                                },
                                marca: {
                                    label: 'Marca',
                                    disabled: true,
                                    control: {
                                        type: 'typeahead',
                                        appearance: 'standard',
                                        path: '/listas/LIST_MARCAS_AERO',
                                        /*filters: {
                                            // p_seccion: 3,
                                            p_seccion: 14
                                        },*/
                                        options: {
                                            value: 'marca',
                                            key: 'cod_aero',
                                            description: 'cod_aero'
                                        },
                                        apiSearchFieldname: 'p_buscar',
                                        pasteFieldOnSelect: 'marca',
                                        hasEmptyOption: true
                                    },
                                    class: 'col-sm-12 col-md-3 col-lg-4',
                                    validators: [
                                        'required'
                                    ]
                                },
                                modelo: {
                                    label: 'Modelo',
                                    disabled: true,
                                    control: {
                                        type: 'text',
                                        appearance: 'standard'
                                    },
                                    class: 'col-sm-12 col-md-3 col-lg-4',
                                    validators: [
                                        'required'
                                    ]
                                    // class: 'col-sm-12 col-md-3 col-lg-3'
                                },
                                plazas: {
                                    label: 'Plazas',
                                    disabled: true,
                                    control: {
                                        type: 'number',
                                        appearance: 'standard'
                                    },
                                    class: 'col-sm-12 col-md-3 col-lg-4',
                                    validators: [
                                        'required'
                                    ]
                                },
                                pmd: {
                                    label: 'PMD',
                                    disabled: true,
                                    control: {
                                        type: 'number',
                                        appearance: 'standard'
                                    },
                                    class: 'col-sm-12 col-md-3 col-lg-4',
                                    validators: [
                                        'required'
                                    ]
                                    // class: 'col-sm-12 col-md-3 col-lg-3',
                                }
                            }
                        },
                        // Producto
                        producto: {
                            title: 'Producto',
                            icon: 'event',
                            class: 'container',
                            children: {
                                producto: {
                                    label: 'Producto',
                                    disabled: true,
                                    control: {
                                        type: 'select',
                                        searchable: true,
                                        appearance: 'standard',
                                        path: '/listas/LIST_PRODUCTOS',
                                        filters: {
                                            p_seccion: '14'
                                        },
                                        options: {
                                            value: 'descri',
                                            key: 'producto'
                                        },
                                        pasteFieldOnSelect: 'producto',
                                        hasEmptyOption: true
                                    },
                                    class: 'col-sm-12 col-md-12 col-lg-4',
                                    validators: [
                                        'required'
                                    ]
                                }
                            }
                        },
                        // Forma de pago
                        forma_pago: {
                            title: `Forma de pago`,
                            icon: 'payment',
                            class: 'container',
                            // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
                            children: {
                                moneda: {
                                    label: 'Moneda',
                                    disabled: true,
                                    control: {
                                        type: 'select',
                                        searchable: true,
                                        appearance: 'standard',
                                        path: '/listas/LIST_MONEDAS',
                                        options: {
                                            value: 'descri',
                                            key: 'cod_mon'
                                        },
                                        pasteFieldOnSelect: 'cod_mon',
                                        hasEmptyOption: true
                                    },
                                    class: 'col-sm-12 col-md-12 col-lg-4',
                                    validators: [
                                        'required'
                                    ]
                                },
                                forma_pago: {
                                    label: 'Medios de Pago',
                                    disabled: true,
                                    control: {
                                        type: 'select',
                                        searchable: true,
                                        appearance: 'standard',
                                        path: '/listas/LIST_MEDIOS_PAGO',
                                        options: {
                                            value: 'rv_meaning',
                                            key: 'rv_low_value'
                                        },
                                        pasteFieldOnSelect: 'rv_meaning',
                                        hasEmptyOption: true
                                    },
                                    class: 'col-sm-12 col-md-12 col-lg-4',
                                },
                                cantidad_cuotas: {
                                    label: 'Planes de pago',
                                    disabled: true,
                                    control: {
                                        type: 'select',
                                        searchable: true,
                                        appearance: 'standard',
                                        path: '/listas/LIST_PLANES_PAGO',
                                        filters: {
                                            // p_seccion: 3,
                                            p_seccion: 14
                                        },
                                        options: {
                                            value: 'descri',
                                            key: 'cod_plan'
                                        },
                                        pasteFieldOnSelect: 'descri',
                                        hasEmptyOption: true
                                    },
                                    class: 'col-sm-12 col-md-12 col-lg-4',
                                }
                            }
                        },
                        // Usos
                        usos: {
                            title: 'Usos',
                            icon: 'event',
                            class: 'container',
                            // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
                            children: {
                                usos: {
                                    label: 'Usos',
                                    disabled: true,
                                    control: {
                                        type: 'check-list',
                                        path: '/listas/LIST_USOS',
                                        filtersRequired: true,
                                        options: {
                                            value: 'descri',
                                            key: 'cod_uso'
                                        },
                                        pasteFieldOnSelect: 'cod_uso'
                                    },
                                    class: 'col-sm-12 col-md-12 col-lg-12',
                                    validators: [
                                        'required'
                                    ]
                                }
                            }
                        },
                        // Coberturas
                        coberturas: {
                            title: 'Coberturas',
                            icon: 'donut_large',
                            class: 'container',
                            // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
                            children: {
                                cobertura: {
                                    title: 'Coberturas',
                                    hidden: false,
                                    disabled: false,
                                    control: {
                                        type: 'coberturas-table',
                                        editable: true,
                                        selectable: true,
                                        items: {
                                            selected: {
                                                label: 'Seleccionado',
                                                hidden: true,
                                                control: {
                                                    type: 'slide-toggle',
                                                    appearance: 'standard'
                                                },
                                                class: 'col-sm-12 col-md-3 col-lg-4'
                                            },
                                            required: {
                                                label: 'Obligatorio',
                                                hidden: true,
                                                control: {
                                                    type: 'slide-toggle',
                                                    appearance: 'standard'
                                                },
                                                class: 'col-sm-12 col-md-3 col-lg-4'
                                            },
                                            cod_cobert: {
                                                label: 'Cód. Cobertura',
                                                hidden: true,
                                                control: {
                                                    type: 'text',
                                                    appearance: 'standard'
                                                },
                                                validators: [
                                                    'required'
                                                ],
                                                class: 'col-sm-12 col-md-3 col-lg-4'
                                            },
                                            descri: {
                                                label: 'Cobertura',
                                                control: {
                                                    type: 'text',
                                                    appearance: 'standard'
                                                },
                                                validators: [
                                                    'required'
                                                ],
                                                class: 'col-sm-12 col-md-3 col-lg-4'
                                            },
                                            suma_asegurada: {
                                                label: 'Suma Asegurada',
                                                editable: true,
                                                control: {
                                                    type: 'number',
                                                    appearance: 'standard'
                                                },
                                                validators: [
                                                    'required'
                                                ],
                                                class: 'col-sm-12 col-md-3 col-lg-4'
                                                // class: 'col-sm-12 col-md-3 col-lg-4',
                                            },
                                            tasa: {
                                                label: 'Tasa',
                                                editable: true,
                                                control: {
                                                    type: 'number',
                                                    appearance: 'standard'
                                                },
                                                class: 'col-sm-12 col-md-3 col-lg-4',
                                                validators: [
                                                    'required'
                                                ]
                                            },
                                            prima: {
                                                label: 'Prima',
                                                editable: false,
                                                control: {
                                                    type: 'number',
                                                    appearance: 'standard'
                                                },
                                                class: 'col-sm-12 col-md-3 col-lg-4'
                                                /* validators: [
                                                    'required'
                                                ], */
                                                // class: 'col-sm-12 col-md-3 col-lg-3'
                                            }
                                        },
                                        validators: [
                                            'required'
                                        ],
                                        class: 'col-sm-12 col-md-12 col-lg-12',
                                        // columns: [/*'cod_cobert',*/'descri','suma_asegurada', 'tasa', 'prima']
                                        columns: [ 'cod_cobert','descri', 'suma_asegurada', 'tasa', 'prima'],
                                        // footer: [ 'suma_asegurada', 'tasa', 'prima']
                                    }
                                }
                            }
                        }
                    },
                    validators: [
                        'required'
                    ],
                    class: 'col-sm-12 col-md-12 col-lg-12',
                    columns: ['matricula','anio','marca','modelo','plazas','pmd','producto','cobertura','prima','acciones']
                }
            }
        }
    },
    producto: {
        title: 'Producto',
        icon: 'event',
        container: 'expansion-panel',
        expanded: false,
        children: {
            producto: {
                label: 'Producto',
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_PRODUCTOS',
                    filters: {
                        p_seccion: '14'
                    },
                    options: {
                        value: 'descri',
                        key: 'producto'
                    },
                    pasteFieldOnSelect: 'producto',
                    hasEmptyOption: true
                },
                class: 'col-sm-12 col-md-12 col-lg-4',
                /*validators: [
                    'required'
                ] */
            }
        }
    },
    usos: {
        title: 'Usos',
        icon: 'event',
        container: 'expansion-panel',
        expanded: false,
        // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
        children: {
            usos: {
                label: 'Usos',
                disabled: true,
                control: {
                    type: 'check-list',
                    path: '/listas/LIST_USOS',
                    filtersRequired: true,
                    options: {
                        value: 'descri',
                        key: 'cod_uso'
                    },
                    pasteFieldOnSelect: 'cod_uso'
                },
                class: 'col-sm-12 col-md-12 col-lg-12',
                /*validators: [
                    'required'
                ]*/
            }
        }
    },
    coberturas: {
        title: 'Coberturas',
        icon: 'donut_large',
        container: 'expansion-panel',
        expanded: false,
        // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
        children: {
            cobertura: {
                title: 'Coberturas',
                hidden: false,
                disabled: false,
                control: {
                    type: 'coberturas-table',
                    editable: true,
                    selectable: true,
                    items: {
                        selected: {
                            label: 'Seleccionado',
                            hidden: true,
                            control: {
                                type: 'slide-toggle',
                                appearance: 'standard'
                            },
                            class: 'col-sm-12 col-md-3 col-lg-4'
                        },
                        required: {
                            label: 'Obligatorio',
                            hidden: true,
                            control: {
                                type: 'slide-toggle',
                                appearance: 'standard'
                            },
                            class: 'col-sm-12 col-md-3 col-lg-4'
                        },
                        cod_cobert: {
                            label: 'Cód. Cobertura',
                            hidden: true,
                            control: {
                                type: 'text',
                                appearance: 'standard'
                            },
                            validators: [
                                'required'
                            ],
                            class: 'col-sm-12 col-md-3 col-lg-4'
                        },
                        descri: {
                            label: 'Cobertura',
                            control: {
                                type: 'text',
                                appearance: 'standard'
                            },
                            validators: [
                                'required'
                            ],
                            class: 'col-sm-12 col-md-3 col-lg-4'
                        },
                        suma_asegurada: {
                            label: 'Suma Asegurada',
                            editable: true,
                            control: {
                                type: 'number',
                                appearance: 'standard'
                            },
                            validators: [
                                'required'
                            ],
                            class: 'col-sm-12 col-md-3 col-lg-4'
                            // class: 'col-sm-12 col-md-3 col-lg-4',
                        },
                        tasa: {
                            label: 'Tasa',
                            editable: true,
                            control: {
                                type: 'number',
                                appearance: 'standard'
                            },
                            class: 'col-sm-12 col-md-3 col-lg-4',
                            validators: [
                                'required'
                            ]
                        },
                        prima: {
                            label: 'Prima',
                            editable: false,
                            control: {
                                type: 'number',
                                appearance: 'standard'
                            },
                            class: 'col-sm-12 col-md-3 col-lg-4'
                            /* validators: [
                                'required'
                            ], */
                            // class: 'col-sm-12 col-md-3 col-lg-3'
                        }
                    },
                    /*validators: [
                        'required'
                    ],*/
                    class: 'col-sm-12 col-md-12 col-lg-12',
                    // columns: [/*'cod_cobert',*/'descri','suma_asegurada', 'tasa', 'prima']
                    columns: [ 'cod_cobert','descri', 'suma_asegurada', 'tasa', 'prima'],
                    // footer: [ 'suma_asegurada', 'tasa', 'prima']
                }
            }
        }
    }
};

