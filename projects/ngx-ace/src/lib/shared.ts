import { InjectionToken } from '@angular/core';

export interface INgxAceOptions {
  aceURL: string;
}


export const DEFAULT_NGX_ACE_OPTIONS: INgxAceOptions = {
  aceURL: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1'
};

export const NGX_ACE_OPTIONS = new InjectionToken<INgxAceOptions>('options for ace');

export interface IAceEditorOptions {
  selectionStyle: 'line' | 'text';
  highlightActiveLine: boolean;
  highlightSelectedWord: boolean;
  readOnly: boolean;
  cursorStyle: 'ace' | 'slim' | 'smooth' | 'wide';
  mergeUndoDeltas: boolean | 'always';
  behavioursEnabled: boolean;
  wrapBehavioursEnabled: boolean;
  autoScrollEditorIntoView: boolean;
  copyWithEmptySelection: boolean;
  useSoftTabs: boolean;
  navigateWithinSoftTabs: boolean;
  enableMultiselect: boolean;
  hScrollBarAlwaysVisible: boolean;
  vScrollBarAlwaysVisible: boolean;
  highlightGutterLine: boolean;
  animatedScroll: boolean;
  showInvisibles: boolean;
  showPrintMargin: boolean;
  printMarginColumn: number;
  printMargin: false | number;
  fadeFoldWidgets: boolean;
  showFoldWidgets: boolean;
  showLineNumbers: boolean;
  showGutter: boolean;
  displayIndentGuides: boolean;
  fontSize: number | string;
  fontFamily: string;
  maxLines: number;
  minLines: number;
  scrollPastEnd: number | boolean;
  fixedWidthGutter: boolean;
  scrollSpeed: number;
  dragDelay:  number;
  dragEnabled: boolean;
  focusTimout: number;
  tooltipFollowsMouse: boolean;
  firstLineNumber: number;
  overwrite: boolean;
  newLineMode: 'auto' | 'unix' | 'windows';
  useWorker: boolean;
  tabSize: number;
  wrap: boolean|number;
  foldStyle: 'markbegin' |'markbeginend' | 'manual';
}
