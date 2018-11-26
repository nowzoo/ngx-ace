import { InjectionToken } from '@angular/core';

export interface INgxAceOptions {
  aceURL: string;
}


export const DEFAULT_NGX_ACE_OPTIONS: INgxAceOptions = {
  aceURL: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1'
};

export const NGX_ACE_OPTIONS = new InjectionToken<INgxAceOptions>('options for ngx-ace');
