import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import {BookMarkDirective} from "./shared/book-mark.directive";
import { UnlessDirective } from './shared/unless.directive';

@NgModule({
  declarations: [
    AppComponent,
    AutoCompleteComponent,
    BookMarkDirective,
    UnlessDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
