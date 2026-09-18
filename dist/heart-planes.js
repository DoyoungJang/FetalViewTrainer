import * as T from './vendor/three.module.js';

// Geometric reference sections of this specific adult mesh, not fetal validation.
export function heartModelPreset(asset,type){
 asset.group.updateWorldMatrix(true,true);
 const point=name=>{
  const mesh=asset.meshes.find(m=>m.name==='VH_M_'+name);
  if(!mesh)throw new Error('Missing cardiac landmark: '+name);
  return new T.Box3().setFromObject(mesh).getCenter(new T.Vector3());
 };
 let names;
 if(type==='heart')names=['mitral_valve','tricuspid_valve','heart_left_ventricle'];
 else if(type==='lvot')names=['heart_left_ventricle','aortic_valve','ascending_aorta'];
 else if(type==='rvot')names=['heart_right_ventricle','pulmonary_valve','pulmonary_trunk'];
 else return null;
 const points=names.map(point),[a,b,c]=points;
 const normal=b.clone().sub(a).cross(c.clone().sub(a)).normalize();
 if(normal.lengthSq()<.9)throw new Error('Degenerate cardiac landmarks');
 if(normal.z<0)normal.negate();
 return {center:a.clone().add(b).add(c).multiplyScalar(1/3),normal,landmarks:points,names};
}
