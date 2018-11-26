import { Component, OnInit, OnDestroy, Output, ElementRef, EventEmitter, forwardRef } from '@angular/core';
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
export class NgxAceComponent implements OnInit, OnDestroy, ControlValueAccessor {
  static counter = 0;
  @Output() ready: EventEmitter<any> = new EventEmitter();
  id: string;
  private _editor: any = null;
  private _value = '';
  propagateChange: (_: any) => void = () => {};
  propagateTouched: (_: any) => void = () => {};
  constructor(
    private _service: NgxAceService,
    private _elementRef: ElementRef,
  ) {}

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
    this.editor.setReadOnly(isDisabled);
  }

  ngOnInit() {
    this._service.loaded()
      .then(() => {
        this.id = `ngx-ace-${++NgxAceComponent.counter}`;
        this._editor = ace.edit(this._elementRef.nativeElement);
        this.editor.setValue(this._value);
        this.editor.on('change', () => {
          this.propagateChange(this.editor.getValue());
        });
        this.editor.on('blur', () => {
          this.propagateTouched(this.editor.getValue());
        });
        this.ready.emit(this.editor);
      });


  }

  ngOnDestroy() {
    this.editor.destroy();
  }

}
