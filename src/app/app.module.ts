import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceFormComponent } from './service-form/service-form.component';

// Formly
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

// Services
import { UserService } from './user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormlyHorizontalWrapper } from './service-form/horizontal-wrapper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // Formly
    ReactiveFormsModule,
    FormlyModule.forRoot({
      wrappers: [{ name: 'form-field-horizontal', component: FormlyHorizontalWrapper }],
      validationMessages: [{ name: 'required', message: 'This field is required' }],
    }),
    FormlyBootstrapModule,
    NgbModule,
  ],
  declarations: [
    AppComponent,
    ServiceFormComponent,
    FormlyHorizontalWrapper
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
