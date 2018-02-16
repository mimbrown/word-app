import { Component, OnInit } from '@angular/core';

import { WordParserService } from './word-parser.service';
import { ProjectService } from './services/project.service';
import { Word } from './models/word';
import { Segmental } from './models/segmental';

import { inventory } from './data/inventory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  value: string;
  parsedWord: any[];
  currentWord: string;
  inputs: string[] = [''];
  // inputFile: File;
  data: Word[];
  consonants: any[];
  vowels: any[];
  loaded: boolean = false;
  projects: string[];
  selectedProject: string;
  selectedSegments: Segmental[] = [];
  changedWords: Word[];
  checkingWords: boolean = false;
  editingWord: Word = null;

  constructor (private word: WordParserService, private projectService: ProjectService) { }

  ngOnInit () {
    this.projectService.getProjects()
      .then(projects => this.projects = projects);
    // this.projectService.getProject('Thai MB SM')
    //   .then(words => {
    //     this.data = inventory.words = words.map(word => new Word(word));
    //     this.finishLoad();
    //   });
  }

  onPaste (event) {
    event.stopPropagation();
    event.preventDefault();
    let text = event.clipboardData.getData('Text');
    this.inputs = text.split(/\s+/);
  }

  loadData (): void {
    let {selectedProject, inputs} = this;
    if (selectedProject) {
      this.projectService.getProject(selectedProject)
        .then(words => {
          this.data = inventory.words = words.map(word => new Word(word));
          this.finishLoad();
        });
    } else {
      this.data = inventory.words = this.inputs.map(word => new Word(word));
      this.finishLoad();
    }
    this.inputs = [''];
  }

  finishLoad (): void {
    this.refreshSegments();
    this.loaded = true;
  }

  refreshSegments (): void {
    this.consonants = inventory.getConsonants();
    this.vowels = inventory.getVowels();
  }

  selectSegment (segment: Segmental): void {
    let selectedSegments = this.selectedSegments;
    if (!selectedSegments.includes(segment)) {
      selectedSegments.push(segment);
    }
  }

  checkChanges (): void {
    this.changedWords = this.data.filter(word => word.oldWord || word.breaks.length);
    this.checkingWords = true;
  }

  saveWord (newWord: string): void {
    this.editingWord.parse(newWord);
    this.editingWord = null;
    this.refreshSegments();
  }

  // fileChange(event) {
  //   let fileList: FileList = event.target.files;
  //   if(fileList.length > 0) {
  //     this.inputFile = fileList[0];
  //   }
  // }

  // parse (xml: string) {
  //   let oParser = new DOMParser();
  //   let xmlObject = oParser.parseFromString(xml, "text/xml");
  //   let children = xmlObject.firstChild['children'];
  //   let data: Word[] = [];
  //   let child;
  //   for (let k in children) {
  //     child = children[k];
  //     // if (child.className === 'MoStemAllomorph') {
  //     if (child.className === 'LexPronunciation') {
  //       data.push(new Word(child.firstElementChild.firstElementChild.innerHTML));
  //     }
  //   }
  //   this.data = inventory.words = data;
  //   this.finishLoad();
  // }
  // refresh (): void {
  //   let str = ''
  //   this.parsedWord.forEach(word => str += word.selection);
  //   this.currentWord = str;
  // }
}
