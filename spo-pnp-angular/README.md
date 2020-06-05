# SpoPnpNgPoc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deployment
Run npm install to install the necessary packages mentioned in the package.json

Create HomePageNew.aspx under SitePages library

As per the below build command, update the site Url accordingly and run it

ng build --base-href /Portal/SitePages/HomePageNew.aspx/ --deploy-url /Portal/Apps/spo-pnp-angular/

Create document library as Apps in SharePoint site and create folder as "spo-pnp-angular" under Apps

Upload the build files from dist/spo-pnp-angular folder to the spo-pnp-angular folder which is created in SPO site

Add CEWP in the aspx page which is created earlier and refer the index.html which is uploaded in the site.