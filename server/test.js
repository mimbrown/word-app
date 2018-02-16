var parseString = require('xml2js').parseString;
var fs = require('fs');
// var xml = `<root><t class="t1">Hello xml2js!</t><t class="t2">Testing</t><p>P tag</p></root>`;
let time;
let clock = () => {
  let now = Date.now();
  if (time) {
    console.log(`${(now - time)} ms`);
  }
  time = now;
};
clock();
parseString(fs.readFileSync('../../Projects/Test Project/Test Project.fwdata'), function (err, result) {
  clock();
  let tags = result.languageproject.rt;
  let k, tag;
  for (k in tags) {
    tag = tags[k];
    if (tag.$.class === 'LexPronunciation') {
      console.log(tag.Form[0].AUni[0]._);
    }
  }
  clock();
});