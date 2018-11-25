import { InjectionToken } from '@angular/core';

export interface INgxAceTheme {
  id: string;
  label: string;
  light: boolean;
}

export interface INgxAceOptions {
  aceURL: string;
  themes: INgxAceTheme[];
  defaultFontSize: string;
  defaultTheme: string;
}


export const DEFAULT_NGX_ACE_OPTIONS: INgxAceOptions = {
  aceURL: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1',
  defaultFontSize: '16px',
  defaultTheme: 'chrome',
  themes: [
    {id: 'chrome', label: 'Chrome', light: true},
    {id: 'clouds', label: 'Clouds', light: true},
    {id: 'crimson_editor', label: 'Crimson Editor', light: true},
    {id: 'dawn', label: 'Dawn', light: true},
    {id: 'dreamweaver', label: 'Dreamweaver', light: true},
    {id: 'eclipse', label: 'Eclipse', light: true},
    {id: 'github', label: 'GitHub', light: true},
    {id: 'iplastic', label: 'IPlastic', light: true},
    {id: 'solarized_light', label: 'Solarized Light', light: true},
    {id: 'textmate', label: 'TextMate', light: true},
    {id: 'tomorrow', label: 'Tomorrow', light: true},
    {id: 'xcode', label: 'XCode', light: true},
    {id: 'kuroir', label: 'Kuroir', light: true},
    {id: 'katzenmilch', label: 'KatzenMilch', light: true},
    {id: 'sqlserver', label: 'SQL Server', light: true},
    {id: 'ambiance', label: 'Ambiance', light: false},
    {id: 'chaos', label: 'Chaos', light: false},
    {id: 'clouds_midnight', label: 'Clouds Midnight', light: false},
    {id: 'dracula', label: 'Dracula', light: false},
    {id: 'cobalt', label: 'Cobalt', light: false},
    {id: 'gruvbox', label: 'Gruvbox', light: false},
    {id: 'gob', label: 'Green on Black', light: false},
    {id: 'idle_fingers', label: 'idle Fingers', light: false},
    {id: 'kr_theme', label: 'krTheme', light: false},
    {id: 'merbivore', label: 'Merbivore', light: false},
    {id: 'merbivore_soft', label: 'Merbivore Soft', light: false},
    {id: 'mono_industrial', label: 'Mono Industrial', light: false},
    {id: 'monokai', label: 'Monokai', light: false},
    {id: 'pastel_on_dark', label: 'Pastel on dark', light: false},
    {id: 'solarized_dark', label: 'Solarized Dark', light: false},
    {id: 'terminal', label: 'Terminal', light: false},
    {id: 'tomorrow_night', label: 'Tomorrow Night', light: false},
    {id: 'tomorrow_night_blue', label: 'Tomorrow Night Blue', light: false},
    {id: 'tomorrow_night_bright', label: 'Tomorrow Night Bright', light: false},
    {id: 'tomorrow_night_eighties', label: 'Tomorrow Night 80s', light: false},
    {id: 'twilight', label: 'Twilight', light: false},
    {id: 'vibrant_ink', label: 'Vibrant Ink', light: false},
  ]
};

export const NGX_ACE_OPTIONS = new InjectionToken<INgxAceOptions>('options for ace');
