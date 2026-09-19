import {registerHooks} from 'node:module';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import * as T from '../dist/vendor/three.module.js';
registerHooks({resolve(s,c,next){if(s==='three')return{url:new URL('../dist/vendor/three.module.js',import.meta.url).href,shortCircuit:true};return next(s,c);}});
globalThis.ProgressEvent=class{constructor(t,v){Object.assign(this,v);}};
globalThis.fetch=async r=>{const b=await readFile(fileURLToPath(typeof r==='string'?r:r.href||r.url));return new Response(b,{headers:{'Content-Length':String(b.length)}});};
const {loadOrganModels}=await import('../dist/organ-models.js');
const {loadFetalModel}=await import('../dist/fetal-model.js');
const assets=await loadOrganModels(),heart=assets.heartInternal,group=new T.Group();await loadFetalModel(group);
const skin=[];group.traverse(m=>{if(m.isMesh)skin.push(m);});
const {registerHeartToThorax}=await import('../dist/heart-registration.js');registerHeartToThorax(heart,assets.body,skin);
const core=heart.meshes.filter(m=>/VH_M_(left_cardiac_atrium|right_cardiac_atrium|heart_left_ventricle|heart_right_ventricle)$/.test(m.name));
const box=new T.Box3();core.forEach(m=>box.union(new T.Box3().setFromObject(m)));
const lungs=new T.Box3().setFromObject(assets.body.meshes.find(m=>m.name==='lungs'));
assert(heart.group.userData.thoracicRegistration.surfaceBased);
assert(box.getCenter(new T.Vector3()).distanceTo(heart.center)<1e-7);
const center=n=>new T.Box3().setFromObject(core.find(m=>m.name===n)).getCenter(new T.Vector3());
const lv=center('VH_M_heart_left_ventricle'),rv=center('VH_M_heart_right_ventricle');assert(lv.x>rv.x&&rv.z>lv.z,'Fetal-left LV and anterior RV preserved');
skin.forEach(m=>m.material.side=T.DoubleSide);group.updateWorldMatrix(true,true);
const ray=new T.Raycaster(),direction=new T.Vector3(1,.013,.021).normalize();let total=0,inside=0;
for(const m of core){const a=m.geometry.attributes.position;for(let i=0;i<a.count;i+=Math.ceil(a.count/100)){const p=new T.Vector3().fromBufferAttribute(a,i).applyMatrix4(m.matrixWorld);ray.set(p,direction);const hits=ray.intersectObjects(skin,false);const distances=hits.map(h=>h.distance).filter((d,i,all)=>i===0||d-all[i-1]>1e-6);total++;if(distances.length%2===1)inside++;}}
assert(inside/total>.98,'Chambers must lie inside actual fetal skin');
console.log({chamberSamplesInside:inside,total,registration:heart.group.userData.thoracicRegistration});

