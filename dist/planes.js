import {Vector3,Quaternion,Matrix4,MathUtils} from './vendor/three.module.js';

export const isCardiac=v=>['heart','lvot','rvot','vessels'].includes(v.type);
export const planeReferences=[
 ['ISUOG · 심장 선별검사 2023, pp. 792–793','https://www.isuog.org/static/a529f402-06f9-42b6-ae9abdc736c43bf2/UOG-2023-Carvalho-ISUOG-Practice-Guidelines-updated-fetal-cardiac-screening.pdf'],
 ['ASE · 태아 심초음파 2023','https://www.asecho.org/wp-content/uploads/2023/07/PIIS0894731723002067-1.pdf'],
 ['ISUOG · 중추신경계 선별검사 2020','https://www.isuog.org/asset/C5E79C3A-248E-4BF4-8C195701279B6C05/']
];
// Coordinates are authored schematic landmarks, NOT patient measurements or prescribed probe angles.
const heartOrigin=new Vector3(.1,.24,.04);
export const cardiacLandmarks={RA:[-.11,0,-.11],LA:[.10,0,-.14],RV:[-.06,-.02,.13],LV:[.16,-.05,.09],Ao:[.09,.19,-.015],PA:[-.12,.2,.13]};
const worldHeart=p=>new Vector3(...p).add(heartOrigin);
function through(a,b,c){return new Vector3().subVectors(b,a).cross(new Vector3().subVectors(c,a)).normalize();}
export function getPreset(v,phase){
 let center=new Vector3(0,v.y,0),normal=new Vector3(0,1,0),note='태아의 해부학적 축을 기준으로 단면을 정렬합니다. 태위와 탐촉자 접근에 따라 조절이 필요합니다.',refs=[];
 if(['profile','nt','spine'].includes(v.type)){normal.set(1,0,0);center.set(0,v.type==='nt'?1.25:.2,0);note='정중시상면을 찾습니다. 화면의 축보다 태아 정중선과 해부학적 구조의 정렬이 기준입니다.';}
 if(v.type==='face'){normal.set(0,0,1);center.set(0,1.35,.72);note='상순을 관찰하는 관상면입니다. 옆얼굴을 보려면 별도의 정중시상면이 필요합니다.';}
 if(v.type==='cerebellum'){normal.set(0,1,-.25).normalize();note='시상 단면에서 후방으로 조금 기울여 소뇌와 대조를 찾습니다. 과도한 기울임은 후두와 구조를 왜곡할 수 있습니다.';refs=[2];}
 if(['head','ventricle','earlybrain'].includes(v.type)){note='머리의 대칭과 정중선을 기준으로 횡단면을 맞춥니다. 시상 단면과 측뇌실 단면은 높이가 다르며, 소뇌 단면은 후방 기울기가 추가됩니다.';refs=[2];}
 if(v.type==='femur'){const hip=new Vector3(.32,-.9,0),knee=new Vector3(.61,-1.36,.48);center.copy(hip).lerp(knee,.5);normal.copy(through(hip,knee,knee.clone().add(new Vector3(.2,.1,0))));note='굴곡된 다리의 대퇴골 장축을 포함하는 사선 단면입니다. 전신 X·Y·Z 축에 고정하면 뼈가 짧게 잘릴 수 있습니다.';}
 if(isCardiac(v)){refs=[0,1];center.copy(heartOrigin);if(v.type==='heart'){note='흉부 횡단면에서 네 방을 확인합니다. 이후 머리 쪽으로 스윕하면서 작은 각도 조절로 유출로를 찾습니다.';}
 if(v.type==='lvot'){const lv=worldHeart(cardiacLandmarks.LV),ao=worldHeart(cardiacLandmarks.Ao),septum=worldHeart([0,0,0]);center.copy(lv).lerp(ao,.5);normal.copy(through(lv,ao,septum));note='사강 단면에서 머리 쪽으로 이동·각도 조절하여 좌심실–대동맥 연결을 찾습니다. 태아 오른쪽 어깨 방향으로 회전하는 접근도 있습니다. 이 시작 평면은 모델의 LV·Ao·중격 기준점을 통과합니다.';}
 if(v.type==='rvot'){const rv=worldHeart(cardiacLandmarks.RV),pa=worldHeart(cardiacLandmarks.PA),branch=worldHeart([.12,.35,-.17]);center.copy(rv).lerp(pa,.7);normal.copy(through(rv,pa,branch));note='LVOT에서 더 머리 쪽으로 기울여 우심실–폐동맥 연결과 분지를 봅니다. 두 유출로의 교차는 연속 탐색으로 확인합니다. 모델의 RV·PA·분지 기준점으로 시작 평면을 정합니다.';}
 if(v.type==='vessels'){center.set(.08,.61,-.02);normal.set(0,1,-.28).normalize();note='상흉부로 이동한 뒤 각도를 조절하여 대동맥궁·동맥관궁과 기관의 관계를 봅니다. 3VT는 단순한 평행 이동만으로 항상 얻어지지 않습니다.';}}
 // Give equivalent normal directions consistent signs so normal offsets remain predictable.
 if(normal.y<-.001)normal.negate();center.multiplyScalar(phase===0?.85:1);
 return {center,normal,note,refs,cardiac:isCardiac(v)};
}
export function resolvePlane(preset,tilt=0,rock=0,rotation=0,offset=0){
 if(![tilt,rock,rotation,offset].every(Number.isFinite))throw new Error('Plane values must be finite');
 const z=preset.normal.clone().normalize();let x=new Vector3(1,0,0).addScaledVector(z,-z.x);
 if(x.lengthSq()<1e-8)x.set(0,0,1).addScaledVector(z,-z.z);x.normalize();const y=z.clone().cross(x).normalize();
 const base=new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(x,y,z));
 // Rotate the local tilt axes first, then tilt/rock. A pure in-plane rotation preserves the geometric plane.
 const q=base.clone().multiply(new Quaternion().setFromAxisAngle(new Vector3(0,0,1),MathUtils.degToRad(rotation))).multiply(new Quaternion().setFromAxisAngle(new Vector3(1,0,0),MathUtils.degToRad(tilt))).multiply(new Quaternion().setFromAxisAngle(new Vector3(0,1,0),MathUtils.degToRad(rock)));
 const normal=new Vector3(0,0,1).applyQuaternion(q).normalize();return {normal,quaternion:q,center:preset.center.clone().addScaledVector(normal,offset/100)};
}

export function sectionSegments(meshes,normal,center){
 const result=[],constant=-normal.dot(center),a=new Vector3(),b=new Vector3(),c=new Vector3();
 for(const mesh of meshes){mesh.updateWorldMatrix(true,false);const g=mesh.geometry,p=g.attributes.position,ix=g.index;const count=ix?ix.count:p.count;
 for(let i=0;i<count;i+=3){a.fromBufferAttribute(p,ix?ix.getX(i):i).applyMatrix4(mesh.matrixWorld);b.fromBufferAttribute(p,ix?ix.getX(i+1):i+1).applyMatrix4(mesh.matrixWorld);c.fromBufferAttribute(p,ix?ix.getX(i+2):i+2).applyMatrix4(mesh.matrixWorld);const points=[];for(const [u,w] of [[a,b],[b,c],[c,a]]){const du=normal.dot(u)+constant,dw=normal.dot(w)+constant;if((du<=0&&dw>0)||(du>0&&dw<=0))points.push(u.clone().lerp(w,du/(du-dw)));}if(points.length===2)result.push(...points[0].toArray(),...points[1].toArray());}}
 return result;
}
