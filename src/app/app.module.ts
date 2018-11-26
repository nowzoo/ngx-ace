import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxAceModule } from '@nowzoo/ngx-ace';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';

// const aceOptions: INgxAceOptions = Object.assign({}, DEFAULT_NGX_ACE_OPTIONS, {
//   aceURL: '/ace'
// });

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxAceModule.forRoot()
  ],
  providers: [
    // {provide: NGX_ACE_OPTIONS, useValue: aceOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
