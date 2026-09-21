import {directionFigures} from './direction-figures.js?v=45';

const pick=(key,panel,region,extra={})=>({...directionFigures[key],key,panel,region,...extra});
export function kidneyThirdImage(direction){
 return pick('UTD2014:F1',direction==='axial'?'A: 정상 신장·신우 횡단면 · 32주':'B: 정상 신장 시상면 · 32주',direction==='axial'?[0,0,702,527]:[716,0,702,527]);
}
export function directionUltrasound(v){
 const d=v.direction;
 if(v.trimester===3){
  if(['kidneys','kidneysag','kidneycor'].includes(v.type)&&['axial','sagittal'].includes(d))return kidneyThirdImage(d);
  if(['head','cerebellum'].includes(v.type)&&d==='sagittal')return pick('PMC9224903:F12','B: 정상 뇌 정중시상면 · 뇌량·뇌간·소뇌 충부 · 28주',[1084,26,1010,820],{trimester:3,ageMatched:true,age:'3분기 28주 · 원문 캡션과 영상 내 표기',referenceNote:'정중 구조의 관계를 보는 영상입니다. 소뇌 충부의 확대 계측 전용 영상은 아닙니다. 표본 A와 이상 사례 D–F는 제외했습니다.'});
  return null;
 }
 if(v.trimester!==2)return null;
 const entries={
  'orbit:coronal':['PMC5029995:F7','양측 안와·수정체 관상면 · Coronal orbits',[537,0,529,377]],
  'head:sagittal':['PMC5029995:F5','뇌량·CSP 정중시상면 · Midsagittal brain',[540,0,526,388]],
  'cerebellum:coronal':['PMC5029995:F6','소뇌 반구·충부 관상면 · Coronal cerebellum',[531,0,537,415]],
  'face:axial':['PMC5029995:F10','상순·구개 횡단면 · Transverse upper lip and palate',[535,0,523,422]],
  'abdomen:coronal':['PMC5029995:F15','흉복부 관상면 · 위·심장·횡격막의 위치',[540,0,526,394]],
  'diaphragm:coronal':['PMC5029995:F15','흉복부 관상면의 횡격막 · Coronal situs',[540,0,526,394],{referenceNote:'위·심장 사이의 횡격막과 장기 배열 참고입니다. 양측 횡격막 전체의 연속성을 한 프레임에서 증명하는 영상은 아닙니다.'}],
  'spine:axial':['PMC9849725:F2C','C: 정상 요추 횡단면 · vertebral body와 양측 pedicles',[0,0,719,591]],
  'spine:coronal':['PMC9849725:F4C','C: 정상 요천추 관상면 · 세 줄 골화 중심',[0,0,580,365]],
  'head:coronal':['PMC9224903:F13','A: 정상 뇌 경시상 관상면 · CC·CSP·전두각',[33,26,1107,912],{trimester:2,ageMatched:true,age:'2분기 24주 · 원문 캡션 명시',referenceNote:'정상 A 패널만 표시합니다. 나머지 뇌량 발달 이상 사례는 제외했습니다.'}],
  'ventricle:coronal':['PMC9224903:F13','A: 정상 양측 측뇌실 전두각 관상면 · 24주',[33,26,1107,912],{trimester:2,ageMatched:true,age:'2분기 24주 · 원문 캡션 명시',referenceNote:'전두각(AH)과 CC·CSP의 관계입니다. 측뇌실 후방 심방부 또는 맥락총 계측면은 아닙니다.'}]
 };
 const entry=entries[v.type+':'+d];return entry?pick(...entry):null;
}
