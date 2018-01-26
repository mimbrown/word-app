import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WordParserService } from './word-parser.service';
import { CharacterComponent } from './character/character.component';
import { EnvironmentComponent } from './environment/environment.component';
import { FeatureDisplayComponent } from './feature-display/feature-display.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    EnvironmentComponent,
    FeatureDisplayComponent
  ],
  exports: [
    CharacterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [WordParserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
