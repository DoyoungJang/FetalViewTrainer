import {Vector3,Quaternion,Matrix4,MathUtils} from './vendor/three.module.js';
import {limbLandmarks,brainLandmarks,greatVessels,heartOrigin as origin} from './anatomy-registration.js?v=25';

export const isCardiac=v=>['heart','lvot','rvot','vessels','threev','threevpa','aoarch','ductarch','bicaval'].includes(v.type);
export const planeReferences=[
 ['ISUOG · 심장 선별검사 2023, pp. 792–793','https://www.isuog.org/static/a529f402-06f9-42b6-ae9abdc736c43bf2/UOG-2023-Carvalho-ISUOG-Practice-Guidelines-updated-fetal-cardiac-screening.pdf'],
 ['ASE · 태아 심초음파 2023','https://www.asecho.org/wp-content/uploads/2023/07/PIIS0894731723002067-1.pdf'],
 ['ISUOG · 중추신경계 선별검사 2020','https://isuog.org/static/c5e79c3a-248e-4bf4-8c195701279b6c05/ISUOG-Practice-Guidelines-CNS-part-1-targeted-neurosonography.pdf'],
 ['ISUOG Basic Training · 사지 장축과 손발의 관계','https://www.isuog.org/asset/6769CB98-F215-445D-872B63570C45E1F7/']
];
// Coordinates are authored schematic landmarks, NOT patient measurements or prescribed probe angles.
const heartOrigin=new Vector3(...origin);
export const cardiacLandmarks={RA:[-.11,0,-.11],LA:[.10,0,-.14],RV:[-.06,-.02,.13],LV:[.16,-.05,.09],Ao:[.09,.19,-.015],PA:[-.12,.2,.13]};
const worldHeart=p=>new Vector3(...p).add(heartOrigin);
function through(a,b,c){return new Vector3().subVectors(b,a).cross(new Vector3().subVectors(c,a)).normalize();}
export function getPreset(v,phase){
 let center=new Vector3(0,v.y,0),normal=new Vector3(0,1,0),note='태아의 해부학적 축을 기준으로 단면을 정렬합니다. 태위와 탐촉자 접근에 따라 조절이 필요합니다.',refs=[],landmarks=[],anchorNames=[],extent=null;
 if(['profile','nt','spine'].includes(v.type)){normal.set(1,0,0);center.set(0,v.type==='nt'?1.25:.2,0);note='정중시상면을 찾습니다. 화면의 축보다 태아 정중선과 해부학적 구조의 정렬이 기준입니다.';}
 if(v.type==='face'){normal.set(0,0,1);center.set(0,1.35,.72);note='상순을 관찰하는 관상면입니다. 옆얼굴을 보려면 별도의 정중시상면이 필요합니다.';}
 if(['head','ventricle','earlybrain'].includes(v.type)){note='머리의 대칭과 정중선을 기준으로 횡단면을 맞춥니다. 시상 단면과 측뇌실 단면은 높이가 다르며, 소뇌 단면은 후방 기울기가 추가됩니다.';refs=[2];}
 if(isCardiac(v)){refs=[0,1];center.copy(heartOrigin);if(v.type==='heart'){note='흉부 횡단면에서 네 방을 확인합니다. 이후 머리 쪽으로 스윕하면서 작은 각도 조절로 유출로를 찾습니다.';}
 if(v.type==='lvot'){const lv=worldHeart(cardiacLandmarks.LV),ao=worldHeart(cardiacLandmarks.Ao),septum=worldHeart([0,0,0]);center.copy(lv).lerp(ao,.5);normal.copy(through(lv,ao,septum));note='사강 단면에서 머리 쪽으로 이동·각도 조절하여 좌심실–대동맥 연결을 찾습니다. 태아 오른쪽 어깨 방향으로 회전하는 접근도 있습니다. 이 시작 평면은 모델의 LV·Ao·중격 기준점을 통과합니다.';}
 if(v.type==='rvot'){const rv=worldHeart(cardiacLandmarks.RV),pa=worldHeart(cardiacLandmarks.PA),branch=worldHeart(greatVessels.PA);center.copy(rv).lerp(pa,.7);normal.copy(through(rv,pa,branch));note='LVOT에서 더 머리 쪽으로 기울여 우심실–폐동맥 연결과 분지를 봅니다. 두 유출로의 교차는 연속 탐색으로 확인합니다. 모델의 RV·PA·분지 기준점으로 시작 평면을 정합니다.';}
 }
 // Give equivalent normal directions consistent signs so normal offsets remain predictable.
 if(['aoarch','ductarch','bicaval'].includes(v.type)){
  const pts=v.type==='aoarch'?[[0,.28,0],greatVessels.archStart,greatVessels.descending]:v.type==='ductarch'?[[-.12,.2,.13],greatVessels.ductStart,greatVessels.descending]:[[-.2,.51,-.04],[-.11,0,-.11],[-.2,-.2,-.09]];
  const [a,b,c]=pts.map(worldHeart);center.copy(a).add(b).add(c).multiplyScalar(1/3);normal.copy(through(a,b,c));note=v.type==='aoarch'?'상행대동맥–대동맥궁–하행대동맥을 잇는 종단면입니다.':v.type==='ductarch'?'폐동맥–동맥관–하행대동맥 연결을 보는 사선 종단면입니다.':'상대정맥과 하대정맥이 우심방으로 들어가는 연결을 보는 종단면입니다.';
 }
 if(v.type==='facialprofile'){center.set(0,1.4,.5);normal.set(1,0,0);}
 if(v.type==='orbit'){center.set(0,1.5,.65);normal.set(0,1,.2).normalize();}
 if(v.type==='cord'){center.set(0,-.3,.58);normal.set(0,1,0);landmarks=[center.clone()];anchorNames=['복부 제대 부착부 참고 위치'];note='복부 제대 부착부를 지나는 횡단면(axial)입니다. 태아의 머리–꼬리 축에 수직이며, 복벽의 연속성과 제대 부착을 확인하는 교육용 시작면입니다.';}
 if(v.type==='diaphragm'){center.set(0,-.1,0);normal.set(0,0,1);}
 if(v.type==='kidneysag'){center.set(.19,-.54,-.1);normal.set(1,0,0);}
 if(v.type==='kidneycor'){center.set(0,-.54,-.1);normal.set(0,0,1);}
 if(v.type==='genitalia'){center.set(0,-.95,.35);normal.set(0,1,0);}
 const limbNames={humerus:['shoulder','elbow'],forearm:['elbow','wrist'],hand:['wrist','finger','palmEdge'],femur:['hip','knee'],tibia:['knee','ankle'],foot:['heel','toe','footEdge']}[v.type];
 if(limbNames){const points=limbNames.map(n=>new Vector3(...limbLandmarks[n]));const [a,b]=points;const c=points[2]||a.clone().lerp(b,.5).add(new Vector3(.09,0,0));center.copy(a).lerp(b,.5);normal.copy(through(a,b,c));landmarks=[a,b,c];anchorNames=limbNames.map(n=>({shoulder:"어깨",elbow:"팔꿈치",wrist:"손목",finger:"손가락 끝",palmEdge:"손바닥",hip:"고관절",knee:"무릎",ankle:"발목",heel:"발뒤꿈치",toe:"발끝",footEdge:"발 가장자리"}[n]));extent=Math.max(.7,a.distanceTo(b)+.35);note='현재 굴곡된 외형 모델에서 확인한 관절·손발 기준점을 지나는 장축면입니다. 주황 기준점과 평면을 함께 확인하세요. 외형에 맞춘 교육용 위치이며 개별 뼈의 분할·임상 계측 모델은 아닙니다.';refs=[3];}
 if(['head','ventricle','cerebellum'].includes(v.type)){
  const tcp=v.type==='cerebellum',tvp=v.type==='ventricle';
  const keys=tcp?['cerebellumLeft','cerebellumRight','thalamicRegion']:tvp?['tvpLeft','tvpRight','tvpAnterior']:['ttpLeft','ttpRight','ttpAnterior'];
  const [a,b,c]=keys.map(k=>new Vector3(...brainLandmarks[k]));
  center.copy(a).add(b).add(c).multiplyScalar(1/3);normal.copy(through(a,b,c));
  landmarks=[a,b,c];extent=1.55;
  anchorNames=tcp?['좌측 소뇌 영역 참고','우측 소뇌 영역 참고','시상 영역 참고']:tvp?['측뇌실 후방 영역 참고 1','측뇌실 후방 영역 참고 2','전방 영역 참고']:['시상 영역 참고 1','시상 영역 참고 2','전방 영역 참고'];
  note=(tcp?'c · TCP: 전방에서 후하방 소뇌로 기울어진 횡단 경사면입니다.':tvp?'a · TVP: TTP보다 위쪽의 측뇌실 높이이며 TTP와 평행한 기준면입니다.':'b · TTP: TVP보다 아래쪽의 평행면으로 시상 높이를 통과합니다.')+' 첨부 도식과 ISUOG의 상대적 위치 관계를 반영하고, DHARANI 시상 조직 영상의 영역에 맞춘 교육용 시작면입니다. 기존 외형과 신규 뇌 표면에 같은 머리 좌표계를 적용합니다. 각도는 이 모델의 등록값이며 임상 탐촉자 각도가 아닙니다.';refs=[2];
 }
 if(v.type==='earlybrain')center.set(...brainLandmarks.ventricularLevel);
 if(['threev','threevpa'].includes(v.type)){center.copy(worldHeart(v.type==='threevpa'?greatVessels.PAmeasure:greatVessels.Ao));normal.set(0,1,0);landmarks=v.type==='threevpa'?[worldHeart(greatVessels.PAmeasure)]:[greatVessels.PA,greatVessels.Ao,greatVessels.SVC].map(worldHeart);anchorNames=v.type==='threevpa'?['PA 측정 중심']:['PA','Ao','SVC'];note=v.type==='threevpa'?'폐동맥 줄기의 중심선에 수직인 측정 시작면입니다. 3VV의 PA 측정 하위 항목이며 별도의 공식 독립 단면을 뜻하지 않습니다.':'폐동맥–대동맥–상대정맥의 세 중심선을 가로지르는 면입니다. 모식도의 태아 왼쪽에서 오른쪽 순서로 PA–Ao–SVC를 배치했습니다.';}
 if(v.type==='vessels'){const a=worldHeart(greatVessels.ductStart),b=worldHeart(greatVessels.archStart),c=worldHeart(greatVessels.descending);center.copy(a).add(b).add(c).multiplyScalar(1/3);normal.copy(through(a,b,c));landmarks=[a,b,c];anchorNames=['동맥관궁','대동맥궁','하행대동맥'];note='동맥관궁과 대동맥궁이 하행대동맥으로 합류하는 V의 세 기준점을 포함하는 경사면입니다. 두 궁은 기관의 태아 왼쪽을 지나며, 3VV보다 머리 쪽에 위치합니다.';}
 if(['placenta','cervix'].includes(v.type)){center.set(0,v.type==='cervix'?-1.48:-.15,v.type==='cervix'?0:-.28);normal.set(1,0,0);landmarks=(v.type==='cervix'?[[0,-1.12,0],[0,-1.84,0]]:[[0,-.05,-.57],[0,-1.12,0]]).map(p=>new Vector3(...p));anchorNames=v.type==='cervix'?['내자궁구','외자궁구']:['태반 하연','내자궁구'];extent=v.type==='cervix'?1.2:3.5;note='모체 자궁·태반·자궁경부의 관계를 별도 모식도로 표시합니다. 실제 계측용 단면이 아닙니다.';}
 if(normal.y<-.001)normal.negate();
 return {center,normal,note,refs,landmarks,anchorNames,extent,cardiac:isCardiac(v)};
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
