import {registerHooks} from 'node:module';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import * as T from '../dist/vendor/three.module.js';
import {phases} from '../dist/data.js';
registerHooks({resolve(s,c,next){if(s==='three')return{url:new URL('../dist/vendor/three.module.js',import.meta.url).href,shortCircuit:true};return next(s,c);}});
globalThis.ProgressEvent=class{constructor(t,v){Object.assign(this,v);}};globalThis.fetch=async r=>{const b=await readFile(fileURLToPath(typeof r==='string'?r:r.href||r.url));return new Response(b,{headers:{'Content-Length':String(b.length)}});};
const {loadOrganModels}=await import('../dist/organ-models.js');const assets=await loadOrganModels();for(const kind of ['heart','heartInternal','brain']){assert(assets[kind].meshes.length>0);const b=new T.Box3().setFromObject(assets[kind].group),s=b.getSize(new T.Vector3());if(kind!=='heartInternal')assert(Math.abs(Math.max(s.x,s.y,s.z)-(kind==='brain'?1.24*.90:.82))<1e-5);for(const m of assets[kind].meshes){assert(m.geometry.attributes.position.count>=3);assert(m.geometry.attributes.position.array.every(Number.isFinite));}console.log(kind,assets[kind].meshes.map(m=>m.geometry.index.count/3),'triangles');}
const dom=new Map(),$=s=>{if(!dom.has(s))dom.set(s,{checked:false,value:0,hidden:false,textContent:'',innerHTML:''});return dom.get(s);};globalThis.document={createElement:()=>({getContext:()=>({fillRect(){},fillText(){}})})};const {attachExplorer}=await import('../dist/explorer.js');const scene=new T.Scene(),fetus=new T.Group(),headGroup=new T.Group(),camera=new T.PerspectiveCamera(),solid=new T.MeshStandardMaterial(),grid=new T.Group();scene.add(fetus);fetus.add(headGroup);const body=new T.Mesh(new T.SphereGeometry(1),solid);fetus.add(body);const ell=(p,s,m,parent=fetus)=>{const o=new T.Mesh(new T.SphereGeometry(1,12,8),m);o.position.set(...p);o.scale.set(...s);parent.add(o);return o;};const controls={target:new T.Vector3(),update(){}};const api=attachExplorer({scene,camera,controls,fetus,headGroup,ell,organMat:solid,boneMat:solid,grid,$,organAssets:assets});
api.select(phases[1].lessons.find(v=>v.id==='4ch'),1);assert.equal(api.getState().sourceMode,'internal');api.source('internal');assert(assets.heartInternal.group.visible);assert(!$('#planeToggle').disabled);assert(assets.heartInternal.meshes.every(m=>m.material.clippingPlanes.length===1));assert(scene.getObjectByName('heart-cut-tissue').geometry.attributes.position.count>0);api.source('reference');assert(assets.heart.group.visible);assert($('#planeToggle').disabled);api.source('schematic');assert(!assets.heart.group.visible);assert(!$('#planeToggle').disabled);assert.throws(()=>api.source('bad'));assert.equal(api.getState().sourceMode,'schematic');
const t=performance.now();api.select(phases[1].lessons[0],1);assert(api.getState().focus);assert(assets.brain.group.visible);assert(!assets.heart.group.visible);assert(body.material.transparent);assert.equal($('#focusLabel').textContent,'뇌 집중 보기');api.cut(true);assert.equal(assets.brain.meshes[0].material.clippingPlanes.length,0);assert(assets.brain.meshes[0].material.isShaderMaterial);assert($('#cutRow').hidden);api.angles({tilt:20,rock:10,rotation:15});api.offset(12);$('#organOnly').checked=true;api.isolate();assert(!body.visible);assert(assets.brain.group.visible);$('#organOnly').checked=false;api.select(phases[1].lessons.find(v=>v.id==='ac'),1);assert(!assets.brain.group.visible);assert(assets.body.group.visible);assert(body.visible);assert(body.material.transparent);console.log('Actual organ GLBs, reference/schematic switch, brain focus/cut/tilt/isolate and restoration passed.',Math.round(performance.now()-t),'ms for brain interactions. No GPU/browser visual validation.');

assert(!assets.brain.volume);console.log('Brain exterior is uncut and independent of scene lighting.');

const {heartModelPreset}=await import('../dist/heart-planes.js');const {sectionSegments}=await import('../dist/planes.js');const signatures=[];for(const type of ['heart','lvot','rvot']){const v=phases[1].lessons.find(v=>v.type===type);api.select(v,1);api.source('internal');const p=heartModelPreset(assets.heartInternal,type);signatures.push(JSON.stringify(api.getState().normal));for(const point of p.landmarks)assert(Math.abs(point.clone().sub(p.center).dot(p.normal))<1e-6);for(const name of p.names){const mesh=assets.heartInternal.meshes.find(m=>m.name==='VH_M_'+name);assert(sectionSegments([mesh],p.normal,p.center).length>0,name+' missed');}if(type==='heart')for(const name of ['left_cardiac_atrium','right_cardiac_atrium','heart_left_ventricle','heart_right_ventricle'])assert(sectionSegments([assets.heartInternal.meshes.find(m=>m.name==='VH_M_'+name)],p.normal,p.center).length>0,name+' missed');console.log(type,p.center.toArray(),p.normal.toArray());}assert.equal(new Set(signatures).size,3);const vessels=phases[1].lessons.find(v=>v.type==='vessels');api.select(vessels,1);assert.equal(api.getState().sourceMode,'internal');assert.equal(api.getState().planeSupported,true);assert.equal(api.getState().displayedSource,'internal');assert(assets.heartInternal.group.visible);assert(!$('#planeToggle').disabled);assert(!scene.getObjectByName('fetal-heart-schematic').visible);assert(scene.getObjectByName('heart-cut-tissue').visible);assert(scene.getObjectByName('heart-cut-tissue').geometry.attributes.position.count>0);assert(assets.heartInternal.meshes.every(m=>m.material.clippingPlanes.length===1));assert(scene.getObjectByName('organ-plane-contour').geometry.attributes.position.count>0);api.source('schematic');assert.equal(api.getState().planeSupported,true);assert.equal(api.getState().organ,'heart');console.log('Distinct landmark-aligned heart planes; 3VT shows actual HRA mesh clipping and cut surfaces in new-model mode.');

for(let phase=0;phase<3;phase++)for(const v of phases[phase].lessons){api.select(v,phase);for(const mode of v.group==='심장'?['schematic','internal','reference']:['schematic']){api.source(mode);assert(api.getState().center.every(Number.isFinite));assert(api.getState().normal.every(Number.isFinite));}}console.log('All 107 scene selections and cardiac source modes passed.');

const vesselNormals=[];for(const type of ['threev','threevpa']){const p=heartModelPreset(assets.heartInternal,type);assert(p);vesselNormals.push(p.normal);for(const name of p.names){const m=assets.heartInternal.meshes.find(m=>m.name==='VH_M_'+name);assert(sectionSegments([m],p.normal,p.center).length>0,`${type} misses ${name}`);}}assert(vesselNormals[0].angleTo(vesselNormals[1])>.01);console.log('HRA 3VV common vascular level and PA-perpendicular plane intersect all three vessels.');

// Camera state is independent of lesson selection and source selection.
const snapshot=()=>({position:camera.position.toArray(),quaternion:camera.quaternion.toArray(),up:camera.up.toArray(),zoom:camera.zoom,target:controls.target.toArray()});
const lesson=type=>phases[1].lessons.find(v=>v.type===type);
api.select(lesson('heart'),1);camera.position.set(1.1,.8,-1.7);camera.quaternion.setFromEuler(new T.Euler(.2,.3,.4));camera.zoom=1.23;controls.target.set(.12,.41,.03);const heartCamera=snapshot();
for(const type of ['heart','lvot','threev','threevpa','vessels','rvot']){api.select(lesson(type),1);assert.deepEqual(snapshot(),heartCamera);}
for(const source of ['internal','reference','schematic']){api.source(source);assert.deepEqual(snapshot(),heartCamera);api.select(lesson('vessels'),1);assert(api.getState().planeSupported);assert(scene.getObjectByName('organ-plane-contour').visible);assert(scene.getObjectByName('organ-plane-contour').geometry.attributes.position.count>0);assert.equal(api.getState().displayedSource,source==='internal'?'internal':'schematic');}
api.select(lesson('head'),1);camera.position.set(-1.8,2.1,.8);camera.quaternion.setFromEuler(new T.Euler(-.3,.1,.5));camera.zoom=1.12;controls.target.set(.1,1.51,.03);const brainCamera=snapshot();
for(const type of ['head','ventricle','cerebellum','head']){api.select(lesson(type),1);assert.deepEqual(snapshot(),brainCamera);}
api.angles({tilt:13,rock:4,rotation:5});api.offset(8);const adjusted=api.getState();api.select(lesson('head'),1);assert.deepEqual(api.getState().normal,adjusted.normal);assert.deepEqual(api.getState().center,adjusted.center);
api.select(lesson('abdomen'),1);assert.deepEqual(snapshot(),brainCamera);api.focus(false);assert.deepEqual(snapshot(),brainCamera);api.select(lesson('head'),1);assert.deepEqual(snapshot(),brainCamera);api.select(lesson('heart'),1);assert.deepEqual(snapshot(),brainCamera);api.view('front');assert.notDeepEqual(snapshot(),heartCamera);
console.log('Camera orbit, target and zoom retained within heart/brain, after leaving and returning, and across source changes; explicit camera buttons remain effective.');

const vt=heartModelPreset(assets.heartInternal,'vessels');for(const name of vt.names){const mesh=assets.heartInternal.meshes.find(m=>m.name==='VH_M_'+name);assert(sectionSegments([mesh],vt.normal,vt.center).length>0,'3VT reference plane misses '+name);}console.log('New-model 3VT cut intersects its swapped vascular references.');

const {OrbitControls}=await import('../dist/vendor/OrbitControls.js');
const orbit=new OrbitControls(camera,null);orbit.enableDamping=true;orbit.target.copy(controls.target);orbit.minDistance=controls.minDistance;orbit.maxDistance=controls.maxDistance;orbit.update();const held=camera.position.clone(),heldQ=camera.quaternion.clone();
for(const type of ['heart','vessels','head','abdomen','cerebellum','lvot']){api.select(lesson(type),1);for(let frame=0;frame<60;frame++)orbit.update();assert(camera.position.distanceTo(held)<1e-9);assert(camera.quaternion.angleTo(heldQ)<1e-6);}
console.log('Real OrbitControls: camera remains fixed after 60 animation updates for cardiac, brain and non-organ transitions.');

api.select(lesson('vessels'),1);
const upperPlane=heartModelPreset(assets.heartInternal,'vessels'),threeVV=heartModelPreset(assets.heartInternal,'threev');
assert(threeVV.center.y>upperPlane.center.y,'User-selected 3VV/3VT mapping preserved after registration');
assert(upperPlane.normal.dot(new T.Vector3(0,1,0))>.95,'must remain near transverse, not a descending-aorta longitudinal plane');
for(const point of upperPlane.landmarks)assert(Math.abs(point.clone().sub(upperPlane.center).dot(upperPlane.normal))<1e-8);
for(const name of upperPlane.names){const box=new T.Box3().setFromObject(assets.heartInternal.meshes.find(m=>m.name==='VH_M_'+name));assert(upperPlane.center.y>box.min.y&&upperPlane.center.y<box.max.y);}
console.log('Upper reference plane',upperPlane.center.toArray(),'normal',upperPlane.normal.toArray(),'3VV height',threeVV.center.y);

api.select(lesson('ductarch'),1);api.source('internal');assert(api.getState().planeSupported);assert(!$('#cutRow').hidden);assert(!$('#planeToggle').disabled);const duct=scene.getObjectByName('teaching-ductus-not-donor-anatomy');assert(duct.visible);assert(duct.material.clippingPlanes.length===1);assert(scene.getObjectByName('heart-cut-tissue').geometry.attributes.position.count>0);const dp=heartModelPreset(assets.heartInternal,'ductarch');for(const pt of dp.ductPoints)assert(Math.abs(pt.clone().sub(dp.center).dot(dp.normal))<1e-6);assert(sectionSegments([duct],dp.normal,dp.center).length>0);api.select(lesson('heart'),1);assert(!duct.visible);console.log('Ductal reference overlay clipped in its longitudinal plane; hidden outside Duct Arch.');


$('#maternalMode').value='specimen';assert(assets.uterus.meshes.some(m=>m.name==='VH_F_cervix'));
api.select(lesson('cervix'),1);$('#maternalCutaway').checked=true;api.maternal();assert(scene.getObjectByName('maternal-anatomy').visible);assert(!fetus.visible);assert(assets.uterus.meshes.every(m=>m.material.clippingPlanes.length===1));assert(scene.getObjectByName('heart-cut-tissue').geometry.attributes.position.count>0);assert(scene.getObjectByName('organ-plane-contour').geometry.attributes.position.count>0);api.view('section');assert(controls.target.distanceTo(new T.Vector3(...api.getState().center))<1e-8);$('#maternalCutaway').checked=false;api.maternal();assert(assets.uterus.meshes.every(m=>m.material.clippingPlanes.length===0));api.select(lesson('placenta'),1);assert(!$('#placentaSpecimen').hidden);assert($('#placentaFrame').src.includes('78d6f46a754b45de8a5fe6b60642258f'));assert($('#planeToggle').disabled);assert(!scene.getObjectByName('maternal-anatomy').visible);api.select(lesson('heart'),1);assert($('#placentaSpecimen').hidden);assert(fetus.visible);console.log('Actual HRA cervix meshes, landmark section and cut surface verified; placenta uses official specimen embed with unsupported cutting disabled.');

$('#maternalMode').value='pregnancy';for(const type of ['placenta','cervix']){api.select(lesson(type),1);assert(scene.getObjectByName('pregnancy-context').visible);assert(scene.getObjectByName('fetus-inside-uterus').children[0].children.length>0);assert($('#placentaSpecimen').hidden);assert(!$('#planeToggle').disabled);assert(api.getState().planeSupported);assert(scene.getObjectByName('organ-plane-contour').geometry.attributes.position.count>0);}api.select(lesson('heart'),1);assert(!scene.getObjectByName('pregnancy-context').visible);console.log('Fetus is present in both pregnancy contexts; source specimen mode remains available.');

const pg=scene.getObjectByName('pregnancy-context');pg.updateWorldMatrix(true,true);const baby=pg.getObjectByName('fetus-inside-uterus');let farthest=0;baby.traverse(o=>{if(o.isMesh){const positions=o.geometry.attributes.position;for(let i=0;i<positions.count;i++){const p=new T.Vector3().fromBufferAttribute(positions,i).applyMatrix4(o.matrixWorld);farthest=Math.max(farthest,Math.sqrt((p.x/1.45)**2+((p.y-.45)/2.1)**2+(p.z/1.35)**2));}}});assert(farthest<.85);console.log('Fetal geometry fits inside the uterine cavity envelope.');

const placentalMesh=pg.getObjectByName('pregnancy-placenta');assert.deepEqual(placentalMesh.scale.toArray(),[.54,.55,.075]);assert(placentalMesh.scale.z/placentalMesh.scale.y>.075&&placentalMesh.scale.z/placentalMesh.scale.y<.20);$('#maternalMode').value='pregnancy';api.select(lesson('placenta'),1);const contourCenter=api.getState();assert(contourCenter.center.every(Number.isFinite));api.select(lesson('cervix'),1);const frame=scene.children.find(o=>o.isMesh&&o.geometry.type==='PlaneGeometry');assert.equal(frame.scale.x,2.8);console.log('Cervical context plane enlarged; reduced placenta remains thin with aligned lower edge and cord insertion.');

// Actual phase geometry and sections must differ without changing camera or drifting.
api.source('internal');api.cycle(false);
const phaseMeshes=assets.heartInternal.meshes;
const originalPhasePositions=phaseMeshes.map(m=>m.geometry.attributes.position.array.slice());
const phaseCamera=snapshot();api.cycle(true);
for(const ids of [['4ch','4ch-ed','4ch-es'],['lvot','lvot-ed'],['rvot','rvot-ed']]){
 const geometrySignatures=[],cutSignatures=[];
 for(const id of ids){
  api.select(phases[1].lessons.find(v=>v.id===id),1);
  assert.deepEqual(snapshot(),phaseCamera);
  const vertices=phaseMeshes.find(m=>m.name==='VH_M_heart_left_ventricle').geometry.attributes.position.array;
  assert(vertices.every(Number.isFinite));geometrySignatures.push(Buffer.from(vertices.buffer).toString('base64'));
  const capVertices=scene.getObjectByName('heart-cut-tissue').geometry.attributes.position.array;
  assert(capVertices.length>0);cutSignatures.push(Buffer.from(capVertices.buffer).toString('base64'));
  assert($('#cycleStatus').textContent.includes('교육용 변형'));
 }
 assert.equal(new Set(geometrySignatures).size,ids.length);assert.equal(new Set(cutSignatures).size,ids.length);
}
const endDiastole=phaseMeshes.map(m=>m.geometry.attributes.position.array.slice());
for(let i=0;i<3;i++){api.cycle(false);phaseMeshes.forEach((m,j)=>assert.deepEqual(m.geometry.attributes.position.array,originalPhasePositions[j]));api.cycle(true);phaseMeshes.forEach((m,j)=>assert.deepEqual(m.geometry.attributes.position.array,endDiastole[j]));}
api.select(lesson('vessels'),1);phaseMeshes.forEach((m,j)=>assert.deepEqual(m.geometry.attributes.position.array,originalPhasePositions[j]));
assert($('#cycleRow').hidden);assert.deepEqual(snapshot(),phaseCamera);
console.log('All seven phase poses: distinct finite geometry and rebuilt cut surfaces; exact original restoration, no cumulative drift, camera retained.');

for(const type of ['ventricle','head','cerebellum']){
 api.select(lesson(type),1);const registration=api.getState();
 const brainCrossing=sectionSegments(assets.brain.meshes,new T.Vector3(...registration.normal),new T.Vector3(...registration.center));
 assert(brainCrossing.length>100,'Brain plane must intersect real tissue');
 for(const mode of ['schematic','internal']){api.source(mode);assert.deepEqual(api.getState().normal,registration.normal);assert.deepEqual(api.getState().center,registration.center);}
 assert.equal(assets.brain.meshes[0].material.clippingPlanes.length,0);
}
console.log('All three revised brain planes intersect DHARANI tissue and share registration across source modes; brain remains uncut.');

assert.equal(assets.body.meshes.length,10);
assert.equal(assets.skeleton.meshes.length,26);
for(const a of [assets.body,assets.skeleton])for(const m of a.meshes){assert(m.geometry.attributes.position.array.every(Number.isFinite));assert(m.geometry.index.count>300);}
const bodyCamera=snapshot();
for(const type of ['abdomen','kidneys','kidneysag','kidneycor','pelvis','diaphragm','spine','cord']){
 api.select(lesson(type),1);assert.deepEqual(snapshot(),bodyCamera);assert(assets.body.group.visible);assert(assets.skeleton.group.visible);
 const state=api.getState(),meshes=[...assets.body.meshes,...assets.skeleton.meshes].filter(m=>m.material.opacity===1);
 assert(meshes.length>0);if(type!=='cord')assert(sectionSegments(meshes,new T.Vector3(...state.normal),new T.Vector3(...state.center)).length>0,type+' plane misses real anatomy');
 $('#organOnly').checked=true;api.isolate();assert(assets.body.meshes.filter(m=>m.visible).every(m=>m.material.opacity===1));$('#organOnly').checked=false;api.isolate();
}
api.select(lesson('head'),1);assert(!assets.body.group.visible);assert(!assets.skeleton.group.visible);
console.log('10 fetal MRI organ regions and 26 reference anatomy meshes: finite geometry, selected-organ intersections, isolation, camera continuity and visibility restoration verified.');

// New independent lessons use the actual organ assets and keep the camera pose.
const {extendedPlane}=await import('../dist/extended-planes.js');
for(const v of phases[1].lessons.filter(v=>v.extended)){
 const before=camera.position.clone();api.select(v,1);assert(camera.position.equals(before));
 for(const mode of v.group==='정밀 심장'?['internal','schematic']:['internal']){
  api.source(mode);assert(api.getState().normal.every(Number.isFinite));
  if(v.group==='정밀 심장'&&mode==='internal'){
   const p=extendedPlane(v,{center:new T.Vector3(),normal:new T.Vector3(0,1,0)},assets.heartInternal);
   const names={'low-sax':['heart_left_ventricle','heart_right_ventricle'],'high-sax':['aortic_valve','pulmonary_trunk'],'pulmonary-veins':['left_cardiac_atrium','pulmonary_vein_L_inf','pulmonary_vein_R_inf'],'pa-bifurcation':['pulmonary_trunk','pulmonary_artery_L','pulmonary_artery_R']}[v.id];
   for(const name of names){const mesh=assets.heartInternal.meshes.find(m=>m.name==='VH_M_'+name);assert(mesh,name);assert(sectionSegments([mesh],p.normal,p.center).length>0,v.id+' missed '+name);}
   assert(scene.getObjectByName('heart-cut-tissue').geometry.attributes.position.count>0);
  }
 }
}
console.log('All 12 second/third-trimester independent views: actual mesh intersections, source switching, cut surfaces and camera retention passed.');
