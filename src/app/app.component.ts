import { Component } from '@angular/core';

import { WordParserService } from './word-parser.service';
import { Word } from './models/word';
import { Segmental } from './models/segmental';

import { inventory } from './data/inventory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  value: string;
  parsedWord: any[];
  stage: number = 0;
  currentWord: string;
  inputs: string[] = [''];
  inputFile: File;
  data: Word[];
  enterData: boolean = true;
  vowels: Segmental[];
  consonants: Segmental[];
  environments: Segmental[] = [];

  constructor (private word: WordParserService) { }

  onPaste (event) {
    event.stopPropagation();
    event.preventDefault();
    let text = event.clipboardData.getData('Text');
    this.inputs = text.split(/\s+/);
  }

  loadData (): void {
    let {inputFile, inputs} = this;
    this.enterData = false;
    if (inputFile) {
      let fileReader = new FileReader(); 
      fileReader.onload = e => this.parse(fileReader.result);
      fileReader.readAsText(inputFile); 
    } else {
      this.data = inventory.words = this.inputs.map(word => new Word(word));
      this.consonants = inventory.getConsonants();
      this.vowels = inventory.getVowels();
    }
    this.inputs = [''];
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.inputFile = fileList[0];
    }
  }

  viewEnvironment (segment: Segmental): void {
    this.environments.push(segment);
  }

  parse (xml: string) {
    let oParser = new DOMParser();
    let xmlObject = oParser.parseFromString(xml, "text/xml");
    let children = xmlObject.firstChild['children'];
    let data: Word[] = [];
    let child;
    for (let k in children) {
      child = children[k];
      if (child.className === 'MoStemAllomorph') {
        data.push(new Word(child.firstElementChild.firstElementChild.innerHTML));
      }
    }
    this.data = inventory.words = data;
    this.consonants = inventory.getConsonants();
    this.vowels = inventory.getVowels();
    // this.currentWord = input;
    // this.parsedWord = this.word.parse(input);
    // this.stage = 1;
  }
  refresh (): void {
    let str = ''
    this.parsedWord.forEach(word => str += word.selection);
    this.currentWord = str;
  }
  extract () {
    this.stage = 2;
  }
}
