export const fields = {
    usos: {
        label: 'Usos',
        disabled: true,
        control: {
            type: 'check-list',
            path: '/listas/LIST_USOS',
            filtersRequired: true,
            options: {
                value: 'x_descri',
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

export const group = {
    title: 'Usos',
    icon: 'event',
    class: 'container',
    children: fields
}