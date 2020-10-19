import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/inmemory-db/inmemory-db.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';
//import { GoogleMapsModule } from '@angular/google-maps'
//import { } from '@types/googlemaps';
//declare var google : google;
//import { google } from "google-maps";
// import { AgmCoreModule } from '@agm/core';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;



@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  
  imports: [
   // BrowserModule, GoogleMapsModule,
    
    // BrowserModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAzJVLBPTN_g63auM5KNpJ9Ho7W5__kimM'    
    // }),
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true }),
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(options),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
