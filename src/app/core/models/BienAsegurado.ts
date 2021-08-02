
/* ----- AUTO ------
    Patente: patente 
    Marca vehiculo: marca 
    Modelo vehiculo: modelo 
    Año Fabricacion: anio_fab
    Motor: motor 
    Chasis: chasis 
    Carroceria: carroceria 
    Uso: uso 
    Nombre del Acreedor: acr_nombre 
    Domicilio del Acreedor: acr_domi 
    Nombre del Titular: titul_nom 
    Domicilio del Titular: titul_doM 
    Codigo Postal del titular: titul_cp 
    Conservacion: conservac 
    Tonelaje: tonelaje 
    Cilindrada: cilindrada 
    Asientos: Asientos 
*/

export const BienAseguradoAuto = {
    patente: { type: 'field', label: 'Patente' },
    marca: { type: 'field', label: 'Marca Vehículo' },
    modelo: { type: 'field', label: 'Modelo Vehículo' },
    anio_fab: { type: 'field', label: 'Año Fabricación' },
    motor: { type: 'field', label: 'Motor' },
    chasis: { type: 'field', label: 'Chasis' },
    carroceria: { type: 'field', label: 'Carrocería' },
    uso: { type: 'field', label: 'Uso' },
    conservac: { type: 'field', label: 'Conservación' }
}

/** --- AERO
 Marca: marca
Modelo: modelo
Matricula: matricula
Serie : serie
Año: anio
Categoria: categoria
Limite Geografico: limite_geografico
Actividad: actividad

 */

export const BienAseguradoAero = {
    marca: { type: 'field', label: 'Marca' },
    modelo: { type: 'field', label: 'Modelo' },
    matricula: { type: 'field', label: 'Matricula' },
    serie: { type: 'field', label: 'Serie' },
    anio: { type: 'field', label: 'Año' },
    categoria: { type: 'field', label: 'Categoría' },
    limite_geografico: { type: 'field', label: 'Limite Geográfico' },
    actividad: { type: 'field', label: 'Actividad' }
}


/*** --- CASCOS
 
Año:  anio 
Casco:  casco 
Eslora:  eslora 
Franquicia:  franquicia 
Manga:  manga 
Matricula:  matricula 
Motor:  motor 
Nro. de Motor:  n_motor 
Puntal:  puntal 
Navegacion:  construccion 
Construccion:  navegacion 
 
 */


export const BienAseguradoCascos = {
    anio: { type: 'field', label: 'Año' },
    casco: { type: 'field', label: 'Casco' },
    eslora: { type: 'field', label: 'Eslora' },
    //franquicia: { type: 'field', label: 'Franquicia' },
    manga: { type: 'field', label: 'Manga' },
    matricula: { type: 'field', label: 'Matricula' },
    motor: { type: 'field', label: 'Motor' },
    //n_motor: { type: 'field', label: 'Nro. de Motor' },
    puntal: { type: 'field', label: 'Puntal' },
    construccion: { type: 'field', label: 'Navegación' },
    navegacion: { type: 'field', label: 'Construcción' }
}

/** --MERCADERIAS 
 Salida: salida
Destino: destino
Fec. Viaje: fec_viaje
Orden: x_orden
Medio: medio
Observaciones: x_observ
*/

export const BienAseguradoMercaderias = {
    salida: { type: 'field', label: 'Salida' },
    x_orden: { type: 'field', label: 'Orden' },
    destino: { type: 'field', label: 'Destino' },
    medio: { type: 'field', label: 'Medio' },
    fec_viaje: { type: 'field', label: 'Fec. Viaje' },
    x_observ: { type: 'field', label: 'Observaciones' }
}

/** PERSONAS

Apellido y Nombre: nombre
CUIL: cuil
Especificacion: domi_espec
Calle: domi_calle
Piso: domi_piso
Depto: domi_depto
Puerta: domi_puert
Localidad: domi_loc
Jurisdiccion: jurisdiccion
Estado Civil: est_civil
Tipo Documento: tipo_docum
Nro. Documento: nro_docum
Sexo: sexo
Tutor: tutor
 
 */

export const BienAseguradoPersonas = {
    nombre: { type: 'field', label: 'Apellido y Nombre' },
    jurisdiccion: { type: 'field', label: 'Jurisdicción' },
    tipo_docum: { type: 'field', label: 'Tipo Documento' },
    nro_docum: { type: 'field', label: 'Nro. Documento' },
    sexo: { type: 'field', label: 'Sexo' },
    /*
    cuil: { type: 'field', label: 'CUIL' },
    domi_espec: { type: 'field', label: 'Especificación' },
    domi_calle: { type: 'field', label: 'Calle' },
    domi_piso: { type: 'field', label: 'Piso' },
    domi_depto: { type: 'field', label: 'Depto' },
    domi_puert: { type: 'field', label: 'Puerta' },
    domi_loc: { type: 'field', label: 'Localidad' },
    est_civil: { type: 'field', label: 'Estado Civil' },
    tutor: { type: 'field', label: 'Tutor' }
    */
}

/* UBICACIONES
Calle tipo: tipo_calle
Calle nombre: nombre_calle
Calle numero: puerta_calle
Localidad: localidad
Jurisdiccion: jurisdiccion
Partido: partido
Descripcion: descripcion

*/


export const BienAseguradoUbicaciones = {
    nombre_calle: { type: 'field', label: 'Calle' },
    puerta_calle: { type: 'field', label: 'Número' },
    localidad: { type: 'field', label: 'Localidad' },
    jurisdiccion: { type: 'field', label: 'Jurisdicción' },
    partido: { type: 'field', label: 'Partido' },
    descripcion: { type: 'field', label: 'Descripción' }
}


export const BienAseguradoVarios = {
    descri: { type: 'field', label: 'Descripción' },
    observ: { type: 'field', label: 'Observación' },
}


/////////////////////////////////////////////////////////////

export const BienAseguradoList = {
    nro_rie: { label: 'Riesgo', type: 'field' },
    estado: { label: 'Estado', type: 'field' },
    desc_riesgo: { label: 'Descripción', type: 'field' },
    suma_aseg: { label: 'Suma Asegurada', type: 'field' },
    prima: { label: 'Prima', type: 'field' }
}