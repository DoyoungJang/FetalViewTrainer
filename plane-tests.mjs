import assert from 'node:assert/strict';
import * as T from './dist/vendor/three.module.js';
import {getPreset,resolvePlane,sectionSegments,cardiacLandmarks} from './dist/planes.js';
import {attachExplorer} from './dist/explorer.js';
import {phases} from './dist/data.js';
import {greatVessels} from './dist/anatomy-registration.js';
const close=(a,b)=>assert(Math.abs(a-b)<1e-6,`${a} != ${b}`);
for(let p=0;p<3;p++)for(const v of phases[p].lessons){const preset=getPreset(v,p);const base=resolvePlane(preset);close(base.normal.length(),1);close(base.center.distanceTo(preset.center),0);const changed=resolvePlane(preset,21,-13,43,20);close(changed.normal.length(),1);assert(changed.normal.angleTo(base.normal)>.1);close(changed.center.clone().sub(preset.center).dot(changed.normal),.2);const spun=resolvePlane(preset,0,0,80);close(spun.normal.distanceTo(base.normal),0);assert(changed.quaternion.toArray().every(Number.isFinite));}
for(const type of ['lvot','rvot']){const v=phases[1].lessons.find(v=>v.type===type);const p=getPreset(v,1);const points=type==='lvot'?[cardiacLandmarks.LV,cardiacLandmarks.Ao,[0,0,0]]:[cardiacLandmarks.RV,cardiacLandmarks.PA,greatVessels.PA];for(const point of points){close(new T.Vector3(...point).add(new T.Vector3(.1,.24,.04)).sub(p.center).dot(p.normal),0);}assert(p.normal.toArray().filter(n=>Math.abs(n)>.01).length>1);}
const sphere=new T.Mesh(new T.SphereGeometry(1,24,16));const equator=sectionSegments([sphere],new T.Vector3(0,1,0),new T.Vector3());assert(equator.length>30);for(let i=1;i<equator.length;i+=3)close(equator[i],0);assert.equal(sectionSegments([sphere],new T.Vector3(0,1,0),new T.Vector3(0,2,0)).length,0);sphere.position.set(4,2,1);const tilted=new T.Vector3(1,1,1).normalize();const cut=sectionSegments([sphere],tilted,sphere.position);assert(cut.length>30);for(let i=0;i<cut.length;i+=3)close(new T.Vector3(...cut.slice(i,i+3)).sub(sphere.position).dot(tilted),0);
// Exercise actual scene graph transitions without requiring a browser or GPU.
const dom=new Map();const $=id=>{if(!dom.has(id))dom.set(id,{checked:false,value:0,textContent:'',hidden:false,innerHTML:''});return dom.get(id);};globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},fillText(){}})})};
const scene=new T.Scene(),camera=new T.PerspectiveCamera(),fetus=new T.Group(),headGroup=new T.Group();scene.add(fetus);fetus.add(headGroup);const solid=new T.MeshStandardMaterial(),body=new T.Mesh(new T.SphereGeometry(1),solid);fetus.add(body);const ell=(p,s,m,parent=fetus)=>{const o=new T.Mesh(new T.SphereGeometry(1,16,12),m);o.position.set(...p);o.scale.set(...s);parent.add(o);return o;};const controls={target:new T.Vector3(),update(){}};const grid=new T.Group();scene.add(grid);const api=attachExplorer({scene,camera,controls,fetus,headGroup,ell,organMat:solid,boneMat:solid,grid,$});
const cardiac=phases[1].lessons.find(x=>x.id==='4ch');api.select(cardiac,1);assert(api.getState().focus);assert(body.material.transparent);assert(body.material.opacity<.1);assert(body.visible);$('#organOnly').checked=true;api.isolate();assert(!body.visible);$('#organOnly').checked=false;api.isolate();assert(body.visible);api.opacity(12);close(body.material.opacity,.12);api.angles({tilt:30,rock:10,rotation:45});const state=api.getState();assert(Math.abs(state.normal[0])>.01);api.offset(22);assert.notDeepEqual(api.getState().center,state.center);api.resetPlane();api.getState().normal.forEach((v,i)=>close(v,[0,1,0][i]));api.select(phases[1].lessons[0],1);assert(!api.getState().focus);assert.equal(body.material,solid);assert(body.visible);assert(!$('#skinToggle').disabled);api.select(cardiac,1);assert(api.getState().focus);assert(!$('#organOnly').checked);api.focus(false);assert.equal(body.material,solid);api.skin(true);assert(body.material.transparent);console.log('Plane orientation, landmark incidence, rotation/offset, transformed mesh intersection and cardiac focus/isolation/restoration passed. No GPU/browser visual validation.');


const orbitView=phases[1].lessons.find(v=>v.type==='orbit');
api.select({...orbitView,direction:'standard'},1);api.angles({tilt:30,rock:20,rotation:10});
camera.position.set(4,5,6);controls.target.set(1,2,3);const cameraBefore=camera.position.clone(),targetBefore=controls.target.clone();
api.select({...orbitView,direction:'sagittal-left'},1);
api.getState().normal.forEach((v,i)=>close(v,[1,0,0][i]));assert.equal(api.getState().center[0],.3);
assert(camera.position.equals(cameraBefore));assert(controls.target.equals(targetBefore));
api.select({...orbitView,direction:'sagittal-right'},1);assert.equal(api.getState().center[0],-.3);
assert(camera.position.equals(cameraBefore));assert(controls.target.equals(targetBefore));
console.log('Direction switching resets relative plane offsets but preserves camera and orbit target; left/right eye planes verified.');
