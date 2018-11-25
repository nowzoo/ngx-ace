import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxAceModule, DEFAULT_NGX_ACE_OPTIONS, INgxAceOptions, NGX_ACE_OPTIONS } from '@nowzoo/ngx-ace';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';

const aceOptions: INgxAceOptions = Object.assign({}, DEFAULT_NGX_ACE_OPTIONS, {
  aceURL: '/ace'
});

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxAceModule.forRoot()
  ],
  providers: [
    {provide: NGX_ACE_OPTIONS, useValue: aceOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
