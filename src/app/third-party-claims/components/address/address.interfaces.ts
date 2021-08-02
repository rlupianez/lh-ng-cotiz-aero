export enum AddressFieldEnum {
    street = "street",
    number = "number",
    floor = "floor",
    deparment = "deparment",
    region = "region",
    city = "city",
    postalCode = "postalCode",
    phone = "phone",
    celular = "celular",
    email = "email",
}


export const FullAddressFieldEnum = [
    AddressFieldEnum.street, AddressFieldEnum.number,
    AddressFieldEnum.floor, AddressFieldEnum.number,
    AddressFieldEnum.region, AddressFieldEnum.city, 
    AddressFieldEnum.postalCode,
    AddressFieldEnum.phone, AddressFieldEnum.celular
];

//damageToVehicles