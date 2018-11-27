import { Component, OnInit, OnChanges, OnDestroy, Input, Output, ElementRef, EventEmitter, SimpleChanges,
  NgZone, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgxAceService } from './ngx-ace.service';
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
  @Output() ready: EventEmitter<any> = new EventEmitter();
  id: string;
  private _editor: any = null;
  private _value = '';
  private _disabled = false;
  propagateChange: (_: any) => void = () => {};
  propagateTouched: (_: any) => void = () => {};
  constructor(
    private _service: NgxAceService,
    private _elementRef: ElementRef,
    private _zone: NgZone,
  ) {}

  get service(): NgxAceService {
    return this._service;
  }

  get editor(): any {
    return this._editor;
  }

  get session(): any {
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
    this._disabled = isDisabled;
    if (this.editor) {
      this.editor.setReadOnly(isDisabled);
    }

  }

  ngOnInit() {
    this._zone.runOutsideAngular(() => {
      this.service.loaded()
        .then(() => {
          this._zone.run(() => {
            this.id = `ngx-ace-${++NgxAceComponent.counter}`;
            this._editor = ace.edit(this._elementRef.nativeElement);
            if (this.service.defaultEditorOptions) {
              this.editor.setOptions(this.service.defaultEditorOptions);
            }
            this.editor.setReadOnly(this._disabled);
            this.onModeChanged();
            this.onThemeChanged();
            this.editor.setValue(this._value);
            this.editor.on('change', this.onEditorValueChange.bind(this));
            this.editor.on('blur', this.onEditorBlurred.bind(this));
            this.ready.emit(this.editor);
          });
        });
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (! this.editor) {
      return;
    }
    if (changes.mode) {
      this.onModeChanged();
    }
    if (changes.theme) {
      this.onThemeChanged();
    }

  }

  ngOnDestroy() {
    this.editor.destroy();
  }

  onModeChanged() {
    if (this.mode) {
      this.session.setMode(`ace/mode/${this.mode}`);
    }
  }

  onThemeChanged() {
    if (this.theme) {
      this.editor.setTheme(`ace/theme/${this.theme}`);
    }
  }



  onEditorValueChange() {
    this.propagateChange(this.editor.getValue());
  }

  onEditorBlurred() {
    this.propagateTouched(this.editor.getValue());
  }



}
