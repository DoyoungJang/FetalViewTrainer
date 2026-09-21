import * as T from './vendor/three.module.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';
import {brainPlacement} from './anatomy-registration.js?v=38';

const tissueColors={lungs:0xe3b7df,liver:0xf0a18b,stomach:0xffc3a5,spleen:0xcdb6fa,renal_pelvis:0xffe69b,kidneys:0xf0acc9,bladder:0xffdb91,thymus:0xf8cce9,gallbladder:0xa7e1b5,adrenals:0xffcb8a,diaphragm:0xf6bfb0};
const definitions={
 body:{file:'fetal-body-kcl.glb',native:true,center:[0,-.2,.1]},
 skeleton:{file:'bodyparts-spine-diaphragm.glb',native:true,center:[0,-.2,-.3]},
 uterus:{file:'uterus-hra.glb',size:3.2,center:[0,0,0],color:0xc98691},
 heart:{file:'heart-human.glb',size:.82,center:[.1,.38,.0],color:0xc56d65},
 heartInternal:{file:'heart-hra.glb',size:.82,center:[.1,.38,0],color:0xc67c77},
 brain:{file:'brain-dharani.glb',size:1.24*brainPlacement.scale,center:brainPlacement.center,color:0xdcb7a2}
};
export async function loadOrganModels(){
 const assets={};await Promise.all(Object.entries(definitions).map(async([kind,def])=>{
 const gltf=await new GLTFLoader().loadAsync(new URL('./models/'+def.file,import.meta.url).href);
 let referenceBounds;
 if(kind==='heartInternal'){
  gltf.scene.updateWorldMatrix(true,true);
  const heart=gltf.scene.getObjectByName('VH_M_heart');
  referenceBounds=new T.Box3().setFromObject(heart);
  for(const name of ['ascending_aorta','aortic_arch','descending_aorta_a','superior_vena_cava','inferior_vena_cava_a','pulmonary_trunk','pulmonary_artery_L','pulmonary_artery_R']){
   const vessel=gltf.scene.getObjectByName('VH_M_'+name);if(vessel)heart.attach(vessel);
  }
  gltf.scene.getObjectByName('VH_M_blood_vasculature_of_heart')?.removeFromParent();
 }
 const holder=new T.Group(),normalized=new T.Group();holder.name=kind+'-open-reference';holder.add(normalized);normalized.add(gltf.scene);gltf.scene.updateWorldMatrix(true,true);
 const bounds=referenceBounds||new T.Box3().setFromObject(gltf.scene),size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3());
 if(bounds.isEmpty()||!Number.isFinite(size.length())||size.length()===0)throw new Error('Invalid '+kind+' model');
 if(!def.native){gltf.scene.position.sub(center);const scale=def.size/Math.max(size.x,size.y,size.z);normalized.scale.setScalar(scale);holder.position.set(...def.center);}
 const meshes=[];holder.traverse(o=>{if(!o.isMesh)return;meshes.push(o);const materials=Array.isArray(o.material)?o.material:[o.material];materials.forEach(m=>m.dispose());const sourceColor=materials[0]?.color?.clone();const color=def.native?(tissueColors[o.name]||0xffedc4):kind==='heartInternal'&&/valve/.test(o.name)?0xf0d9a9:kind==='heartInternal'&&/septum/.test(o.name)?0xe1a08e:def.color;o.material=new T.MeshStandardMaterial({color,emissive:color,emissiveIntensity:def.native?.48:.28,roughness:.7,metalness:0,vertexColors:false,side:T.DoubleSide});});
 if(kind==='brain')for(const mesh of meshes){
  mesh.geometry.computeVertexNormals();mesh.material.dispose();
  mesh.material=new T.ShaderMaterial({uniforms:{baseColor:{value:new T.Color(0xefd3bd)}},side:T.DoubleSide,toneMapped:false,
   vertexShader:'varying vec3 surfaceNormal; void main(){surfaceNormal=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
   fragmentShader:'uniform vec3 baseColor; varying vec3 surfaceNormal; void main(){float shade=0.72+0.28*abs(dot(normalize(surfaceNormal),normalize(vec3(0.35,0.55,1.0)))); gl_FragColor=vec4(baseColor*shade,1.0);\n#include <colorspace_fragment>\n}'
  });
 }
 if(!meshes.length)throw new Error('Empty '+kind+' model');assets[kind]={group:holder,meshes,modelRoot:gltf.scene,center:new T.Vector3(...def.center)};
 }));return assets;
}
