import * as T from './vendor/three.module.js';
// Authored anatomy teaching model; dimensions are relative, not clinical measurements.
export const maternalLandmarks={placenta:[0,.65,-.57],lowerEdge:[0,-.05,-.57],internalOs:[0,-1.12,0],externalOs:[0,-1.84,0]};
export function createMaternalModel(){
 const group=new T.Group();group.name='maternal-anatomy';
 const mat=(color,opacity=1)=>new T.MeshStandardMaterial({color,roughness:.7,side:T.DoubleSide,transparent:opacity<1,opacity,depthWrite:opacity===1});
 const wallMat=mat(0xd7a1af,.22),placentaMat=mat(0xb95469),cervixMat=mat(0xeac1a3);
 const add=(geometry,material,name)=>{const mesh=new T.Mesh(geometry,material);mesh.name=name;group.add(mesh);return mesh;};
 const uterusProfile=[[.23,-1.12],[.32,-.94],[.63,-.62],[.92,-.12],[1.10,.5],[1.02,1.12],[.7,1.65],[.18,1.87],[0,1.9],[0,1.79],[.16,1.77],[.62,1.55],[.92,1.08],[1,.5],[.83,-.1],[.55,-.57],[.24,-.9],[.15,-1.12],[.23,-1.12]].map(p=>new T.Vector2(...p));
 const cervixProfile=[[.23,-1.12],[.25,-1.35],[.24,-1.65],[.19,-1.84],[.065,-1.84],[.045,-1.65],[.045,-1.35],[.065,-1.12],[.23,-1.12]].map(p=>new T.Vector2(...p));
 const uterus=add(new T.LatheGeometry(uterusProfile,64),wallMat,'uterine-wall');uterus.scale.z=.76;
 const uterusOpen=add(new T.LatheGeometry(uterusProfile,48,Math.PI,Math.PI),wallMat,'uterine-wall-cutaway');uterusOpen.scale.z=.76;
 const cervix=add(new T.LatheGeometry(cervixProfile,64),cervixMat,'cervix-with-canal');
 const cervixOpen=add(new T.LatheGeometry(cervixProfile,48,Math.PI,Math.PI),cervixMat,'cervix-cutaway');
 const placenta=add(new T.SphereGeometry(1,48,32),placentaMat,'placental-disc');placenta.position.set(...maternalLandmarks.placenta);placenta.scale.set(.67,.70,.16);
 for(let i=0;i<15;i++){const a=i*2.39996,r=.12+.43*Math.sqrt(i/15),lobe=add(new T.SphereGeometry(1,16,12),mat(i%2?0xa94b63:0xc36579),'placental-lobule');lobe.position.set(Math.cos(a)*r,.65+Math.sin(a)*r,-.67);lobe.scale.set(.14,.15,.055);}
 const cord=add(new T.TubeGeometry(new T.CatmullRomCurve3([[0,.65,-.39],[.12,.6,-.13],[.4,.36,.2],[.27,.05,.32]].map(p=>new T.Vector3(...p))),48,.048,12,false),mat(0xb9d7d0),'umbilical-cord');
 const labels=[];
 function label(text,p){const c=document.createElement('canvas');c.width=512;c.height=64;const ctx=c.getContext('2d');ctx.fillStyle='#102b35e6';ctx.fillRect(0,0,512,64);ctx.fillStyle='#effbfa';ctx.font='28px sans-serif';ctx.textAlign='center';ctx.fillText(text,256,43);const sprite=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(c),depthTest:false}));sprite.scale.set(.82,.103,1);sprite.position.set(...p);sprite.renderOrder=9;group.add(sprite);labels.push(sprite);}
 label('태반 · Placenta',[.83,.88,-.5]);label('태반 하연',[.75,-.05,-.57]);label('내자궁구 · Internal os',[.55,-1.10,0]);label('경관 · Canal',[.58,-1.47,0]);label('외자궁구 · External os',[.60,-1.87,0]);
 return {group,meshes:type=>type==='cervix'?[cervix]:[placenta,uterus,cervix],set(type,{cutaway=true,labelsVisible=true}={}){uterus.visible=!cutaway;uterusOpen.visible=cutaway;cervix.visible=!cutaway;cervixOpen.visible=cutaway;placentaMat.emissive.set(type==='placenta'?0x4b1626:0);cervixMat.emissive.set(type==='cervix'?0x492917:0);wallMat.opacity=type==='cervix'?.10:.22;cord.visible=type==='placenta';labels.forEach(l=>l.visible=labelsVisible);}};
}
