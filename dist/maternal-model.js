import * as T from './vendor/three.module.js';
export function createMaternalModel(asset){
 const group=new T.Group();group.name='maternal-anatomy';
 if(!asset)return {group,meshes:()=>[],preset:null,set(){},clip(){}};
 group.add(asset.group);asset.group.visible=true;group.updateWorldMatrix(true,true);
 const find=n=>asset.meshes.find(m=>m.name==='VH_F_'+n);
 const point=n=>new T.Box3().setFromObject(find(n)).getCenter(new T.Vector3());
 const inner=point('internal_cervical_os'),outer=point('external_cervical_os'),front=point('anterior_wall_of_uterus');
 const normal=outer.clone().sub(inner).cross(front.clone().sub(inner)).normalize();
 const center=inner.clone().lerp(outer,.5),labels=[];
 for(const [text,p] of [['내자궁구',inner],['외자궁구',outer],['자궁경부',point('cervix')]]){
  const c=document.createElement('canvas');c.width=256;c.height=64;const ctx=c.getContext('2d');ctx.fillStyle='#102b35e6';ctx.fillRect(0,0,256,64);ctx.fillStyle='#effbfa';ctx.font='28px sans-serif';ctx.textAlign='center';ctx.fillText(text,128,43);const sprite=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(c),depthTest:false}));sprite.scale.set(.5,.125,1);sprite.position.copy(p).add(new T.Vector3(.3,0,0));sprite.renderOrder=9;group.add(sprite);labels.push(sprite);
 }
 for(const mesh of asset.meshes){mesh.material.transparent=true;mesh.material.opacity=/cervix|cervical_os/.test(mesh.name)?1:.2;mesh.material.depthWrite=mesh.material.opacity===1;mesh.material.color.set(/cervical_os/.test(mesh.name)?0xffd17d:/cervix/.test(mesh.name)?0xe8b19e:0xc98691);}
 const preset={center,normal,landmarks:[inner,outer],anchorNames:['표본의 내자궁구','표본의 외자궁구'],extent:Math.max(1.4,inner.distanceTo(outer)*2.5)};
 return {group,preset,meshes:()=>asset.meshes,set(type,{labelsVisible=true}={}){labels.forEach(l=>l.visible=labelsVisible);},clip(plane,enabled){asset.meshes.forEach(m=>m.material.clippingPlanes=enabled?[plane]:[]);}};
}
