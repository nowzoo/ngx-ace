import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxAceModule  } from '@nowzoo/ngx-ace';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';



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
  bootstrap: [AppComponent]
})
export class AppModule { }
