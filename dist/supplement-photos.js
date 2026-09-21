import {supplementFigures} from './supplement-figures.js?v=47';
import {ultrasoundFor} from './ultrasound.js?v=47';
// Fractions select caption-verified panels without rotating or relabelling anatomy.
const image=(key,title,box=[0,0,1,1],note='')=>{
 const r=supplementFigures[key],[w,h]=r.size;
 const [x,y,rw,rh]=box.map((v,i)=>Math.round(v*(i%2?h:w)));
 return {...r,title:title||r.title,region:[x,y,Math.min(rw,w-x),Math.min(rh,h-y)],note};
};
export function supplementPhotos(m,t){
 const byId={
  'low-sax':[image('low')], 'high-sax':[image('high')],
  'pulmonary-veins':[image(t===3?'pv3':'pv2'),image('pw','G: 폐정맥 PW',[0,.68,.32,.32],'주수 미기재 · 파형 획득 방법 참고')],
  'orthogonal-4cv':[image('orthogonal','A: 심첨 접근 4CV',[0,0,.495,1]),image('orthogonal','B: 중격을 보는 직교 접근',[.505,0,.495,1])],
  'pa-bifurcation':[image('pa')],
  'uv-pw':[image('pw','I: 제대동맥·제대정맥 동시 PW',[.667,.68,.333,.32],'연속적인 UV와 박동성 UA가 함께 있는 원본입니다. UA 파형을 UV로 읽지 않습니다.')],
  'rhythm':[image('rhythm','F: 심방·심실 M-mode',[.507,.66,.493,.34]),image('rhythm','A: SVC–Ao 동시 PW',[0,0,.493,.305]),image('rhythm','B: LV 유입–유출 동시 PW',[0,.315,.493,.332])],
  'brain-coronal':[
   image('coronal','a: Transfrontal · 경전두',[0,0,.233,.34]),image('coronal','b: Transcaudate · 경미상',[.245,0,.263,.34]),
   image('coronal','c: Coronal transthalamic · 경시상 관상',[.518,0,.247,.34]),image('coronal','d: Coronal transcerebellar · 경소뇌 관상',[.78,0,.22,.34])],
  'brain-sagittal':[image('sagittal','a: 전방 정중시상면',[0,0,.473,.448]),image('posterior','후방 정중시상면',[0,.54,1,.46]),image('sagittal','b: 방시상면 · 좌우에 같은 획득법 적용',[.504,0,.496,.448],'원문에 좌우 측 표기가 없어 한쪽을 임의로 지정하지 않습니다.')],
  'oral-ears':[image('palate')],
  'target-abdomen':[image('gallbladder'),image('adrenals'),image('spleen'),image('renal-arteries')],
  'placental-insertion':[image('insertion')],
  'fluid':[image('dvp')],
  'vasa-previa':[image('vasa',null,undefined,'전치혈관의 이상 소견 예시입니다. 정상 자궁경부 사진이 아닙니다.')],
  'pas':[image('pas',null,undefined,'PAS의 이상 소견 예시입니다. 정상 태반 사진이 아닙니다.')],
  'chorionicity':[image('twins','a: Lambda sign · DCDA',[0,0,.495,1]),image('twins','b: T sign · MCDA',[.505,0,.495,1])]
 };
 let result=(byId[m.id]||[]).filter(r=>!r.trimester||r.trimester===t);
 // Early rhythm teaching avoids importing unspecified-age PW examples.
 if(m.id==='rhythm'&&t===1)result=[];
 const reused={situs:{type:'abdomen'},'rnt-gap':{type:'face'},'spinal-conus':{type:'spine',direction:'axial'}}[m.id];
 if(reused){const r=ultrasoundFor({...reused,trimester:t});if(r)result.push({...r,title:r.panel,rights:r.license,note:m.id==='situs'?'복부 구조물 위치 참고 · 태아 좌우와 IVC를 이 한 장만으로 모두 확정하지 않습니다.':m.id==='spinal-conus'?'척추 횡단면 참고 · 척수원추 전용 영상은 아닙니다.':''});}
 return result;
}
