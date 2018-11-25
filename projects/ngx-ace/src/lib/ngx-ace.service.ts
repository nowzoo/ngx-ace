import { Injectable, Inject } from '@angular/core';
import { NGX_ACE_OPTIONS, INgxAceOptions} from './shared';

declare const ace: any;
@Injectable({
  providedIn: 'root'
})
export class NgxAceService {
  private _aceLoaded = false;

  constructor(@Inject(NGX_ACE_OPTIONS) private _options: INgxAceOptions) {}

  get aceURL(): string {
    return this._options.aceURL;
  }

  loaded(): Promise<void> {
    return new Promise(resolve => {
      if (this._aceLoaded) {
        return resolve();
      }
      const scriptTag = document.createElement('script');
      scriptTag.onload = () => {
        ace.config.set('basePath', this.aceURL);
        this._aceLoaded = true;
        resolve();
      };
      scriptTag.src = this.aceURL + '/ace.js';
      document.body.appendChild(scriptTag);
    });
  }
}
