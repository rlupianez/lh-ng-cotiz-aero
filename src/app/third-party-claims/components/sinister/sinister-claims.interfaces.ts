export enum LesionSinisterFieldEnum {
    sinisterType = "sinisterType",
    affectedCoverage = "affectedCoverage",
    thirdPartyCompany = "thirdPartyCompany",
    policy = "policy",
    healthcareCenter = "healthcareCenter",
    address = "address",
    number = "number",
    region = "region",
    city = "city",
    postalCode = "postalCode",
    assets = "assets",
    sinisterDescription = "sinisterDescription",
    hasInsurance = "hasInsurance",
    ambulance = "ambulance",
    criminalCase = "criminalCase",
    caseNumber = "numberCase",
    courtNumber = "numeroDeJuzgado",
    policeStation = "policeStation",
    propertyOwner = "propertyOwner",
    realTenant = "realTenant",
    assetTitular = "assetTitular"
};


export const InjuriesToPeopleFormField = [
    LesionSinisterFieldEnum.sinisterType,
    LesionSinisterFieldEnum.hasInsurance,
    LesionSinisterFieldEnum.affectedCoverage,
    LesionSinisterFieldEnum.thirdPartyCompany,
    LesionSinisterFieldEnum.policy,
    LesionSinisterFieldEnum.ambulance,
    LesionSinisterFieldEnum.healthcareCenter,
    LesionSinisterFieldEnum.criminalCase,
    LesionSinisterFieldEnum.caseNumber,
    LesionSinisterFieldEnum.courtNumber,
    LesionSinisterFieldEnum.policeStation,
    LesionSinisterFieldEnum.sinisterDescription
];

export const DamageLocationFormField = [
    LesionSinisterFieldEnum.sinisterType,
    LesionSinisterFieldEnum.address,
    LesionSinisterFieldEnum.number,
    LesionSinisterFieldEnum.region,
    LesionSinisterFieldEnum.city,
    LesionSinisterFieldEnum.postalCode,
    LesionSinisterFieldEnum.sinisterDescription,
    LesionSinisterFieldEnum.propertyOwner,
    LesionSinisterFieldEnum.realTenant,
    LesionSinisterFieldEnum.hasInsurance,
    LesionSinisterFieldEnum.affectedCoverage,
    LesionSinisterFieldEnum.thirdPartyCompany,
    LesionSinisterFieldEnum.policy
];

export const DamageOtherPropertyFormField = [
    LesionSinisterFieldEnum.sinisterType,
    LesionSinisterFieldEnum.address,
    LesionSinisterFieldEnum.number,
    LesionSinisterFieldEnum.region,
    LesionSinisterFieldEnum.city,
    LesionSinisterFieldEnum.postalCode,
    LesionSinisterFieldEnum.assets,
    LesionSinisterFieldEnum.sinisterDescription,
    LesionSinisterFieldEnum.hasInsurance,
    LesionSinisterFieldEnum.affectedCoverage,
    LesionSinisterFieldEnum.thirdPartyCompany,
    LesionSinisterFieldEnum.policy
];