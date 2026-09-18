import * as T from './vendor/three.module.js';
import {sectionSegments} from './planes.js?v=11';

// Geometric reference sections of this specific adult mesh, not fetal validation.
export function heartModelPreset(asset,type){
 asset.group.updateWorldMatrix(true,true);
 if(['threev','threevpa','vessels'].includes(type)){
  // Restrict the cranial reference slice to the shared superior vascular region.
  // The whole descending aorta's midpoint lies far below this region.
  const names=type==='vessels'?['pulmonary_trunk','aortic_arch','descending_aorta_a','superior_vena_cava']:['pulmonary_trunk','ascending_aorta','superior_vena_cava'];
  const meshes=names.map(name=>asset.meshes.find(m=>m.name==='VH_M_'+name));
  if(meshes.some(m=>!m))return null;
  const boxes=meshes.map(m=>new T.Box3().setFromObject(m));
  const lower=Math.max(...boxes.map(b=>b.min.y)),upper=Math.min(...boxes.map(b=>b.max.y));
  if(upper<=lower)return null;
  const level=lower+(upper-lower)*(type==='vessels'?.50:type==='threevpa'?.60:.70);
  const sectionCenter=(mesh,y)=>{const s=sectionSegments([mesh],new T.Vector3(0,1,0),new T.Vector3(0,y,0));if(!s.length)return null;const box=new T.Box3();for(let i=0;i<s.length;i+=3)box.expandByPoint(new T.Vector3().fromArray(s,i));return box.getCenter(new T.Vector3());};
  const points=meshes.map(m=>sectionCenter(m,level));if(points.some(p=>!p))return null;
  if(type==='threevpa'){
   const delta=(upper-lower)*.05,a=sectionCenter(meshes[0],level-delta),b=sectionCenter(meshes[0],level+delta);
   if(!a||!b)return null;const normal=b.sub(a).normalize();
   return {center:points[0],normal,landmarks:[points[0]],names,method:'PA local centerline perpendicular'};
  }
  return {center:points.reduce((a,p)=>a.add(p),new T.Vector3()).multiplyScalar(1/points.length),normal:new T.Vector3(0,1,0),landmarks:points,names,anchorNames:type==='vessels'?['폐동맥줄기','대동맥궁','상부 하행대동맥','상대정맥']:names,method:'Shared vascular cross-section level'};
 }
 const point=name=>{
  const mesh=asset.meshes.find(m=>m.name==='VH_M_'+name);
  if(!mesh)throw new Error('Missing cardiac landmark: '+name);
  return new T.Box3().setFromObject(mesh).getCenter(new T.Vector3());
 };
 let names;
 if(type==='heart')names=['mitral_valve','tricuspid_valve','heart_left_ventricle'];
 else if(type==='lvot')names=['heart_left_ventricle','aortic_valve','ascending_aorta'];
 else if(type==='rvot')names=['heart_right_ventricle','pulmonary_valve','pulmonary_trunk'];

 else if(type==='aoarch')names=['ascending_aorta','aortic_arch','descending_aorta_a'];
 else if(type==='bicaval')names=['superior_vena_cava','right_cardiac_atrium','inferior_vena_cava_a'];
 else return null;
 const points=names.map(point),[a,b,c]=points;
 const normal=b.clone().sub(a).cross(c.clone().sub(a)).normalize();
 if(normal.lengthSq()<.9)throw new Error('Degenerate cardiac landmarks');
 if(normal.z<0)normal.negate();
 return {center:a.clone().add(b).add(c).multiplyScalar(1/3),normal,landmarks:points,names};
}
