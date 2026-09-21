import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {phases} from './dist/data.js';
import {dopplerFor,dopplerImages,renderDoppler} from './dist/doppler.js';
import {renderMeasurements} from './dist/measurements.js';
let count=0;
for(const phase of phases)for(const view of phase.lessons){
 const d=dopplerFor(view),html=renderDoppler(view);
 if(!d){assert.equal(html,'');continue;}
 count++;assert.equal(d.trimester,view.trimester);assert(renderMeasurements(view).includes('도플러 측정 세부 안내'));
 for(const p of d.items){
  for(const k of ['purpose','weeks','plane','gate','settings','measure','pitfall'])assert(p[k]?.length>10,`${view.id}: ${k}`);
  assert(p.images.length);for(const id of p.images){const img=dopplerImages[id];assert(img,`${view.id}: ${id}`);assert(existsSync('dist/'+img.file));assert(img.caption&&img.age&&img.license&&img.source.startsWith('https://'));
   if(img.region){const [x,y,w,h]=img.region;assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=img.size[0]&&y+h<=img.size[1]);}
  }
 }
 if(view.trimester===1)assert(html.includes('TI ≤1.0'));
}
assert.equal(dopplerFor({type:'placenta',trimester:1}).items[0].images[0],'uta1');
assert.equal(dopplerFor({type:'placenta',trimester:3}).items[0].images[0],'uta2');
assert(dopplerImages.uta2.age.includes('3분기에서는 방법 참고'));
assert.deepEqual(dopplerFor({type:'vessels',trimester:2}).items.map(p=>p.key),['arch','duct']);
assert.notDeepEqual(dopplerImages.lv.region,dopplerImages.rv.region);
assert(dopplerImages.duct.caption.includes('PW 계측 사진이 아닙니다'));
assert(dopplerFor({type:'cord',trimester:2}).items[0].pitfall.includes('EDV=0'));
assert(dopplerFor({type:'head',trimester:1}).items[0].weeks.includes('중·후기'));
assert.equal(renderDoppler({type:'femur',trimester:2}),'');
console.log(`${count} relevant lessons: separate Doppler guidance, age limits, correct vessel panels and local image assets verified.`);
