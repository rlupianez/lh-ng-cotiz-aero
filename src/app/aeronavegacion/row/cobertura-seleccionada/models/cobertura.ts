export interface Cobertura {
    selected: boolean,
    codigo: number,
    descripcion: string,
    sumaAsegurada: number,
    obligatorio: boolean,
    porcTasa: number,
    prima: number,
    premio: number,
    habilitarPazas: boolean,
    plazas: string,
    maxPlazas: number,
    plazaValida: boolean,
    esDolar: boolean,
    modificaSuma: boolean,
    inhabilita_a: string,
    obliga_a: string,
    sumaAseguradaPorAsiento: number,
    argentino_oro: number
}; 


export interface CoberturasDataSet {
    seleccionadas: Array<Cobertura>,
    incluidas: Array<Cobertura>

};