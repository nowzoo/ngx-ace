import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxAceService } from './ngx-ace.service';
import { NgxAceComponent } from './ngx-ace.component';
import { DEFAULT_NGX_ACE_OPTIONS, NGX_ACE_OPTIONS} from './shared';
@NgModule({
  declarations: [
    NgxAceComponent,
  ],
  imports: [
  ],
  exports: [
    NgxAceComponent,
  ]
})
export class NgxAceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxAceModule,
      providers: [
        { provide: NGX_ACE_OPTIONS, useValue: DEFAULT_NGX_ACE_OPTIONS },
        NgxAceService
      ]
    };
  }
}
