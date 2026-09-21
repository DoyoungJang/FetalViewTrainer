import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {supplementModules,modulesForTrimester,supplementSources} from './dist/supplement-catalog.js';
import {supplementPhotos} from './dist/supplement-photos.js';
import {supplementFigures} from './dist/supplement-figures.js';
import {moduleMarkup,photoMarkup} from './dist/supplement-ui.js';
assert.deepEqual(supplementModules.map(m=>m.number),Array.from({length:25},(_,i)=>i+1));
assert.equal(new Set(supplementModules.map(m=>m.id)).size,25);
const byId=id=>supplementModules.find(m=>m.id===id);
assert.equal(byId('brain-coronal').variants.length,4);
assert.equal(byId('brain-sagittal').variants.length,4);
for(const id of ['early-posterior-fossa','rnt-gap','early-femur','neck-survey','chorionicity'])assert.deepEqual(byId(id).trimesters,[1]);
for(const id of ['pulmonary-veins','uv-pw','rhythm','vasa-previa'])assert(byId(id).doppler);
for(const [key,r] of Object.entries(supplementFigures)){
 const bytes=await readFile('dist/ultrasound/'+r.file);assert.equal(createHash('sha256').update(bytes).digest('hex'),r.sha256,key);
 assert(/\.(png|jpe?g)$/.test(r.file),'Browser-compatible image format');
 assert(bytes.length>1000);assert(r.source.startsWith('https://'));assert(r.rights&&r.author&&r.age);
}
let combinations=0,withPhotos=0;
for(const t of [1,2,3])for(const m of modulesForTrimester(t)){
 const html=moduleMarkup(m,t);assert(html.includes(m.title));assert(html.includes('관련 기준 View 버튼'));
 assert(m.steps.length>=3&&m.tips.length>=2&&m.measure&&m.structures.length>=3);
 assert(m.refs.every(k=>supplementSources[k]));
 const photos=supplementPhotos(m,t);if(photos.length)withPhotos++;
 for(const p of photos){
  const [x,y,w,h]=p.region;assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=p.size[0]&&y+h<=p.size[1],p.title);
  if(p.trimester)assert.equal(p.trimester,t,p.title);assert(photoMarkup(p).includes(p.file));
 }
 combinations++;
}
assert.equal(supplementPhotos(byId('rhythm'),1).length,0,'Unspecified-age PW images are not early-heart-rate examples');
assert(supplementPhotos(byId('pas'),3).every(p=>p.note.includes('이상')));
assert(supplementPhotos(byId('vasa-previa'),3).every(p=>p.note.includes('이상')));
assert.equal(supplementPhotos(byId('low-sax'),3).length,0,'Do not label second-trimester short-axis photo as third trimester');
console.log(`25 audit rows covered; ${combinations} trimester-module combinations; ${withPhotos} with matched or explicitly age-unspecified method images; 21 new source files verified.`);
