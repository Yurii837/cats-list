import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Modules/material-module';
import { ImgViewComponent } from './Components/img-view/img-view.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { CatsState } from './NgXS/app-state.state';


@NgModule({
  declarations: [
    AppComponent,
    ImgViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    NgxsModule.forRoot([CatsState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
