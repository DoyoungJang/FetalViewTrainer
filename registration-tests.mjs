import assert from 'node:assert/strict';
import * as T from './dist/vendor/three.module.js';
import {phases} from './dist/data.js';
import {getPreset,sectionSegments} from './dist/planes.js';
import {cardiacPaths,heartOrigin,greatVessels,limbLandmarks} from './dist/anatomy-registration.js';
const view=type=>phases[1].lessons.find(v=>v.type===type);
for(const type of ['forearm','hand','tibia','foot','cerebellum','threev','threevpa','vessels']){
 const p=getPreset(view(type),1);assert(p.landmarks.length);
 for(const point of p.landmarks)assert(Math.abs(point.clone().sub(p.center).dot(p.normal))<1e-8,`${type} missed its anatomy reference`);
}
const meshes=cardiacPaths.map(path=>{const mesh=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(path.points.map(p=>new T.Vector3(...p))),160,path.r,16,false));mesh.position.set(...heartOrigin);mesh.name=path.name;return mesh;});
for(const type of ['threev','threevpa']){
 const p=getPreset(view(type),1),widths=[];
 for(const name of ['PA','Ao','SVC']){const mesh=meshes.find(m=>m.name===name),s=sectionSegments([mesh],p.normal,p.center);assert(s.length>0,`${type} misses ${name}`);const xs=s.filter((_,i)=>i%3===0);widths.push(Math.max(...xs)-Math.min(...xs));}
 assert(widths[0]>widths[1]&&widths[1]>widths[2],`${type} vessel caliber ordering`);
}
const vt=getPreset(view('vessels'),1),vv=getPreset(view('threev'),1);assert(vt.center.y>vv.center.y+.10);
for(const name of ['AoArch','Duct']){
 const path=cardiacPaths.find(p=>p.name===name),curve=new T.CatmullRomCurve3(path.points.map(p=>new T.Vector3(...p)));
 for(let i=0;i<=100;i++){const point=curve.getPoint(i/100).add(new T.Vector3(...heartOrigin));assert(Math.abs(point.sub(vt.center).dot(vt.normal))<1e-7,`V arch outside 3VT plane: ${name}`);}
}
assert(greatVessels.archStart[0]>greatVessels.trachea[0]&&greatVessels.ductStart[0]>greatVessels.trachea[0]);
assert(limbLandmarks.ankle[2]>2&&limbLandmarks.toe[2]>2.4);
console.log('Registered limb/brain planes contain their references; 3VV intersects PA/Ao/SVC with ordered calibers; both 3VT arches lie in one cranial V plane left of the trachea.');
