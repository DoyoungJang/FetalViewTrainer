import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {phases} from './dist/data.js';
import {extendedViews,extendedGuide} from './dist/extended-views.js';
import {extendedPlane} from './dist/extended-planes.js';
import {extendedPhoto,renderExtendedPhoto} from './dist/extended-photos.js';
import {directionsFor} from './dist/view-directions.js';
import {getPreset} from './dist/planes.js';
import {drawExtended} from './dist/extended-diagrams.js';
assert.equal(extendedViews.length,14);assert.equal(new Set(extendedViews.map(v=>v.id)).size,14);
assert.deepEqual(phases.map(p=>p.lessons.length),[37,48,48]);
let count=0,photos=0;const positions=new Map();
for(const [p,phase] of phases.entries())for(const v of phase.lessons.filter(v=>v.extended)){
 count++;assert(v.trimesters.includes(p+1));assert.equal(directionsFor(v).length,0);
 for(const tab of ['anatomy','acquisition','measurement'])assert(extendedGuide(v,tab).includes('https://'));
 const plane=extendedPlane(v,getPreset(v,p));assert(plane.center.toArray().every(Number.isFinite));assert(Math.abs(plane.normal.length()-1)<1e-8);
 positions.set(v.id,plane.center.toArray().map(n=>n.toFixed(4)).join(','));
 const elements=new Map();const $=s=>{if(!elements.has(s))elements.set(s,{});return elements.get(s);};
 drawExtended(v,{g:new Proxy({},{get:()=>()=>{}}),ellipse(){},line(){}},$);assert($('#diagramLegend').innerHTML.includes('<li>'));
 renderExtendedPhoto(v,$);assert(!$('#ultrasoundReference').innerHTML.includes('undefined'));
 const r=extendedPhoto(v);if(r){photos++;await stat('dist/ultrasound/'+r.file);const [x,y,w,h]=r.region;assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=r.size[0]&&y+h<=r.size[1]);}
}
assert.equal(count,26);assert.notEqual(positions.get('low-sax'),positions.get('high-sax'));
assert.equal(new Set(['transfrontal','transcaudate','coronal-thalamic','coronal-cerebellar'].map(k=>positions.get(k))).size,4);
assert.equal(extendedPhoto({...extendedViews[0],trimester:3}),null); // Do not pass a second-trimester image as third-trimester.
assert(extendedPhoto({...extendedViews.find(v=>v.id==='conus'),trimester:2}).title.includes('척수'));
const app=await readFile('dist/explorer.js','utf8');assert(app.includes('previous?.id===v.id'));assert(app.includes('if(firstSelection)view()'));
console.log(`14 independent views / ${count} trimester lessons / ${photos} matching or explicitly age-unspecified references: geometry, content, crop bounds, assets, source links, camera-preservation contract passed.`);
