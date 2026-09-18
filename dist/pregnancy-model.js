import * as T from './vendor/three.module.js';
// Composite pregnancy context, not a scan of one pregnant patient.
export function createPregnancyModel(bodyMeshes,uterusAsset){
 const group=new T.Group();group.name='pregnancy-context';const tissue=[];
 const material=(color,opacity=1)=>new T.MeshStandardMaterial({color,roughness:.7,side:T.DoubleSide,transparent:opacity<1,opacity,depthWrite:opacity===1});
 function mesh(g,m,n){const o=new T.Mesh(g,m);o.name=n;group.add(o);return o;}
 const wall=mesh(new T.SphereGeometry(1,64,48),material(0xdca2b5,.15),'pregnant-uterine-wall');wall.position.y=.45;wall.scale.set(1.65,2.35,1.65);tissue.push(wall);
 const baby=new T.Group(),fit=new T.Group();baby.name='fetus-inside-uterus';baby.add(fit);group.add(baby);
 for(const original of bodyMeshes){original.updateWorldMatrix(true,false);const copy=new T.Mesh(original.geometry,original.userData.solid.clone());original.matrixWorld.decompose(copy.position,copy.quaternion,copy.scale);fit.add(copy);}
 const bounds=new T.Box3().setFromObject(fit);fit.position.sub(bounds.getCenter(new T.Vector3()));fit.rotation.z=Math.PI;
 // Rotation belongs to the outer group so centering is rotated with the geometry.
 fit.rotation.z=0;baby.rotation.z=Math.PI;baby.position.y=.45;group.updateWorldMatrix(true,true);
 let radius=0;for(const o of fit.children){const pos=o.geometry.attributes.position;for(let i=0;i<pos.count;i++){const p=new T.Vector3().fromBufferAttribute(pos,i).applyMatrix4(o.matrixWorld);radius=Math.max(radius,Math.sqrt((p.x/1.45)**2+((p.y-.45)/2.1)**2+(p.z/1.35)**2));}}
 if(radius>0)baby.scale.setScalar(.84/radius);
 const placenta=mesh(new T.SphereGeometry(1,48,32),material(0xb9576e),'pregnancy-placenta');placenta.position.set(0,.65,-1.39);placenta.scale.set(.72,.73,.15);tissue.push(placenta);
 const cord=mesh(new T.TubeGeometry(new T.CatmullRomCurve3([[0,.65,-1.23],[.42,.3,-.6],[.38,-.05,-.15],[0,.4,.1]].map(p=>new T.Vector3(...p))),48,.045,12,false),material(0xb4d5cf),'pregnancy-cord');
 const cervicalGroup=new T.Group();group.add(cervicalGroup);cervicalGroup.name='pregnancy-cervix-reference';
 if(uterusAsset){uterusAsset.group.updateWorldMatrix(true,true);const point=n=>new T.Box3().setFromObject(uterusAsset.meshes.find(m=>m.name==='VH_F_'+n)).getCenter(new T.Vector3());const inner=point('internal_cervical_os'),outer=point('external_cervical_os'),local=new T.Group();cervicalGroup.add(local);local.position.copy(inner).negate();for(const original of uterusAsset.meshes.filter(m=>/cervix|cervical_os/.test(m.name))){const copy=new T.Mesh(original.geometry,material(/cervical_os/.test(original.name)?0xffd17d:0xe8b19e));original.matrixWorld.decompose(copy.position,copy.quaternion,copy.scale);local.add(copy);tissue.push(copy);}cervicalGroup.quaternion.setFromUnitVectors(inner.clone().sub(outer).normalize(),new T.Vector3(0,1,0));cervicalGroup.scale.setScalar(.8/inner.distanceTo(outer));cervicalGroup.position.set(0,-1.7,0);}
 const labels=[];for(const [text,p] of [['태아',[.9,.25,.3]],['태반',[.85,.8,-1.3]],['내자궁구',[.55,-1.7,0]],['외자궁구',[.55,-2.5,0]]]){const c=document.createElement('canvas');c.width=256;c.height=64;const ctx=c.getContext('2d');ctx.fillStyle='#102b35e6';ctx.fillRect(0,0,256,64);ctx.fillStyle='#effbfa';ctx.font='28px sans-serif';ctx.textAlign='center';ctx.fillText(text,128,43);const o=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(c),depthTest:false}));o.position.set(...p);o.scale.set(.55,.138,1);group.add(o);labels.push(o);}
 const preset=type=>({center:new T.Vector3(0,type==='cervix'?-2.1:-.55,type==='cervix'?0:-.65),normal:new T.Vector3(1,0,0),landmarks:type==='cervix'?[new T.Vector3(0,-1.7,0),new T.Vector3(0,-2.5,0)]:[new T.Vector3(0,-.08,-1.39),new T.Vector3(0,-1.7,0)],anchorNames:type==='cervix'?['합성 장면의 내자궁구','합성 장면의 외자궁구']:['태반 하연 예시','내자궁구 예시'],extent:type==='cervix'?1.7:4.8});
 return {group,preset,meshes:()=>tissue.filter(o=>o!==wall),set(type,{labelsVisible=true}={}){labels.forEach(l=>l.visible=labelsVisible);baby.children.forEach(o=>o.visible=true);},clip(plane,enabled){for(const o of tissue)o.material.clippingPlanes=enabled?[plane]:[];}};
}
