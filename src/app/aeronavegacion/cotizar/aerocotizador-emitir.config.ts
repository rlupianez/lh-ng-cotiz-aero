import { Validators } from '@angular/forms';
import * as moment from 'moment';

export const AeroCotizadorEmitir = {
    datos_productor: {
        title: 'Datos del productor',
        icon: 'assignment_ind',
        container: 'expansion-panel',
        expanded: true,
        // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
        children: {
            productor: {
                label: 'Productor',
                disabled: true,
                editable: false,
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
                disabled: true,
                editable: false,
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
                disabled: true,
                hidden: true,
                control: {
                    type: 'number',
                    appearance: 'standard',
                    config: {
                        maxlength: 8
                    }
                },
                validators: [
                    Validators.minLength(8),
                    Validators.maxLength(8)
                ],
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            nro_cuit: {
                label: 'CUIT',
                disabled: true,
                hidden: true,
                control: {
                    type: 'number',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4',
                validators: [
                    Validators.minLength(11),
                    Validators.maxLength(11)
                ]
            },
            tipo_persona: {
                label: 'Tipo de persona',
                disabled: true,
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
            },
            condicion_iibb: {
                label: 'Condicion IIBB',
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
            }*/
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
                disabled: true,
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                validators: [
                    'required'
                ],
                class: 'col-6 col-sm-3 col-md-3 col-lg-4',
            },
            apellido: {
                label: 'Apellido',
                disabled: true,
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            razon_social: {
                label: 'Razón Social',
                disabled: true,
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            actividad: {
                label: 'Actividad',
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_ACTIVIDADES',
                    options: {
                        value: 'descri',
                        key: 'cod_activi'
                    },
                    pasteFieldOnSelect: 'descri',
                    hasEmptyOption: true
                },
                class: 'col-12 col-sm-3 col-md-3 col-lg-4'
            },
            fecha_nacimiento: {
                label: 'Fecha de Nacimiento',
                control: {
                    type: 'datepicker',
                    appearance: 'standard',
                    format: 'dd/mm/yyyy'
                },
                required: true,
                class: 'col-sm-12 col-md-12 col-lg-4'
            },
            sexo: {
                label: 'Sexo',
                disabled: true,
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_SEXOS',
                    options: {
                        value: 'descri',
                        key: 'codigo'
                    },
                    pasteFieldOnSelect: 'descri',
                    hasEmptyOption: true
                },
                class: 'col-12 col-sm-3 col-md-3 col-lg-4'
            },
            nacionalidad: {
                label: 'Nacionalidad',
                disabled: true,
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_NACIONALIDADES',
                    options: {
                        value: 'x_pais',
                        key: 'cod_pais'
                    },
                    pasteFieldOnSelect: 'x_pais',
                    hasEmptyOption: true
                },
                class: 'col-12 col-sm-3 col-md-3 col-lg-4'
            },
            calle: {
                label: 'Calle',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            numero: {
                label: 'Número',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            piso: {
                label: 'Piso',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            }, 
            departamento: {
                label: 'Departamento',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            provincia: {
                label: 'Provincia',
                disabled: true,
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
            },
            localidad: {
                label: 'Localidad',
                disabled: true,
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_LOCALIDADES',
                    options: {
                        value: 'desc_localidad',
                        key: 'cod_postal'
                    },
                    pasteFieldOnSelect: 'desc_localidad',
                    hasEmptyOption: true
                },
                class: 'col-12 col-sm-3 col-md-3 col-lg-4'
            },
            codigo_postal: {
                label: 'Código Postal',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            /*tipo_telefono: {
                label: 'Tipo Teléfono',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },*/
            cod_area: {
                label: 'Cód. Area',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            telefono: {
                label: 'Número',
                control: {
                    type: 'number',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            email: {
                label: 'Email',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                validators: [
                    Validators.email,
                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
                ],
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            poliza_electronica: {
                label: 'Póliza Electrónica',
                control: {
                    type: 'slide'
                },
                class: 'col-sm-12 col-md-12 col-lg-12'
            }
        },
    },
    vigencia_contrato: {
        title: `Vigencia del contrato`,
        icon: 'receipt',
        container: 'expansion-panel',
        expanded: false,
        // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
        children: {
            vigencia: {
                label: 'Vigencia',
                disabled: true,
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    options: [
                        { key: 'Anual', value: 'Anual' }
                    ],
                    pasteFieldOnSelect: 'key'
                },
                class: 'col-sm-12 col-md-12 col-lg-4',
            },
            vigencia_desde: {
                label: 'Fecha Vigencia Desde',
                disabled: true,
                hidden: true,
                control: {
                    type: 'datepicker',
                    appearance: 'standard',
                    format: 'dd/mm/yyyy'
                },
                class: 'col-sm-12 col-md-12 col-lg-4'
            },
            vigencia_hasta: {
                label: 'Fecha Vigencia Hasta',
                hidden: true,
                disabled: true,
                control: {
                    type: 'datepicker',
                    appearance: 'standard',
                    format: 'dd/mm/yyyy'
                },
                class: 'col-sm-12 col-md-12 col-lg-4'
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
                disabled: true,
                editable: false,
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
                disabled: true,
                editable: false,
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
                disabled: true,
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
                disabled: true,
                editable: false,
                children: {
                    matricula: {
                        label: 'Matricula',
                        disabled: true,
                        control: {
                            type: 'text',
                            appearance: 'standard'
                        },
                        validators: [
                            'required'
                        ],
                        class: 'col-sm-12 col-md-3 col-lg-4'
                    },
                    anio: {
                        label: 'Año',
                        disabled: true,
                        control: {
                            type: 'number',
                            appearance: 'standard'
                        },
                        /*validators: [
                            'required'
                        ],*/
                        class: 'col-sm-12 col-md-3 col-lg-4'
                        // class: 'col-sm-12 col-md-3 col-lg-4',
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
                        class: 'col-sm-12 col-md-3 col-lg-4'
                        /* validators: [
                            'required'
                        ], */
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
                        class: 'col-sm-12 col-md-3 col-lg-4'
                        /* validators: [
                            'required'
                        ], */
                        // class: 'col-sm-12 col-md-3 col-lg-3',
                    }
                }
            },
            ///////////////// ES FLOTA ////////////////////////
            riesgos: {
                title: 'Riesgos',
                hidden: true,
                disabled: true,
                editable: false,
                control: {
                    type: 'table',
                    actions: {
                        addDialog: true
                    },
                    items: {
                        matricula: {
                            label: 'Matricula',
                            control: {
                                type: 'text',
                                appearance: 'standard'
                            },
                            validators: [
                                'required'
                            ],
                            class: 'col-sm-12 col-md-3 col-lg-4'
                        },
                        anio: {
                            label: 'Año',
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
                        marca: {
                            label: 'Marca',
                            control: {
                                type: 'text',
                                appearance: 'standard'
                            },
                            class: 'col-sm-12 col-md-3 col-lg-4',
                            validators: [
                                'required'
                            ]
                        },
                        modelo: {
                            label: 'Modelo',
                            control: {
                                type: 'text',
                                appearance: 'standard'
                            },
                            class: 'col-sm-12 col-md-3 col-lg-4'
                            /* validators: [
                                'required'
                            ], */
                            // class: 'col-sm-12 col-md-3 col-lg-3'
                        },
                        plazas: {
                            label: 'Plazas',
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
                            control: {
                                type: 'number',
                                appearance: 'standard'
                            },
                            class: 'col-sm-12 col-md-3 col-lg-4'
                            /* validators: [
                                'required'
                            ], */
                            // class: 'col-sm-12 col-md-3 col-lg-3',
                        },
                        cobertura: {
                            label: 'Cobertura',
                            control: {
                                type: 'text',
                                appearance: 'standard'
                            },
                            class: 'col-sm-12 col-md-3 col-lg-4'
                            /*  validators: [
                                 'required'
                             ] */
                        },
                        prima: {
                            label: 'Prima',
                            control: {
                                type: 'number',
                                appearance: 'standard'
                            },
                            class: 'col-sm-12 col-md-3 col-lg-4'
                            /*  validators: [
                                 'required'
                             ] */
                        }
                    },
                    validators: [
                        'required'
                    ],
                    class: 'col-sm-12 col-md-12 col-lg-12',
                    columns: ['matricula', 'anio', 'marca', 'modelo', 'plazas', 'pmd', 'producto', 'cobertura', 'prima', 'acciones']
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
                disabled: true,
                editable: false,
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
                disabled: true,
                editable: false,
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
            },
            forma_pago: {
                label: 'Medios de Pago',
                disabled: true,
                editable: false,
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
                editable: false,
                control: {
                    type: 'select',
                    searchable: true,
                    appearance: 'standard',
                    path: '/listas/LIST_PLANES_PAGO',
                    filters: {
                        p_seccion: '14'
                    },
                    options: {
                        value: 'descri',
                        key: 'cod_plan'
                    },
                    pasteFieldOnSelect: 'descri',
                    hasEmptyOption: true
                },
                class: 'col-sm-12 col-md-12 col-lg-4',
            },
            cbu: {
                label: 'CBU',
                disabled: true,
                control: {
                    type: 'number',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            titular_cbu: {
                label: 'Titular CBU',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            banco: {
                label: 'Banco',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            tipo_tarjeta: {
                label: 'Tipo de Tarjeta de Crédito',
                disabled: true,
                control: {
                    type: 'number',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            tarjeta_credito: {
                label: 'Nro de Tarjeta de Crédito',
                disabled: true,
                control: {
                    type: 'number',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            titular_tarjeta: {
                label: 'Titular',
                control: {
                    type: 'input',
                    appearance: 'standard'
                },
                class: 'col-6 col-sm-3 col-md-3 col-lg-4'
            },
            vencimiento_tarjeta: {
                label: 'Fecha de Vencimiento',
                hidden: true,
                control: { 
                  type: 'periodpicker',
                  appearance: 'standard',
                  config: {
                    min: moment()
                  },
                },
                class: 'col-sm-12 col-md-12 col-lg-4'
            },
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
                editable: false,
                control: {
                    type: 'check-list',
                    path: '/listas/LIST_USOS',
                    options: {
                        value: 'descri',
                        key: 'cod_uso'
                    },
                    pasteFieldOnSelect: 'cod_uso',
                },
                class: 'col-sm-12 col-md-12 col-lg-12'
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
                disabled: true,
                editable: false,
                control: {
                    type: 'coberturas-table',
                    editable: false,
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
                    columns: [ 'cod_cobert','descri', 'suma_asegurada', 'tasa', 'prima']
                }
            }
        }
    }
};



