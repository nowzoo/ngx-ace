import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgxAceService } from './ngx-ace.service';

import { NgxAceComponent } from './ngx-ace.component';

describe('NgxAceComponent', () => {
  let component: NgxAceComponent;
  let fixture: ComponentFixture<NgxAceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxAceComponent ],
      providers: [
        {provide:  NgxAceService, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAceComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getters', () => {
    let editor;
    beforeEach(() => {
      editor = {session: {}};
      (component as any)._editor = editor;
    });
    it('should have editor', () => {
      expect(component.editor).toBe(editor);
    });
    it('should have session', () => {
      expect(component.session).toBe(editor.session);
    });
    it('should have service', () => {
      expect(component.service).toBeTruthy();
    });
  });

  describe('writeValue()', () => {
    it('should set _value but do nothing else if the editor has not been created', () => {
      spyOnProperty(component, 'editor').and.returnValue(null);
      component.writeValue('Foo Bar');
      expect((component as any)._value).toBe('Foo Bar');
    });
    it('should set the value of the editor ', () => {
      const editor = { setValue: jasmine.createSpy()};
      spyOnProperty(component, 'editor').and.returnValue(editor);
      component.writeValue('Foo Bar');
      expect((component as any)._value).toBe('Foo Bar');
      expect(editor.setValue).toHaveBeenCalledWith('Foo Bar');
    });
    it('should deal with a null value ', () => {
      const editor = { setValue: jasmine.createSpy()};
      spyOnProperty(component, 'editor').and.returnValue(editor);
      component.writeValue(null);
      expect((component as any)._value).toBe('');
      expect(editor.setValue).toHaveBeenCalledWith('');
    });
  });

  describe('registerOnChange', () => {
    it('should set the change handler', () => {
      const fn = () => {};
      component.registerOnChange(fn);
      expect(component.propagateChange).toBe(fn);
    });

  });

  describe('registerOnTouched', () => {
    it('should set the touched handler', () => {
      const fn = () => {};
      component.registerOnTouched(fn);
      expect(component.propagateTouched).toBe(fn);
    });

  });

  describe('setDisabledState()', () => {
    let editor;
    beforeEach(() => {
      editor = { setReadOnly: jasmine.createSpy()};
      spyOnProperty(component, 'editor').and.returnValue(editor);
    });
    it('should call editor.setReadOnly', () => {
      component.setDisabledState(true);
      expect(editor.setReadOnly).toHaveBeenCalledWith(true);
    });
  });

  describe('ngOnInit()', () => {
    let editor;
    let service;
    let serviceSpy;
    beforeEach(() => {
      service = {loaded: () => Promise.resolve()};
      serviceSpy = spyOnProperty(component, 'service').and.returnValue(service);
      editor = {setOptions: jasmine.createSpy(), setValue: jasmine.createSpy, on: jasmine.createSpy()};
      (window as any).ace = {edit: jasmine.createSpy().and.returnValue(editor)};
      spyOn(component, 'onThemeChanged').and.callFake(() => {});
      spyOn(component, 'onModeChanged').and.callFake(() => {});
      spyOn(component.ready, 'emit').and.callThrough();
    });

    it('should create editor', fakeAsync(() => {
      component.ngOnInit();
      tick();
      expect((window as any).ace.edit).toHaveBeenCalledWith(jasmine.any(HTMLElement));
    }));

    it('should set default options if they exist', fakeAsync(() => {
      const defaultEditorOptions = {};
      serviceSpy.and.returnValue({loaded: () => Promise.resolve(), defaultEditorOptions: defaultEditorOptions});
      component.ngOnInit();
      tick();
      expect(editor.setOptions).toHaveBeenCalledWith(defaultEditorOptions);
    }));


    it('should emit ready with the editor', fakeAsync(() => {
      component.ngOnInit();
      tick();
      expect(component.ready.emit).toHaveBeenCalledWith(editor);
    }));
  });



  describe('ngOnChanges', () => {
    beforeEach(() => {
      spyOn(component, 'onModeChanged').and.callFake(() => {});
      spyOn(component, 'onThemeChanged').and.callFake(() => {});
    });
    it('should not do anything if the editor has not been initialized', () => {
      spyOnProperty(component, 'editor').and.returnValue(null);
      component.ngOnChanges({theme: 'foo', mode: 'foo'} as any);
      expect(component.onModeChanged).not.toHaveBeenCalled();
      expect(component.onThemeChanged).not.toHaveBeenCalled();
    });
    it('should set the mode if the changes include mode', () => {
      spyOnProperty(component, 'editor').and.returnValue({});
      component.ngOnChanges({theme: 'foo', mode: 'foo'} as any);
      expect(component.onModeChanged).toHaveBeenCalled();
    });
    it('should not set the mode if the changes do not include mode', () => {
      spyOnProperty(component, 'editor').and.returnValue({});
      component.ngOnChanges({theme: 'foo'} as any);
      expect(component.onModeChanged).not.toHaveBeenCalled();
    });
    it('should set the theme if the changes include theme', () => {
      spyOnProperty(component, 'editor').and.returnValue({});
      component.ngOnChanges({theme: 'foo', mode: 'foo'} as any);
      expect(component.onThemeChanged).toHaveBeenCalled();
    });
    it('should not set the mode if the changes do not include mode', () => {
      spyOnProperty(component, 'editor').and.returnValue({});
      component.ngOnChanges({mode: 'foo'} as any);
      expect(component.onThemeChanged).not.toHaveBeenCalled();
    });
  });

  describe('onThemeChanged()', () => {
    let editor;
    beforeEach(() => {
      editor = {setTheme: jasmine.createSpy()};
      spyOnProperty(component, 'editor').and.returnValue(editor);
    });
    it('should do nothing if component.them is null', () => {
      component.theme = null;
      component.onThemeChanged();
      expect(editor.setTheme).not.toHaveBeenCalled();
    });
    it('should set the theme', () => {
      component.theme = 'foo';
      component.onThemeChanged();
      expect(editor.setTheme).toHaveBeenCalledWith('ace/theme/foo');
    });
  });

  describe('onModeChanged()', () => {
    let session;
    beforeEach(() => {
      session = {setMode: jasmine.createSpy()};
      spyOnProperty(component, 'session').and.returnValue(session);
    });
    it('should do nothing if component.mode is null', () => {
      component.mode = null;
      component.onModeChanged();
      expect(session.setMode).not.toHaveBeenCalled();
    });
    it('should set the mode', () => {
      component.mode = 'foo';
      component.onModeChanged();
      expect(session.setMode).toHaveBeenCalledWith('ace/mode/foo');
    });
  });

  describe('onEditorValueChange()', () => {
    let editor;
    beforeEach(() => {
      editor = {getValue: jasmine.createSpy().and.returnValue('Foo')};
      spyOnProperty(component, 'editor').and.returnValue(editor);
      spyOn(component, 'propagateChange').and.callThrough();
    });
    it('should get the value from the editor', () => {
      component.onEditorValueChange();
      expect(editor.getValue).toHaveBeenCalled();
    });
    it('should propagate the change', () => {
      component.onEditorValueChange();
      expect(component.propagateChange).toHaveBeenCalledWith('Foo');
    });
  });

  describe('onEditorBlurred()', () => {
    let editor;
    beforeEach(() => {
      editor = {getValue: jasmine.createSpy().and.returnValue('Foo')};
      spyOnProperty(component, 'editor').and.returnValue(editor);
      spyOn(component, 'propagateTouched').and.callThrough();
    });
    it('should get the value from the editor', () => {
      component.onEditorBlurred();
      expect(editor.getValue).toHaveBeenCalled();
    });
    it('should propagate the change', () => {
      component.onEditorBlurred();
      expect(component.propagateTouched).toHaveBeenCalledWith('Foo');
    });
  });
});
