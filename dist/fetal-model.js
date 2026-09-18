import * as T from './vendor/three.module.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';

// The source model uses a 0.01 FBX-to-glTF transform. Uniform scaling preserves its anatomy.
export const modelTransform={scale:3.8537,position:[0,-.305,0]};
export async function loadFetalModel(parent,onProgress){
 const asset=await new GLTFLoader().loadAsync(new URL('./models/fetus-gelmi.glb',import.meta.url).href,onProgress);
 const root=asset.scene;root.name='Fetus — gelmi.com.br — CC BY 4.0';root.scale.setScalar(modelTransform.scale);root.position.set(...modelTransform.position);
 let meshCount=0;root.traverse(o=>{if(!o.isMesh)return;meshCount++;o.material.dispose();o.material=new T.MeshPhysicalMaterial({color:0xd1a08c,roughness:.58,metalness:0,clearcoat:.07,clearcoatRoughness:.5});o.castShadow=true;o.receiveShadow=true;});
 if(!meshCount)throw new Error('The fetal asset contains no meshes');
 root.updateWorldMatrix(true,true);const bounds=new T.Box3().setFromObject(root);if(bounds.isEmpty()||!Number.isFinite(bounds.max.y))throw new Error('Invalid model bounds');parent.add(root);parent.userData.externalModel=true;return {root,bounds,meshCount};
}
