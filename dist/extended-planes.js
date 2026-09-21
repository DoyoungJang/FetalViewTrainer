import {Vector3,Box3} from './vendor/three.module.js';
import {brainLandmarks,brainPlacement} from './anatomy-registration.js?v=47';

// Model-space educational planes, never prescribed clinical probe angles.
export function extendedPlane(v,p,asset){
 if(!v.extended)return p;
 const q={...p,center:p.center.clone(),normal:p.normal.clone(),landmarks:[],anchorNames:[],note:v.memo};
 const vec=a=>new Vector3(...a),avg=pts=>pts.reduce((a,b)=>a.add(b),new Vector3()).multiplyScalar(1/pts.length);
 const through=pts=>pts[1].clone().sub(pts[0]).cross(pts[2].clone().sub(pts[0])).normalize();
 if(v.group==='정밀 심장'){
  const fallback={heart_left_ventricle:[.26,.19,.13],mitral_valve:[.26,.29,.07],aortic_valve:[.19,.43,.025],pulmonary_valve:[-.02,.44,.17],pulmonary_trunk:[.28,.59,.12],pulmonary_artery_L:[.43,.63,-.05],pulmonary_artery_R:[-.09,.60,-.11],left_cardiac_atrium:[.20,.24,-.10],pulmonary_vein_L_inf:[.30,.24,-.20],pulmonary_vein_R_inf:[.06,.24,-.20]};
  const point=name=>{const mesh=asset?.meshes.find(m=>m.name==='VH_M_'+name);if(asset&&!mesh)throw new Error('Missing extended cardiac landmark: '+name);return mesh?new Box3().setFromObject(mesh).getCenter(new Vector3()):vec(fallback[name]);};
  asset?.group.updateWorldMatrix(true,true);
  let pts;
  if(v.id==='low-sax'||v.id==='high-sax'){
   const lv=point('heart_left_ventricle'),mv=point('mitral_valve');q.normal.copy(mv).sub(lv).normalize();
   q.center.copy(v.id==='low-sax'?lv:point('aortic_valve'));pts=[q.center.clone()];
  }else{pts=(v.id==='pa-bifurcation'?['pulmonary_trunk','pulmonary_artery_L','pulmonary_artery_R']:['left_cardiac_atrium','pulmonary_vein_L_inf','pulmonary_vein_R_inf']).map(point);q.center.copy(avg(pts));q.normal.copy(through(pts));}
  q.landmarks=pts;q.extent=1.1;q.note+=' '+(asset?'신규 성인 표본 메시의 구조별 중심을 이용한 참고면이며 태아 연결·계측의 검증면이 아닙니다.':'간략 심장 모델의 공간 관계를 이용한 참고면입니다.');
 }else if(v.type==='head'||v.type==='cerebellum'||v.type==='earlybrain'){
  const registered=a=>vec(a).sub(vec(brainPlacement.sourceCenter)).multiplyScalar(brainPlacement.scale).add(vec(brainPlacement.center));
  const locations={transfrontal:[0,1.72,.48],transcaudate:[0,1.70,.33],'coronal-thalamic':brainLandmarks.thalamicRegion,'coronal-cerebellar':[0,1.43,-.08],'corpus-callosum':[0,1.74,.22],'posterior-fossa':[0,1.42,-.06],'early-posterior-fossa':[0,1.42,-.06]};
  q.center.copy(registered(locations[v.id]));
  const coronal=v.id.startsWith('trans')||v.id.startsWith('coronal');
  const axial=through([brainLandmarks.ttpLeft,brainLandmarks.ttpRight,brainLandmarks.ttpAnterior].map(vec));
  q.normal.copy(coronal?new Vector3(1,0,0).cross(axial).normalize():new Vector3(1,0,0));q.extent=1.4;
  q.note+=' 뇌량·충부의 개별 분할 모델은 없으므로 정중면·관상 수준의 위치만 참고합니다.';
 }else if(v.id==='placental-insertion'){
  q.center.set(0,.65,-1.315);q.normal.set(1,0,0);q.extent=1.5;q.landmarks=[q.center.clone()];q.anchorNames=['합성 자궁 장면의 태반측 제대 연결점'];
 }else if(v.id==='rnt'){q.center.set(0,1.24,.72);q.normal.set(0,.18,1).normalize();q.extent=1.1;q.note+=' 외형 얼굴의 교육용 위치입니다. 모델에 RNT 뼈 경계가 분할되어 있지 않습니다.';
 }else if(v.id==='conus'){q.normal.set(1,0,0);q.note+=' 현재 골격에는 척수원뿔 분할이 없어 척추 시상면만 표시합니다. 실제 종료 위치는 참고 초음파로 학습하세요.';}
 if(q.normal.lengthSq()<.9)throw new Error('Degenerate extended plane: '+v.id);
 return q;
}
