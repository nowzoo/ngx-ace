import { Injectable, Inject } from '@angular/core';
import { NGX_ACE_OPTIONS, INgxAceOptions } from './shared';
declare const ace: any;
@Injectable({
  providedIn: 'root'
})
export class NgxAceService {
  private _loadedPromise: Promise<void> = null;

  constructor(
    @Inject(NGX_ACE_OPTIONS) private _options: INgxAceOptions
  ) { }

  loaded(): Promise<void> {
    if (! this._loadedPromise) {
      this._loadedPromise = new Promise((resolve, reject) => {
        const scriptTag = document.createElement('script');
        scriptTag.onload = () => {
          ace.config.set('basePath', this._options.aceURL);
          resolve();
        };
        scriptTag.onerror = reject;
        scriptTag.src = `${this._options.aceURL}/ace.js`;
        document.body.appendChild(scriptTag);
      });
    }
    return this._loadedPromise;
  }
}
