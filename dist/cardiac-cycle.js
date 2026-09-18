import * as T from './vendor/three.module.js';

// Illustrative poses, not measured phases, valve kinematics or a biomechanical model.
const poses={
 '4ch':{name:'이완기 초기',amount:-.08},
 '4ch-ed':{name:'이완기 말',amount:.08},
 '4ch-es':{name:'수축기 말',amount:-.24},
 'lvot':{name:'수축기',amount:-.19},
 'lvot-ed':{name:'이완기 말',amount:.08},
 'rvot':{name:'수축기',amount:-.19},
 'rvot-ed':{name:'이완기 말',amount:.08}
};
export function createCardiacCycle(asset){
 if(!asset)return {apply:()=>null};
 asset.group.updateWorldMatrix(true,true);
 const find=n=>asset.meshes.find(m=>m.name==='VH_M_'+n);
 const ventricles=['heart_left_ventricle','heart_right_ventricle'].map(find);
 const valves=['mitral_valve','tricuspid_valve'].map(find);
 if([...ventricles,...valves].some(m=>!m))return {apply:()=>null};
 const box=new T.Box3();ventricles.forEach(m=>box.union(new T.Box3().setFromObject(m)));
 const center=box.getCenter(new T.Vector3());
 const base=valves.map(m=>new T.Box3().setFromObject(m).getCenter(new T.Vector3())).reduce((a,b)=>a.add(b),new T.Vector3()).multiplyScalar(.5);
 const axis=center.clone().sub(base).normalize(),length=Math.max(center.distanceTo(base)*2,.1);
 // One smooth spatial field for every tissue preserves shared boundaries. The
 // valve plane and great vessels stay fixed; deformation increases toward apex.
 const records=asset.meshes.map(mesh=>{
  mesh.geometry=mesh.geometry.clone();const g=mesh.geometry;
  const original=g.attributes.position.array.slice(),normal=g.attributes.normal?.array.slice();
  const inverse=mesh.matrixWorld.clone().invert(),delta=new Float32Array(original.length),p=new T.Vector3(),radial=new T.Vector3();
  for(let i=0;i<original.length;i+=3){
   p.fromArray(original,i).applyMatrix4(mesh.matrixWorld).sub(base);
   const depth=p.dot(axis),t=T.MathUtils.clamp(depth/(length*.7),0,1),weight=t*t*(3-2*t);
   radial.copy(p).addScaledVector(axis,-depth);
   p.addScaledVector(radial,weight).addScaledVector(axis,depth*weight*.35).add(base).applyMatrix4(inverse);
   delta[i]=p.x-original[i];delta[i+1]=p.y-original[i+1];delta[i+2]=p.z-original[i+2];
  }
  return {g,original,normal,delta,bounds:g.boundingBox?.clone(),sphere:g.boundingSphere?.clone()};
 });
 let previous='original';
 return {apply(lesson,enabled=true){
  const pose=enabled&&lesson?.temporal?poses[lesson.id]:null,key=pose?lesson.id:'original';
  if(key!==previous){for(const {g,original,normal,delta,bounds,sphere} of records){
   const a=g.attributes.position.array;
   if(!pose)a.set(original);else for(let i=0;i<a.length;i++)a[i]=original[i]+delta[i]*pose.amount;
   g.attributes.position.needsUpdate=true;
   if(!pose&&normal){g.attributes.normal.array.set(normal);g.attributes.normal.needsUpdate=true;}else g.computeVertexNormals();
   if(!pose){g.boundingBox=bounds?.clone()||null;g.boundingSphere=sphere?.clone()||null;}else{g.computeBoundingBox();g.computeBoundingSphere();}
  }previous=key;}
  return pose?{name:pose.name,key}:null;
 }};
}
