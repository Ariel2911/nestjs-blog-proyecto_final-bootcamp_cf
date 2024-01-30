# Cody Blog

## **Indice de contenido**

[TOC]

## Descripción

Este es el proyecto final del bootcamp de JavaScript en el Backend organizado por Código Facilito. Esta construido con NestJS.
Los lineamientos del projecto se encuentran [aqui](https://iamdoomling.notion.site/iamdoomling/Trabajo-pr-ctico-final-f366a1dab34245ae83726bb31fb59a25)

## Herramientas utilizadas

### Documentación

- **Readme**: Es una pieza que no debería faltar en ningún proyecto y como su nombre lo indica siempre deberíamos leerlo, usualmente se escribe en markdown. Vive en el mismo repositorio y **nos indica cómo comenzar a utilizarlo, donde encontramos información útil y más**.

- **Swagger**(OpenAPI en NestJS): Esta herramienta define una interfaz estándar para describir APIs REST, que incluye rutas, parámetros, respuestas y mucho másUna de las características más destacadas de Swagger es su **capacidad para generar automáticamente documentación legible y explorable**. En NestJS, cuando se utiliza se emplean varios recoradores que ayudan a definir y organizar la documentación de manera clara y estructurada.

- **Compodoc**: Es una herramienta de documentación para proyectos de TypeScript, muy utilizada en aplicaciones Angular y también compatible con NestJS y otros frameworks TypeScript. Su principal función es **generar una documentación estática del código fuente** de un proyecto, utilizando comentarios en formato JSDoc, ayudando a visualizar la estructura y arquitectura del mismo de manera clara y organizada.

### Autenticación

Se implementa **Bearer Token** como metodo de proteción. Utilizando este metodo se genera y codifica un token con una duración especifíca el cual se envía en las HTTP requests para que el servidor determine cuál es el usuario y si es válido. Quien posea el token posee acceso a la información. Para ello utilizaremos las siguientes librerias:

- **Passport**: Es un middleware de autenticación para NodeJS. Tres de sus pricipales caracteristicas son:

1. La capacidad de aplicar estrategías que son formas de autenticar a nuestros usuarios. Por ejemplo: Twitter, Google, GitHub.
2. Extremadamente flexible.
3. Buena intregración con frameworks.

- **JWT(Json Web Token)**: Es un estándar para compartir información de forma compacta y autónoma entre dos partes de forma segura. Esta información puede ser verificada y confiable porque está firmada digitalmente.

## Requisitos previos

- NodeJS (v12 o superior)
- npm(v6 o superior)
- NestJS CLI

## Instalación

1. Clonar el repositorio

   ```bash
   $ git clone https://github.com/Ariel2911/nestjs-blog-proyecto_final-bootcamp_cf.git
   ```

2. Navegar al directorio

   ```bash
   $ cd nestjs-blog-proyecto_final-bootcamp_cf
   ```

3. Instalar dependencias

   ```bash
   $ npm install
   ```

## Ejecución

Modo desarrollo:

```bash
$ npm run start
```

Modo watch:

```bash
$ npm run start
```

Modo Producción:

```bash
$ npm run start
```

## Punto de acceso

http://localhost:3000/api

## Documentación

Para acceder a la información detallada de los end points se debe iniciar el servidor y acceder a [http://localhost:3000/api/docs](http://localhost:3000/api/docs). Esta documentación fue generada usando Swagger.

## Licencia

[MIT](https://es.wikipedia.org/wiki/Licencia_MIT).
