import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MODES, THEMES } from './options';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  contentFc: FormControl;
  optionsFg: FormGroup;

  modes = MODES;
  themes = THEMES;
  options = {fontSize: 16};
  editor: any = null;



  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.contentFc = new FormControl('Hello World');
    this.optionsFg = this.fb.group({
      mode: ['ace/mode/markdown'],
      theme: ['ace/theme/github'],
      fontSize: [16, [Validators.min(8), Validators.max(64)]],
    });
    this.optionsFg.valueChanges.subscribe(val => {
      this.editor.setOptions(val);
    });
  }

  onEditorReady(editor) {
    this.editor = editor;
    this.editor.setOptions(this.optionsFg.value);
  }




}
