/* jshint esversion: 6 */

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const os = require('os');
const path = require('path');
const fs = require('fs');

const projectsPath = os.platform() === 'win32' ? '' : '/Users/michaelbrown/Documents/GIAL/SoftwareProject/Projects/';

const app = express();

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../dist/')));

app.route('/projects')
  .get((req, res) => res.json(fs.readdirSync(projectsPath).filter(str => str[0] !== '.')));

app.route('/projects/:project')
  .get((req, res) => {
    let project = req.params.project;
    let words = [];
    let splitRegEx = /\s+/;
    let removeRegEx = /\./g;
    project = fs.readFileSync(path.join(projectsPath, project, `${project}.fwdata`));
    xml2js.parseString(project, (err, result) => {
      let tags = result.languageproject.rt;
      let k, tag;
      for (k in tags) {
        tag = tags[k];
        if (tag.$.class === 'LexPronunciation') {
          words.push.apply(words, tag.Form[0].AUni[0]._.replace(removeRegEx, '').split(splitRegEx));
        }
      }
      res.json(words.sort());
    });
  });

module.exports = http.createServer(app);