import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NGX_ACE_OPTIONS, DEFAULT_NGX_ACE_OPTIONS } from './shared';

import { NgxAceService } from './ngx-ace.service';

describe('NgxAceService', () => {
  let service: NgxAceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NGX_ACE_OPTIONS, useValue: DEFAULT_NGX_ACE_OPTIONS}
      ]
    });
    service = TestBed.get(NgxAceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getters', () => {
    it('should have aceURL', () => {
      expect(service.aceURL).toBe(DEFAULT_NGX_ACE_OPTIONS.aceURL);
    });
    it('should have defaultEditorOptions', () => {
      expect(service.defaultEditorOptions).toBe(null);
    });
  });

  describe('loaded()', () => {
    let scriptTag: any;
    let cfgSetSpy;
    beforeEach(() => {
      cfgSetSpy = jasmine.createSpy();
      (window as any).ace = {config: {set: cfgSetSpy}};
      scriptTag = {onload: null, onerror: null};
      spyOn(document, 'createElement').and.callFake(() => {
        return scriptTag;
      });
      spyOn(document.body, 'appendChild').and.callFake(() => {
      });
    });

    it('should create the tag ', () => {
      service.loaded();
      expect(document.createElement).toHaveBeenCalledWith('script');
    });
    it('should set the src on the tag', () => {
      service.loaded();
      expect(scriptTag.src).toBe(DEFAULT_NGX_ACE_OPTIONS.aceURL + '/ace.js');
    });

    it('should append the tag ', () => {
      service.loaded();
      expect(document.body.appendChild).toHaveBeenCalledWith(scriptTag);
    });

    it('should listen for load event', () => {
      service.loaded();
      expect(scriptTag.onload).toEqual(jasmine.any(Function));
    });

    it('should set the config', () => {
      service.loaded();
      scriptTag.onload();
      expect(cfgSetSpy).toHaveBeenCalledWith('basePath', DEFAULT_NGX_ACE_OPTIONS.aceURL);
    });

    it('should resolve after the tag is loaded', fakeAsync(() => {
      let resolved = false;
      service.loaded().then(() => resolved = true);
      expect(resolved).toBe(false);
      scriptTag.onload();
      tick();
      expect(resolved).toBe(true);
    }));

    it('should load only once', fakeAsync(() => {
      const p1 = service.loaded();
      const p2 = service.loaded();
      expect(p1).toBe(p2);
      expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    }));

  });
});
