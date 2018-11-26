import { Component, OnInit,  AfterViewInit, AfterContentInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MODES, THEMES } from './options';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, AfterViewInit, AfterContentInit {
  contentFc: FormControl;

  modes = MODES;
  mode = 'markdown';
  themes = THEMES;
  theme = 'chrome';
  options = {fontSize: 16};



  constructor() { }

  ngOnInit() {
    this.contentFc = new FormControl('Hello World');
  }

  ngAfterViewInit() {


  }

  ngAfterContentInit() {

  }




}
