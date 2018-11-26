# NgxAce

A simple Angular library for creating Ace editors. Loads scripts and themes from a CDN or other URL.

## Installation

```bash
npm i --save @nowzoo/ngx-ace
```

## Quick Start

Import the library into your app...
```typescript
import { NgxAceModule } from '@nowzoo/ngx-ace';
// ...
@NgModule({
  imports: [
    NgxAceModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Use the `ngx-ace` component...
```typescript
// my.component.ts
export class MyComponent {
  content = 'Hello World';
}
```
```html
<!-- my.component.html -->
<div class="my-ace-wrapper">
  <ngx-ace mode="markdown" [(ngModel)]="content"></ngx-ace>
</div>
```

**Important note about sizing...**

The `ngx-ace` component is styled with `height: 100%; width: 100%`. In order for the ace editor to show up you must wrap the component with an element with a height...

```scss
.my-ace-wrapper {
  height: 400px;
  border: 1px solid #DDD;
}
```  

You can use the component with template (`ngModel`) or reactive (`[formControl]="myControl"`) controls. You can also use the component without Angular forms, by accessing the underlying Ace editor instance directly...



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

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
