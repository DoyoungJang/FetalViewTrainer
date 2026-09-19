import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {phases} from './dist/data.js';
import {ultrasoundFor,renderUltrasound} from './dist/ultrasound.js';
import {ultrasoundFigures} from './dist/ultrasound-data.js';
for(const ref of Object.values(ultrasoundFigures)){
 const image=await readFile('dist/ultrasound/'+ref.file);assert(image.length>1000);assert.equal(image[0],255);assert.equal(image[1],216);
 assert(ref.source.startsWith('https://pmc.ncbi.nlm.nih.gov/articles/'));assert(ref.doi&&ref.author&&ref.licenseUrl&&ref.caption);
}
const elements=new Map(),$=id=>{if(!elements.has(id))elements.set(id,{});return elements.get(id);};let available=0;
for(const phase of phases)for(const v of phase.lessons){
 renderUltrasound(v,$);const ref=ultrasoundFor(v);
 if(ref){const [x,y,w,h]=ref.region;assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=ref.size[0]&&y+h<=ref.size[1]);assert($('#ultrasoundReference').innerHTML.includes('us-viewport'));available++;assert($('#ultrasoundReference').innerHTML.includes(ref.file));assert.equal($('#schematicDetails').open,false);if(v.temporal)assert($('#ultrasoundReference').innerHTML.includes('일치한다고 확인된 프레임은 아닙니다'));}
 else{assert($('#schematicDetails').open);assert(!$('#ultrasoundReference').innerHTML.includes('<img'));}
}
assert.equal(ultrasoundFor({type:'heart',trimester:1}).key,'PMC3784141:F13');
assert.equal(ultrasoundFor({type:'vessels',trimester:1}).key,'PMC3784141:F9');
assert.equal(ultrasoundFor({type:'kidneycor',trimester:2}).key,'PMC7498649:F1');
assert(ultrasoundFor({type:'kidneycor',trimester:1}).panel.startsWith('a:'));
assert.equal(ultrasoundFor({type:'genitalia',trimester:1}).key,'PMC9633498:Fig4');
assert.deepEqual(ultrasoundFor({type:'earlybrain',trimester:1}).region,[0,0,154,165]);
assert.equal(ultrasoundFor({type:'threev',trimester:2}).key,'PMC8429868:f3');
assert(ultrasoundFor({type:'threev',trimester:2}).panel.startsWith('A: 정상 3VV'));
assert.notDeepEqual(ultrasoundFor({type:'threev',trimester:2}).region,ultrasoundFor({type:'vessels',trimester:2}).region);
assert.equal(available,107);
for(const type of ['diaphragm','kidneysag','hand','foot'])assert(ultrasoundFor({type,trimester:2}).key.startsWith('PMC10023640:'));
renderUltrasound({type:'head'},$);$('#ultrasoundImage').onerror();assert($('#ultrasoundImage').hidden);assert($('#schematicDetails').open);
console.log(`${Object.keys(ultrasoundFigures).length} original figures; ${available}/107 lessons have explicitly labeled references; source, age, phase caveats and missing/error fallback verified.`);
