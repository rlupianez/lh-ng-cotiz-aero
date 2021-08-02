export enum UniformCapitalDataFieldEnum {
    variableCapital = "variableCapital",
    fixedCapital = "fixedCapital",
    employeesCount = "employeesCount",
    quote = "quote",
    sumAssured = "sumAssured",
    prime = "prime",
    prize = "prize",
    save = "save",
    rosted = "rosted",
}

export const quoteUniformCapital = [
    UniformCapitalDataFieldEnum.prime,
    UniformCapitalDataFieldEnum.sumAssured,
    UniformCapitalDataFieldEnum.prize
];

export const fixedWithEmployeesCapital = [
    UniformCapitalDataFieldEnum.fixedCapital,
    UniformCapitalDataFieldEnum.employeesCount,
];

export const fixedCapital = [
    UniformCapitalDataFieldEnum.fixedCapital,
];

export const variableCapital = [
    UniformCapitalDataFieldEnum.variableCapital,
];

export enum UniformCapitalTypeEnum {
    'LeydeContratodeTrabajo' = 1,
    'ConvenioMercantil' = 2,
    'EmpleadosRurales' = 3,
    'MuerteInvalidez' = 4,
    'MultiplosdeSueldos' = 5,
    'Sepelio' = 6,
    'SaldoDeudor' = 7,
    'ColectivoObligatorio' = 8
};