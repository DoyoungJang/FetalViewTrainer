import * as T from './vendor/three.module.js';

// Educational registration to the fetal surface using atlas thoracic height, not a
// patient-specific segmentation. +X is fetal left, +Y cranial, +Z anterior.
export function registerHeartToThorax(heart,body,skin=[]){
 const lungs=body?.meshes.find(m=>m.name==='lungs');
 if(!heart||!lungs)return null;
 body.group.updateWorldMatrix(true,true);heart.group.updateWorldMatrix(true,true);
 const thorax=new T.Box3().setFromObject(lungs),size=thorax.getSize(new T.Vector3());
 const coreNames=['VH_M_left_cardiac_atrium','VH_M_right_cardiac_atrium','VH_M_heart_left_ventricle','VH_M_heart_right_ventricle'];
 const core=heart.meshes.filter(m=>coreNames.includes(m.name));
 if(core.length!==4)throw new Error('Missing chamber landmarks for thoracic registration');
 const bounds=new T.Box3();core.forEach(m=>bounds.union(new T.Box3().setFromObject(m)));
 const originalCenter=bounds.getCenter(new T.Vector3()),originalSize=bounds.getSize(new T.Vector3());
 // Use thoracic height from the atlas and depth/width from the curled skin.
 // Keep the donor's left/right and anterior/posterior orientation: LV is
 // already fetal-left and RV anterior. Do not mirror or distort the mesh.
 const target=thorax.getCenter(new T.Vector3());
 let width=size.x,depth=size.z;
 if(skin.length){
  const saved=[];for(const mesh of skin){mesh.updateWorldMatrix(true,false);for(const material of [mesh.material].flat()){saved.push([material,material.side]);material.side=T.DoubleSide;}}
  try{
   const ray=new T.Raycaster();
   const crossings=(origin,direction)=>{ray.set(origin,direction);return ray.intersectObjects(skin,false).filter((h,i,a)=>i===0||h.distance-a[i-1].distance>1e-5).map(h=>h.point);};
   // At thoracic height the midline ray excludes the curled arms and legs.
   const sagittal=crossings(new T.Vector3(0,target.y,-10),new T.Vector3(0,0,1));
   if(sagittal.length<2)throw new Error('Cannot locate fetal thoracic surface');
   depth=sagittal[1].z-sagittal[0].z;target.z=sagittal[0].z+depth*.53;
   const lateral=crossings(new T.Vector3(-10,target.y,target.z),new T.Vector3(1,0,0));
   // Select the closed interval containing the midline, excluding limbs.
   let pair;for(let i=0;i+1<lateral.length;i+=2)if(lateral[i].x<=0&&lateral[i+1].x>=0)pair=[lateral[i],lateral[i+1]];
   if(!pair)throw new Error('Cannot locate fetal thorax width');
   width=pair[1].x-pair[0].x;target.x=(pair[0].x+pair[1].x)/2+width*.10;
  }finally{for(const [material,side]of saved)material.side=side;}
 }else target.add(new T.Vector3(size.x*.10,0,size.z*.08));
 const factor=Math.min(width*.48/originalSize.x,size.y*.80/originalSize.y,depth*.62/originalSize.z);
 const oldOrigin=heart.group.position.clone();
 heart.group.scale.multiplyScalar(factor);
 heart.group.position.copy(target).sub(originalCenter.clone().sub(oldOrigin).multiplyScalar(factor));
 heart.group.updateWorldMatrix(true,true);heart.center.copy(target);
 const registration={target:target.toArray(),scale:factor,surfaceBased:skin.length>0,thoraxMin:thorax.min.toArray(),thoraxMax:thorax.max.toArray()};
 heart.group.userData.thoracicRegistration=registration;
 return registration;
}
