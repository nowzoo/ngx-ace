import { Component, OnInit, OnChanges, OnDestroy, Input, ElementRef, SimpleChanges, Inject, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Ace } from 'ace-builds';
import { NgxAceService } from './ngx-ace.service';
import { NGX_ACE_OPTIONS, INgxAceOptions} from './shared';

declare const ace: any;
@Component({
  selector: 'ngx-ace',
  exportAs: 'ngxAce',
  template: ``,
  styles: [':host {display: block; width: 100%; height: 100%}'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxAceComponent),
    multi: true
  }]
})
export class NgxAceComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  static counter = 0;
  @Input() mode: string = null;
  @Input() theme: string = null;
  @Input() fontSize: string = null;
  id: string;

  private _editor: Ace.Editor = null;
  private _value: string;
  propagateChange: (_: any) => void = () => {};
  propagateTouched: (_: any) => void = () => {};
  constructor(
    private _service: NgxAceService,
    private _elementRef: ElementRef,
    @Inject(NGX_ACE_OPTIONS) private _options: INgxAceOptions
  ) { }

  get service(): NgxAceService {
    return this._service;
  }

  get editor(): Ace.Editor {
    return this._editor;
  }

  get session(): Ace.EditSession {
    return this.editor.session;
  }

  writeValue(value: string) {
    this._value = value || '';
    if (! this.editor) {
      return;
    }
    this.editor.setValue(this._value);
  }

  registerOnChange(fn: (_: any) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: (_: any) => void) {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.editor.setReadOnly(isDisabled);
  }

  ngOnInit() {
    this.id = `ngx-ace-${++NgxAceComponent.counter}`;
    this.mode = this.mode || 'html';
    this.fontSize = this.fontSize || this._options.defaultFontSize;
    this.theme = this.theme || this._options.defaultTheme;
    this.service.loaded()
      .then(() => {
        this._editor = ace.edit(this._elementRef.nativeElement);
        this.session.setMode(`ace/mode/${this.mode}`);
        this.editor.setTheme(`ace/theme/${this.theme}`);
        this.editor.setFontSize(this.fontSize);
        this.editor.setValue(this._value);
        this.editor.on('change', () => {
          this.propagateChange(this.editor.getValue());
        });
        this.editor.on('blur', () => {
          this.propagateTouched(this.editor.getValue());
        });
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (! this.editor) {
      return;
    }
    if (changes.mode) {
      this.session.setMode(`ace/mode/${this.mode}`);
    }
    if (changes.theme) {
      this.editor.setTheme(`ace/theme/${this.theme}`);
    }
    if (changes.fontSize) {
      this.editor.setFontSize(this.fontSize);
    }
  }

  ngOnDestroy() {
    this.editor.destroy();
  }
}
