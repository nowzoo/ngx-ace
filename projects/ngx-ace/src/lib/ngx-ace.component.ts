import { Component, OnInit, OnChanges, OnDestroy,
  Input, Output, ElementRef, SimpleChanges, EventEmitter, forwardRef } from '@angular/core';
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
  @Input() mode = 'text';
  @Input() theme = 'chrome';

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<Event> = new EventEmitter();
  @Output() focus: EventEmitter<Event> = new EventEmitter();
  @Output() changeSelectionStyle: EventEmitter<any> = new EventEmitter();
  @Output() changeSession: EventEmitter<any> = new EventEmitter();
  @Output() copy: EventEmitter<any> = new EventEmitter();
  @Output() paste: EventEmitter<any> = new EventEmitter();
  @Output() changeCursor: EventEmitter<any> = new EventEmitter();
  @Output() changeSelection: EventEmitter<any> = new EventEmitter();
  @Output() scroll: EventEmitter<any> = new EventEmitter();

  ready: Promise<void>;
  private _readyResolve: () => void;
  private _readyReject: (error: Error) => void;
  id: string;

  private _editor: any = null;
  private _value = '';
  propagateChange: (_: any) => void = () => {};
  propagateTouched: (_: any) => void = () => {};
  constructor(
    private _service: NgxAceService,
    private _elementRef: ElementRef,
  ) {
    this.ready = new Promise((resolve, reject) => {
      this._readyResolve = resolve;
      this._readyReject = reject;
    });
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
    this.editor.setReadOnly(isDisabled);
  }

  ngOnInit() {
    this._service.loaded()
      .then(() => {
        this.id = `ngx-ace-${++NgxAceComponent.counter}`;
        this._editor = ace.edit(this._elementRef.nativeElement);
        this.onModeChanged();
        this.onThemeChanged();
        this.editor.setValue(this._value);
        this.editor.on('change', (delta: any) => {
          this.propagateChange(this.editor.getValue());
          this.change.emit(delta);
        });
        this.editor.on('blur', (event: Event) => {
          this.propagateTouched(this.editor.getValue());
          this.blur.emit(event);
        });
        this.editor.on('focus', (event: Event) => this.focus.emit(event));
        this.editor.on('changeSelectionStyle', (o) => this.changeSelectionStyle.emit(o));
        this.editor.on('changeSession', (o) => this.changeSession.emit(o));
        this.editor.on('copy', (o) => this.copy.emit(o));
        this.editor.on('paste', (o) => this.paste.emit(o));
        this.session.selection.on('changeCursor', (o) => this.changeCursor.emit(o));
        this.session.selection.on('changeSelection', (o) => this.changeSelection.emit(o));
        this._readyResolve();
      })
      .catch(this._readyReject);


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
    const mode = this.mode || 'text';
    this.session.setMode(`ace/mode/${mode}`);
  }

  onThemeChanged() {
    const theme = this.theme || 'chrome';
    this.editor.setTheme(`ace/theme/${theme}`);
  }



}
