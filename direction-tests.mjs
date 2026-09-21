import assert from 'node:assert/strict';
import {phases} from './dist/data.js';
import {getPreset} from './dist/planes.js';
import {directionsFor,orientPreset,directionInfo} from './dist/view-directions.js';
import {ultrasoundFor} from './dist/ultrasound.js';
import {Vector3} from './dist/vendor/three.module.js';
import {orbitLandmarks} from './dist/anatomy-registration.js';
let count=0,photoCount=0;
for(const phase of phases)for(const v of phase.lessons){
 const options=directionsFor(v);
 if(v.trimester===1||v.extended){assert.equal(options.length,0);continue;}
 assert(options.length>=3);assert.equal(new Set(options.map(o=>o.id)).size,options.length);
 const base=getPreset(v,v.trimester-1);assert.equal(orientPreset({...v,direction:'standard'},base),base);
 const saved=base.center.toArray();
 for(const o of options.slice(1)){
  const view={...v,direction:o.id},p=orientPreset(view,base);
  assert(Math.abs(p.normal.length()-1)<1e-6);assert([...p.center.toArray(),...p.normal.toArray()].every(Number.isFinite));
  assert.deepEqual(base.center.toArray(),saved);assert(directionInfo(view).target);assert(directionInfo(view).timing.includes(v.trimester+'분기'));
  const photo=ultrasoundFor(view);
  if(photo){
   const [x,y,w,h]=photo.region;assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=photo.size[0]&&y+h<=photo.size[1]);
   if(photo.trimester)assert.equal(photo.trimester,v.trimester);photoCount++;
  }
  count++;
 }
}
const orbit=phases[1].lessons.find(v=>v.type==='orbit'),base=getPreset(orbit,1);
const coronal=orientPreset({...orbit,direction:'coronal'},base);
assert(Math.abs(coronal.normal.dot(base.normal))<1e-6);
for(const [id,point] of [['sagittal-left',orbitLandmarks.left],['sagittal-right',orbitLandmarks.right]]){
 const p=orientPreset({...orbit,direction:id},base);assert(p.center.distanceTo(new Vector3(...point))<1e-6);assert(Math.abs(p.normal.x)>0.99);
 assert.equal(ultrasoundFor({...orbit,direction:id}),null,'Never label axial orbit image as sagittal');
}
assert.equal(ultrasoundFor({...orbit,direction:'coronal'}).key,'PMC5029995:F7');
assert.equal(ultrasoundFor({type:'kidneys',trimester:2,direction:'coronal'}).key,'PMC7498649:F1');
assert.equal(ultrasoundFor({type:'kidneys',trimester:3,direction:'coronal'}),null);
assert.equal(ultrasoundFor({type:'head',trimester:3,direction:'coronal'}),null,'Do not use a normal 24-week coronal brain in third trimester');
assert.deepEqual(ultrasoundFor({type:'head',trimester:3,direction:'sagittal'}).region,[1084,26,1010,820],'Use normal 28-week panel B, not pathology or a specimen');
assert.equal(ultrasoundFor({type:'spine',trimester:2,direction:'axial'}).figure,'Figure 2C');
assert.equal(ultrasoundFor({type:'kidneycor',trimester:3,direction:'axial'}).panel,'A: 정상 신장·신우 횡단면 · 32주');
// Organ registrations override the schematic preset. The final direction must be applied AFTER that override.
const registered={...base,center:new Vector3(7,8,9),normal:new Vector3(0,1,0)};
const p=orientPreset({type:'heart',trimester:2,direction:'coronal',en:'4CV'},registered);
assert.deepEqual(p.center.toArray(),[7,8,9]);assert.deepEqual(p.normal.toArray(),[0,0,1]);
console.log(`${count} additional directions across all 72 second/third-trimester lessons: finite planes, orbit landmarks, source matching and registration composition passed.`);
console.log(`${photoCount}/${count} additional directions have matched actual images.`);
