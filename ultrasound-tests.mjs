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
 if(ref){available++;assert($('#ultrasoundReference').innerHTML.includes(ref.file));assert.equal($('#schematicDetails').open,false);if(v.temporal)assert($('#ultrasoundReference').innerHTML.includes('일치한다고 확인된 프레임은 아닙니다'));}
 else{assert($('#schematicDetails').open);assert(!$('#ultrasoundReference').innerHTML.includes('<img'));}
}
assert.equal(ultrasoundFor({type:'heart',trimester:1}).key,'PMC3784141:F13');
assert.equal(ultrasoundFor({type:'vessels',trimester:1}).key,'PMC3784141:F9');
assert.equal(ultrasoundFor({type:'kidneycor',trimester:2}),null);
renderUltrasound({type:'head'},$);$('#ultrasoundImage').onerror();assert($('#ultrasoundImage').hidden);assert($('#schematicDetails').open);
console.log(`${Object.keys(ultrasoundFigures).length} original figures; ${available}/107 lessons have explicitly labeled references; source, age, phase caveats and missing/error fallback verified.`);
