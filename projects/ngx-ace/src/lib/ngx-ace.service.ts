import { Injectable, Inject } from '@angular/core';
import { NGX_ACE_OPTIONS, INgxAceOptions, IAceEditorOptions } from './shared';
declare const ace: any;
@Injectable({
  providedIn: 'root'
})
export class NgxAceService {
  private _loadedPromise: Promise<void> = null;

  constructor(
    @Inject(NGX_ACE_OPTIONS) private _options: INgxAceOptions
  ) { }

  get aceURL(): string {
    return this._options.aceURL;
  }

  get defaultEditorOptions(): IAceEditorOptions {
    return this._options.defaultEditorOptions || null;
  }

  loaded(): Promise<void> {
    if (! this._loadedPromise) {
      this._loadedPromise = new Promise((resolve, reject) => {
        const scriptTag = document.createElement('script');
        scriptTag.onload = () => {
          ace.config.set('basePath', this.aceURL);
          resolve();
        };
        scriptTag.onerror = reject;
        scriptTag.src = `${this.aceURL}/ace.js`;
        document.body.appendChild(scriptTag);
      });
    }
    return this._loadedPromise;
  }
}
