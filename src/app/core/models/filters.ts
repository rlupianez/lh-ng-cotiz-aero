interface LabelItem {
    text: string;
    class: string;
}

interface ControlItemOptions {
    value: string;
    key: string;
    description?: string;
}

type ControlType =  'typeahead' |
                    'text' | 
                    'select' | 
                    'monthyear-range' |
                    'date-range' |
                    'input' |
                    'button-toggle' | 'productor-control';

type ControlAppearance = 'legacy' | 'standard' | 'fill' | 'outline';


export interface ControlItem {
    type: ControlType;
    class?: string,
    path?:  string,
    appearance?: ControlAppearance;
    options?: ControlItemOptions
    pasteFieldOnSelect?: string;
    defaultValue?: string;
    config?: any;
    defaultValues?: object;
    hasEmptyOption?: boolean;
}

export interface FilterItem {
    label: LabelItem;
    control: ControlItem;
    class: string;
    required?: boolean;
}

export interface FilterField<FilterItem> {  
    [key: string]: FilterItem 
}

