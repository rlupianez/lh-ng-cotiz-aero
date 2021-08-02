export enum PersonalFieldEnum {
    surname = "surname",
    name = "name",
    documentType = "documentType",
    documentNumber = "documentNumber",
    cuit = "cuit",
    phone = "phone",
    celular = "celular",
    email = "email",
    sex = "sex",
    birthdate = "birthdate",
    country = "country"
};

export const PersonalClaimsField = [PersonalFieldEnum.name, PersonalFieldEnum.surname,
PersonalFieldEnum.documentType, PersonalFieldEnum.documentNumber,
PersonalFieldEnum.cuit,PersonalFieldEnum.celular, PersonalFieldEnum.phone, 
PersonalFieldEnum.email];

export const InjuredFormField = [PersonalFieldEnum.name, PersonalFieldEnum.surname,
PersonalFieldEnum.documentType, PersonalFieldEnum.documentNumber,
PersonalFieldEnum.cuit, PersonalFieldEnum.sex, PersonalFieldEnum.birthdate,
PersonalFieldEnum.country];