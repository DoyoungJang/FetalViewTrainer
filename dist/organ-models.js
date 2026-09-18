import * as T from './vendor/three.module.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';

const definitions={
 heart:{file:'heart-human.glb',size:.82,center:[.1,.38,.0],color:0xc56d65},
 brain:{file:'brain-dharani.glb',size:1.24,center:[0,1.53,.12],color:0xdcb7a2}
};
export async function loadOrganModels(){
 const assets={};await Promise.all(Object.entries(definitions).map(async([kind,def])=>{
 const gltf=await new GLTFLoader().loadAsync(new URL('./models/'+def.file,import.meta.url).href);
 const holder=new T.Group(),normalized=new T.Group();holder.name=kind+'-open-reference';holder.add(normalized);normalized.add(gltf.scene);gltf.scene.updateWorldMatrix(true,true);
 const bounds=new T.Box3().setFromObject(gltf.scene),size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3());
 if(bounds.isEmpty()||!Number.isFinite(size.length())||size.length()===0)throw new Error('Invalid '+kind+' model');
 gltf.scene.position.sub(center);const scale=def.size/Math.max(size.x,size.y,size.z);normalized.scale.setScalar(scale);holder.position.set(...def.center);
 const meshes=[];holder.traverse(o=>{if(!o.isMesh)return;meshes.push(o);const materials=Array.isArray(o.material)?o.material:[o.material];materials.forEach(m=>m.dispose());o.material=new T.MeshStandardMaterial({color:def.color,roughness:.65,metalness:0,side:T.DoubleSide});});
 if(!meshes.length)throw new Error('Empty '+kind+' model');assets[kind]={group:holder,meshes,center:new T.Vector3(...def.center)};
 }));return assets;
}
