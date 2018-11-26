# NgxAce

A quick and dirty Angular wrapper for the Ace code editor. Works with or without Angular form models. Loads Ace scripts and themes from a CDN or other URL.

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
export class MyComponent  {
  content = 'Hello World';
  editor: any;
  onEditorReady(editor) {
    // editor is an instance of Ace.Editor
    this.editor = editor;
    this.editor.setOptions({
      mode: 'ace/mode/markdown',
      theme: 'ace/theme/github'
    });
  }
}
```
```html
<!-- my.component.html -->
<div class="my-ace-wrapper">
  <ngx-ace [(ngModel)]="content" (ready)="onEditorReady($event)"></ngx-ace>
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

## API

### Interface `IAceEditorOptions`

The native ace editor options. You can provide a defaults for these options as needed. See `INgxAceOptions` below.
```typescript
mode?: string; // use the full path 'ace/mode/php'
theme?: string; // use the full path 'ace/mode/php'
selectionStyle?: 'line' | 'text';
highlightActiveLine?: boolean;
highlightSelectedWord?: boolean;
readOnly?: boolean;
cursorStyle?: 'ace' | 'slim' | 'smooth' | 'wide';
mergeUndoDeltas?: boolean | 'always';
behavioursEnabled?: boolean;
wrapBehavioursEnabled?: boolean;
autoScrollEditorIntoView?: boolean;
copyWithEmptySelection?: boolean;
useSoftTabs?: boolean;
navigateWithinSoftTabs?: boolean;
enableMultiselect?: boolean;
hScrollBarAlwaysVisible?: boolean;
vScrollBarAlwaysVisible?: boolean;
highlightGutterLine?: boolean;
animatedScroll?: boolean;
showInvisibles?: boolean;
showPrintMargin?: boolean;
printMarginColumn?: number;
printMargin?: false | number;
fadeFoldWidgets?: boolean;
showFoldWidgets?: boolean;
showLineNumbers?: boolean;
showGutter?: boolean;
displayIndentGuides?: boolean;
fontSize?: number | string;
fontFamily?: string;
maxLines?: number;
minLines?: number;
scrollPastEnd?: number | boolean;
fixedWidthGutter?: boolean;
scrollSpeed?: number;
dragDelay?:  number;
dragEnabled?: boolean;
focusTimeout?: number;
tooltipFollowsMouse?: boolean;
firstLineNumber?: number;
overwrite?: boolean;
newLineMode?: 'auto' | 'unix' | 'windows';
useWorker?: boolean;
tabSize?: number;
wrap?: boolean|number;
foldStyle?: 'markbegin' |'markbeginend' | 'manual';
```

### Interface `INgxAceOptions`
An object containing the URL of the cdn (or other location) that you want to load Ace from, and default editor options. You can optionally `provide` a different set of options with

```typescript
// The URL from which Ace will be loaded.
// Default: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1'
aceURL: string;
defaultEditorOptions?: IAceEditorOptions;
```

### const `NGX_ACE_OPTIONS`
The injection token for providing a custom  `INgxAceOptions`. Example...
```typescript
import { NgxAceModule,  INgxAceOptions, NGX_ACE_OPTIONS} from '@nowzoo/ngx-ace';

const aceOptions: INgxAceOptions = {
  aceURL: '/some/path/to/ace',
  defaultEditorOptions: {
    theme: 'ace/theme/chrome'
  }
};
@NgModule({
  imports: [
    NgxAceModule.forRoot()
  ],
  providers: [
    {provide: NGX_ACE_OPTIONS, useValue: aceOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


### Service `NgxAceService`
A service that takes care of loading the main `ace.js` script and setting the path for modes and themes. You probably do not need to use this at all.

#### Methods

- `loaded(): Promise<void>` Returns a promise that resolves when ace has been loaded on the page.


### Component `NgxAceComponent`

selector: `'ngx-ace'` | exportAs: `'ngxAce'`

#### Inputs
- `mode: string` Optional. Use only the language name, not the full path: `markdown` not `ace/mode/markdown`.
- `theme: string` Optional. Use only the name of the theme: `chrome`, not `ace/theme/chrome`.

#### Output
- `ready: EventEmitter<any>` Emits the ace editor instance when `ace.js` has been loaded and the component's editor has been initialized.





## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

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
