export interface ColumnItem {
    label: string;
    visible?: boolean;
    class?: string;
    icon?: string;
    action?: boolean;
    prefix?: string;
    suffix?: string;
    align?: string;
}

export interface TableColumn<ColumnItem> {
    [key: string]: ColumnItem
}