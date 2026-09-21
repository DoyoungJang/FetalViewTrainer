import {trimesterFigures} from './trimester-figures.js?v=39';
// Every entry is reviewed against a figure caption and, for PDF assets, the rendered page.
// Missing entries intentionally do not fall back to a different trimester.
const pick=(key,panel,region,extra={})=>({key,panel,region,...extra});
const w=(n,panel,region,extra)=>pick('wapm-first:F'+n,panel,region,extra);
const t=(n,panel,region,extra)=>pick('third-trimester:F'+n,panel,region,extra);
export const trimesterPanels={
 1:{
  head:pick('PMC12705710:Fig1a','c: 경시상 축상 단면 · Transthalamic axial view (TTP/BPD/HC)',[458,0,227,229]),
  diaphragm:pick('PMC12705710:Fig1b','p: 양측 횡격막 시상면 · Bilateral diaphragmatic sagittal view',[0,228,230,229]),
  threevpa:pick('PMC3784141:F13','B: 13주 3VV의 주폐동맥(MPA) 참고 · PA 직경 캘리퍼 없는 해부학 영상',[236,3,224,216],{age:'1분기 13주 · 캡션 명시'}),
  earlybrain:w(1,'1분기 측뇌실·맥락총 횡단면 — 초기 뇌 발달 형태'),
  orbit:w(4,'양측 안와·수정체 횡단면 · Axial orbits'),
  facialprofile:pick('PMC8306830:F5','a: 얼굴 정중시상면 · 13주',[7,7,413,322]),
  heart:w(6,'a: 심장 사강 단면 · 4CV',[0,0,500,400]),
  lvot:pick('PMC8597369:F2','A: 좌심실 유출로 · LVOT',[0,0,383,238]),
  rvot:pick('PMC8597369:F2','C: 우심실 유출로·폐동맥 분지 · RVOT',[0,244,382,223]),
  profile:pick('PMC8597369:F1','A: 머리엉덩길이 · Crown–rump length',[0,0,323,232]),
  vessels:w(7,'3VT · 기관과 두 궁의 V자 합류'),
  abdomen:w(9,'위가 보이는 복부 횡단면 · AC 측정용 캘리퍼 없는 해부학 예시'),
  cord:w(8,'복벽 제대 삽입부 횡단면 · Abdominal cord insertion'),
  kidneycor:w(11,'양측 신장 관상면 · Coronal kidneys'),
  pelvis:w(10,'방광·양측 제대동맥 횡단면'),
  spine:w(3,'a: 척추 정중시상면',[0,0,495,317]),
  tibia:w(13,'a: 하퇴와 발의 정렬 · 뼈 길이 계측용 예시 아님',[0,0,503,442]),
  humerus:w(13,'b: 상완골과 팔꿈치 · 상지 장축',[525,0,485,442]),
  forearm:w(13,'b: 전완부와 손의 정렬 · Forearm',[525,0,485,442]),
  hand:pick('PMC8306830:F5','c: 다섯 손가락 · Hand · 13주',[37,367,354,296]),
  foot:pick('PMC8306830:F5','d: 발바닥면 · Foot · 13주',[512,366,237,292]),
  genitalia:pick('PMC9633498:Fig4','13주 여성 태아 생식결절의 정중시상면',null,{age:'1분기 13주 · 캡션 명시'}),
  placenta:pick('PMC2747450:F0002','11주 전벽 태반의 위치',null,{age:'1분기 11주 · 원문 명시'}),
  nt:pick('PMC11107467:F2','정중시상면의 정상 NT · 1분기',null,{age:'1분기 · 원문 NT 검사 예시'})
 },
 3:{
  head:t(12,'머리둘레 HC · Transthalamic plane',null,{age:'3분기 33주 2일 · 영상 내 표기'}),
  ventricle:t(1,'a: 정상 측뇌실·뇌 횡단면 · 병적 b·c 패널 제외',[0,0,1000,836]),
  cerebellum:pick('cerebellum-third:F1','소뇌 횡단면 · TCD 측정 · 37주'),
  heart:pick('Soltan2025:F1','4CV · 정상 심장 사강 단면 · 29주',null,{age:'3분기 29주 · 캡션 명시'}),
  lvot:t(2,'c: 좌심실 유출로 · LVOT',[1338,0,642,725]),
  vessels:t(2,'b: 삼혈관·기관 단면 · 3VT',[702,0,607,725]),
  threev:pick('Soltan2025:F8','왼쪽: 3VV · PA, Ao, SVC · 29주',[0,0,341,342],{age:'3분기 29주 · 캡션 명시'}),
  threevpa:pick('Soltan2025:F8','오른쪽: 3VV의 PA·Ao 직경 측정 · 29주',[344,0,341,342],{age:'3분기 29주 · 캡션 명시'}),
  abdomen:t(13,'복부둘레 AC · 위와 제대정맥을 포함한 횡단면'),
  diaphragm:t(4,'왼쪽 패널: 횡격막 종단면',[0,0,1485,2114]),
  kidneysag:t(6,'a: 정상 신장 종단면 · 수신증 b 패널 제외',[0,0,1260,1431]),
  femur:t(14,'대퇴골 골간 장축 · Femur length'),
  genitalia:pick('PMC9633498:Fig3','여성 외부 생식기 · 30주 4일',null,{age:'3분기 30주 4일 · 캡션 명시'})
 }
};
export function trimesterUltrasound(v,legacyFigures){
 let selected=trimesterPanels[v.trimester]?.[v.type];
 if(v.trimester===3&&v.type==='heart'&&['4ch-ed','4ch-es'].includes(v.id)){
  const ed=v.id==='4ch-ed';selected=pick('Soltan2025:F'+(ed?2:3),(ed?'a: 4CV 이완 말기 · End-diastole · 28주':'a: 4CV 수축 말기 · End-systole · 29주'),[0,0,342,341],{age:ed?'3분기 28주 · 캡션 명시':'3분기 29주 · 캡션 명시',phaseVerified:true});
 }
 if(!selected)return null;
 const ref=trimesterFigures[selected.key]||legacyFigures[selected.key];
 return {...ref,...selected,trimester:v.trimester,ageMatched:true,region:selected.region||[0,0,...ref.size]};
}
export function unmatchedReference(v){
 if(v.trimester===1&&['aoarch','bicaval'].includes(v.type))return {url:'https://doi.org/10.1002/uog.29186',label:v.type==='aoarch'?'보충 Figure S5a–b · 1분기 대동맥궁 장축':'보충 Figure S6a · 1분기 정상 양대정맥 시상면',reason:'1분기 단면이 설명된 보충자료를 찾았습니다. 이미지 재게시 허가는 확인되지 않아 원문으로 연결합니다.'};
 if(v.trimester===1&&v.type==='cervix')return {url:'https://doi.org/10.1111/aogs.14138',label:'Figure 1 · 1분기 질식 자궁경부 길이 측정',reason:'11–13+6주 연구의 자궁경부 영상을 찾았습니다. 재게시 허가는 확인되지 않아 원문으로 연결합니다. 연구 예시이며 1분기 일괄 선별검사 권고를 뜻하지 않습니다.'};
 if(v.trimester===1&&['head','face','rvot','profile'].includes(v.type))return {url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11444747/',label:({head:'Figure 2 · 12주 3일 HC/BPD',face:'Figure 7 · 12주 3일 얼굴 단면',rvot:'Figure 17e · 12주 3일 RVOT',profile:'Figure 1 · 12주 3일 CRL'}[v.type]),reason:'주수·단면이 맞는 원문은 확인했지만, 이미지 재게시 허가는 확인되지 않아 원문으로 연결합니다.'};
 if(v.trimester===1&&v.type==='cerebellum')return {url:'https://doi.org/10.1080/01443615.2024.2361848',label:'1분기 신경초음파 · 소뇌 횡단면 원문',reason:'1분기 소뇌 단면 논문을 확인했지만, 원본 그림 파일을 확보하지 못했습니다.'};
 return null;
}
