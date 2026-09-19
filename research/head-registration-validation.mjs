import {registerHooks} from 'node:module';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import * as T from '../dist/vendor/three.module.js';
registerHooks({resolve(s,c,next){if(s==='three')return{url:new URL('../dist/vendor/three.module.js',import.meta.url).href,shortCircuit:true};return next(s,c);}});
globalThis.ProgressEvent=class{constructor(t,v){Object.assign(this,v);}};
globalThis.fetch=async r=>{const b=await readFile(fileURLToPath(typeof r==='string'?r:r.href||r.url));return new Response(b);};
const {loadOrganModels}=await import('../dist/organ-models.js');
const {loadFetalModel}=await import('../dist/fetal-model.js');
const {getPreset}=await import('../dist/planes.js');
const {orbitLandmarks}=await import('../dist/anatomy-registration.js');
const assets=await loadOrganModels(),group=new T.Group();await loadFetalModel(group);
const skin=[];group.traverse(m=>{if(m.isMesh){m.material.side=T.DoubleSide;skin.push(m);}});
group.updateWorldMatrix(true,true);assets.brain.group.updateWorldMatrix(true,true);
const ray=new T.Raycaster(),direction=new T.Vector3(1,.013,.023).normalize();let total=0,inside=0;
for(const m of assets.brain.meshes){const a=m.geometry.attributes.position;for(let i=0;i<a.count;i+=10){const p=new T.Vector3().fromBufferAttribute(a,i).applyMatrix4(m.matrixWorld);ray.set(p,direction);const hits=ray.intersectObjects(skin,false).filter((h,i,all)=>!i||h.distance-all[i-1].distance>1e-5);total++;if(hits.length%2)inside++;}}
assert.equal(inside,total,'Brain surface samples must remain within actual fetal skin');
const orbit=getPreset({type:'orbit',y:0});
for(const anchor of [orbitLandmarks.left,orbitLandmarks.right]){
 const p=new T.Vector3(...anchor);assert(Math.abs(p.clone().sub(orbit.center).dot(orbit.normal))<1e-7);
 ray.set(new T.Vector3(p.x,p.y,3),new T.Vector3(0,0,-1));
 assert(ray.intersectObjects(skin,false)[0].point.distanceTo(p)<.002,'Orbit anchors coincide with paired eye-region surface');
}
assert(orbit.normal.y>.5&&orbit.normal.z>.3,'Oblique plane follows flexed head');
assert(orbit.extent>orbitLandmarks.left[0]-orbitLandmarks.right[0]);
console.log({brainSamplesInside:inside,total,orbitCenter:orbit.center.toArray(),orbitNormal:orbit.normal.toArray()});
