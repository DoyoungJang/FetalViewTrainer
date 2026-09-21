import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {phases} from './dist/data.js';
import {ultrasoundFor,renderUltrasound} from './dist/ultrasound.js';
import {ultrasoundFigures as legacyFigures} from './dist/ultrasound-data.js';
import {trimesterFigures} from './dist/trimester-figures.js';
import {createHash} from 'node:crypto';
import {directionFigures} from './dist/direction-figures.js';
const ultrasoundFigures={...legacyFigures,...trimesterFigures,...directionFigures};
for(const ref of Object.values(ultrasoundFigures)){
 const image=await readFile('dist/ultrasound/'+ref.file);assert(image.length>1000);assert((image[0]===255&&image[1]===216)||(image[0]===137&&image[1]===80));
 assert(ref.source.startsWith('https://'));if(ref.sha256)assert.equal(createHash('sha256').update(image).digest('hex'),ref.sha256);assert(ref.doi&&ref.author&&ref.licenseUrl&&ref.caption);
}
const elements=new Map(),$=id=>{if(!elements.has(id))elements.set(id,{});return elements.get(id);};let available=0;
for(const phase of phases)for(const v of phase.lessons){
 renderUltrasound(v,$);const ref=ultrasoundFor(v);
 if(ref){const [x,y,w,h]=ref.region;assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=ref.size[0]&&y+h<=ref.size[1]);assert($('#ultrasoundReference').innerHTML.includes('us-viewport'));available++;assert($('#ultrasoundReference').innerHTML.includes(ref.file));assert.equal($('#schematicDetails').open,true);if(v.trimester===1||v.trimester===3){assert.equal(ref.trimester,v.trimester);if(v.type==='cervix'&&v.trimester===3)assert.equal(ref.ageMatched,false);else assert.equal(ref.ageMatched,true);}if(v.temporal&&!ref.phaseVerified)assert($('#ultrasoundReference').innerHTML.includes('일치한다고 확인된 프레임은 아닙니다'));}
 else{assert($('#schematicDetails').open);assert(!$('#ultrasoundReference').innerHTML.includes('<img'));}
}
assert.equal(ultrasoundFor({type:'heart',trimester:1}).key,'wapm-first:F6');
assert.equal(ultrasoundFor({type:'vessels',trimester:1}).key,'wapm-first:F7');
assert.equal(ultrasoundFor({type:'kidneycor',trimester:2}).key,'PMC7498649:F1');
assert.equal(ultrasoundFor({type:'kidneycor',trimester:1}).key,'wapm-first:F11');
assert.equal(ultrasoundFor({type:'genitalia',trimester:1}).key,'PMC9633498:Fig4');
assert.equal(ultrasoundFor({type:'earlybrain',trimester:1}).key,'wapm-first:F1');
assert.equal(ultrasoundFor({type:'threev',trimester:2}).key,'PMC8429868:f3');
assert(ultrasoundFor({type:'threev',trimester:2}).panel.startsWith('A: 정상 3VV'));
assert.notDeepEqual(ultrasoundFor({type:'threev',trimester:2}).region,ultrasoundFor({type:'vessels',trimester:2}).region);
assert.equal(available,87);
assert.equal(ultrasoundFor({type:'kidneys',trimester:3}).key,'UTD2014:F1');
assert.equal(ultrasoundFor({type:'head',trimester:1}).key,'PMC12705710:Fig1a');
assert.deepEqual(ultrasoundFor({type:'head',trimester:1}).region,[458,0,227,229]);
assert.equal(ultrasoundFor({type:'diaphragm',trimester:1}).key,'PMC12705710:Fig1b');
assert(ultrasoundFor({type:'threevpa',trimester:1}).panel.includes('캘리퍼 없는'));
assert.equal(ultrasoundFor({type:'cervix',trimester:1}).key,'ISUOG-cervix:F4');
for(const trimester of [2,3]){const ref=ultrasoundFor({type:'cervix',trimester});assert.equal(ref.key,'ISUOG-cervix:F5');assert.equal(ref.ageMatched,false);assert(ref.age.includes('주수 미기재'));}
assert(ultrasoundFor({type:'cervix',trimester:1}).referenceNote.includes('비권장'));
for(const type of ['face','kidneys','ductarch','aoarch']){
 const ref=ultrasoundFor({type,trimester:1});assert(ref.referenceNote);renderUltrasound({type,trimester:1},$);assert($('#ultrasoundReference').innerHTML.includes(ref.referenceNote));
}
assert(ultrasoundFor({type:'kidneys',trimester:1}).referenceNote.includes('횡단면이 아닌'));
assert(ultrasoundFor({type:'ductarch',trimester:1}).referenceNote.includes('시상면은 아닙니다'));
assert.equal(ultrasoundFor({type:'heart',trimester:3,id:'4ch-ed'}).key,'Soltan2025:F2');
assert.equal(ultrasoundFor({type:'heart',trimester:3,id:'4ch-es'}).key,'Soltan2025:F3');
assert(ultrasoundFor({type:'heart',trimester:3,id:'4ch-es'}).phaseVerified);
assert.notEqual(ultrasoundFor({type:'threev',trimester:3}).key,ultrasoundFor({type:'vessels',trimester:3}).key);
for(const type of ['diaphragm','kidneysag','hand','foot'])assert(ultrasoundFor({type,trimester:2}).key.startsWith('PMC10023640:'));
renderUltrasound({type:'head'},$);$('#ultrasoundImage').onerror();assert($('#ultrasoundImage').hidden);assert($('#schematicDetails').open);
console.log(`${Object.keys(ultrasoundFigures).length} original figures; ${available}/107 lessons have verified images; other lessons show an explicit missing-match state; source, age, phase caveats and missing/error fallback verified.`);
