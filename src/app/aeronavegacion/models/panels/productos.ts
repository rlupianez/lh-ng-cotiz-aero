export const fields = {
    cod_producto: {
        label: 'Producto',
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',
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
    },
    desc_producto: {
        label: 'Producto',
        control: {
            type: 'text'
        },
        class: 'col-sm-12 col-md-12 col-lg-4',
        validators: [
            'required'
        ]
    },
    cod_riesgo: {
        label: 'Riesgo',
        disabled: true,
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',
            filtersRequired: true,
            path: '/listas/LIST_RIESGOS',
            options: {
                value: 'descri',
                key: 'cod_riesgo'
            },
            pasteFieldOnSelect: 'cod_riesgo',
            hasEmptyOption: true
        },
        class: 'col-sm-12 col-md-12 col-lg-4',
        validators: [
            'required'
        ]
    },
    desc_riesgo: {
        label: 'Producto',
        control: {
            type: 'text'
        },
        class: 'col-sm-12 col-md-12 col-lg-4',
        validators: [
            'required'
        ]
    },
}

export const formFields = {
    cod_producto: { hidden: false, disabled: false },
    desc_producto: { hidden: true, disabled: true }, 
    cod_riesgo: { hidden: false, disabled: true },
    desc_riesgo: { hidden: true, disabled: true }
}

export const viewFields = {
    cod_producto: { hidden: true, disabled: true },
    desc_producto: { hidden: false, disabled: true }, 
    cod_riesgo: { hidden: true, disabled: true },
    desc_riesgo: { hidden: false, disabled: true }
}

export const group = {
    title: 'Producto',
    icon: 'event',
    container: 'expansion-panel',
    expanded: false,
    children: fields
}


////////////////////////////////////////////////////////////////////////////////////////////////

export const fieldsEmitir = {
    cod_producto: {
        label: 'Producto',
        hidden: true,
        disabled: true,
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',
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
    },
    desc_producto: {
        label: 'Producto',
        disabled: true,
        control: {
           type: 'text'
        },
        class: 'col-sm-12 col-md-12 col-lg-4'
    },
    cod_riesgo: {
        label: 'Riesgo',
        hidden: true,
        disabled: true,
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',
            path: '/listas/LIST_RIESGOS',
            options: {
                value: 'descri',
                key: 'cod_riesgo'
            },
            pasteFieldOnSelect: 'cod_riesgo',
            hasEmptyOption: true
        },
        class: 'col-sm-12 col-md-12 col-lg-4',
        validators: [
            'required'
        ]
    },
    desc_riesgo: {
        label: 'Riesgo',
        disabled: true,
        control: {
           type: 'text'
        },
        class: 'col-sm-12 col-md-12 col-lg-4'
    }
}

export const groupEmitir = {
    title: 'Producto',
    icon: 'event',
    container: 'expansion-panel',
    expanded: false,
    children: fieldsEmitir
}