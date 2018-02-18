import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WordParserService } from './word-parser.service';
import { CharacterComponent } from './character/character.component';
import { EnvironmentComponent } from './environment/environment.component';
import { FeatureDisplayComponent } from './feature-display/feature-display.component';
import { ExploreEnvironmentsComponent } from './explore-environments/explore-environments.component';
import { TabpanelComponent, Tab } from './components/core/tabpanel/tabpanel.component';
import { CleanDataComponent, AmbiguityComponent } from './clean-data/clean-data.component';
import { WizardComponent, WizardTab } from './components/core/wizard/wizard.component';
import { ProjectService } from './services/project.service';
import { WindowComponent } from './components/core/window/window.component';
import { RuleBuilderComponent } from './rule-builder/rule-builder.component';
import { SyllabificationComponent } from './syllabification/syllabification.component';
import { EnvironmentChoiceComponent } from './environment-choice/environment-choice.component';
import { PhoneticEnvironmentComponent } from './phonetic-environment/phonetic-environment.component';
import { SyllableDistributionComponent } from './syllable-distribution/syllable-distribution.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    EnvironmentComponent,
    FeatureDisplayComponent,
    ExploreEnvironmentsComponent,
    TabpanelComponent,
    Tab,
    CleanDataComponent,
    AmbiguityComponent,
    WizardComponent,
    WizardTab,
    WindowComponent,
    RuleBuilderComponent,
    SyllabificationComponent,
    EnvironmentChoiceComponent,
    PhoneticEnvironmentComponent,
    SyllableDistributionComponent
  ],
  exports: [
    CharacterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [WordParserService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
