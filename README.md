# Holando Net

## Proyecto: ANG00002 - Cotizador de Aero

### Descripción: Cotizador de aero heredado de Habito 1

### web: /<app>/reportes/lh-ng-retenciones/#/list
### local: localhost:4200/#/list
### Ubicacion de la distribucion en web server: /oracle/ntapp/hnet3.0/reportes/lh-ng-retenciones

---
---

## Versión: 1

```text
Fecha, Version, Programador, Tarea
----------------------------------------------------
26/07/2021, v1, rlupianez, #44632 - Bug fixings
```

---

---

## Checklist

```text
Establecer en angular.json el campo "baseHref":"/app/<ruta>/<modulo>/"

Quitar los modulos que no se utilizan en este proyecto como ser /home /transporte etc.

Modificar enviroment.ts campo apiUrl: 
'/rws' para generar la distribución
'/api' para ejectuar localmente
production: false si se ejecuta localmente o true si se genera la distribución
```


## Utilidades

```text
Reconstruir proyectos:
npm install

Ejecutar localmente:
npm run proxy
o
ng serve --host=0.0.0.0 --proxy-config=proxy.conf.json

Generar distribución:
    - Verificar el archivo environment.ts y cambiar apiURL de /api a rws
    - Comentar la creación de cookie utilzada en desarrollo en el archivo app.component.ts
    - Luego ejecutar
        npm run ng build --prod --optimization=true
        o
        ng build --prod --optimization=true


Varios GitHub:
git init
git remote rm origin
git remote add origin "https://github.com/rlupianez/lh-ng-cotiz-aero.git"
git add --all
git commit -m "Version 2"
git branch -M main
git push -u origin main