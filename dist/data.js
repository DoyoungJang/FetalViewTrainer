import {planeReferences} from './planes.js?v=29';
import {standards} from './standards-data.js?v=29';
export const sources=[
['ISUOG · 1분기 (2023)','https://www.isuog.org/static/a8d6dee2-38d8-4d66-8be3929af48e8369/Updated-ISUOG-Practice-Guidelines-performance-of-11-14-week-ultrasound-scan.pdf'],
['ISUOG · 2분기 (2022)','https://www.isuog.org/resource/isuog-practice-guidelines-updated-performance-of-the-routine-mid-trimester-fetal-ultrasound-scan.html'],
['ISUOG · 3분기 (2024)','https://www.isuog.org/resource/isuog-practice-guidelines-performance-of-third-trimester-obstetric.html'],
['AIUM · 표준 산과 검사 (2024)','https://onlinelibrary.wiley.com/doi/10.1002/jum.16406'],...planeReferences];
// Original concise teaching summaries. All images are schematic, not clinical data.
const v=(id,title,en,type,y,checks,tip,question,options,answer=0)=>({id,title,en,type,y,checks,tip,question,options,answer});
const head=v('hc','머리둘레 · 양두정경','Transthalamic plane · HC / BPD','head',1.35,['대칭적인 머리 횡단면에서 정중선·시상·투명중격강(CSP)을 확인합니다.','소뇌가 보이지 않는 높이를 선택합니다.','HC는 두개골 바깥 윤곽을 따릅니다. BPD 캘리퍼 방식은 사용 차트와 일치시킵니다.'],'비스듬한 단면과 두피를 포함한 계측을 피하세요.','HC를 측정할 때 따르는 경계는?',['두개골 바깥 윤곽','두피의 가장 바깥 경계','측뇌실 안쪽 경계']);
const ac=v('ac','복부둘레','Abdominal circumference · AC','abdomen',-.35,['위와 제대정맥–문맥동 부위가 보이는 횡단면을 잡습니다.','복부가 둥글고 늑골이 대칭적인지 확인합니다.','피부 바깥 경계를 따라 둘레를 측정합니다.'],'신장이 함께 보이는 낮은 단면이나 사선 절단은 피하세요.','AC 단면의 주요 기준 구조는?',['위와 문맥동','양측 안와','소뇌와 대조']);
const fl=v('fl','대퇴골 길이','Femoral diaphysis · FL','femur',-1.15,['골화된 대퇴골 간부 전체를 길게 펼쳐 보입니다.','골간부 양 끝을 측정하고 골단은 제외합니다.','단축되어 보이는 사선 영상을 피합니다.'],'뼈 끝의 반사 인공물까지 길이에 포함하지 마세요.','FL 측정에 포함되는 것은?',['골화된 골간부','원위 골단을 포함한 전체','주변 연부조직']);
const four=v('4ch','심장 사강 단면','Four-chamber view · 4CH','heart',.25,['좌우 방향과 심장 위치를 먼저 확인합니다.','두 심방·두 심실의 균형, 중격과 방실판을 관찰합니다.','사강 단면 다음에는 유출로 및 대혈관 단면을 이어 봅니다.'],'사강 단면만으로 심장 선별검사를 완료할 수 없습니다.','사강 단면 이후에도 필요한 관찰은?',['유출로와 대혈관','심장은 더 볼 필요 없음','대퇴골만 관찰']);
export const phases=[
{title:'1분기',range:'11–14주 중심',desc:'초기 형태와 정중시상면을 이해합니다. 검사 범위는 CRL·NT에만 한정되지 않습니다.',lessons:[
v('crl','머리엉덩길이','Midsagittal view · CRL','profile',.3,['태아 전체의 정중시상면을 확보합니다.','중립 자세에서 머리 끝과 엉덩이 끝을 확인합니다.','충분히 확대하고 두 끝 사이 직선 거리를 측정합니다.'],'굴곡·과신전 자세에서는 기준 길이가 달라질 수 있습니다.','CRL에 적절한 자세는?',['중립 자세','최대로 구부린 자세','목을 최대로 젖힌 자세']),
v('nt','목덜미 투명대','Midsagittal view · NT','nt',1.1,['정중시상면에서 머리와 상흉부를 확대합니다.','피부와 양막을 구분하고 가장 넓은 투명대를 찾습니다.','중립 목 자세에서 경계 안쪽–안쪽으로 측정합니다.'],'NT 선별검사는 정해진 CRL 범위(45–84 mm)와 교육·품질 관리가 필요합니다.','NT를 측정하기 전 구분해야 할 것은?',['태아 피부와 양막','대퇴골과 상완골','태반과 방광']),
v('earlybrain','두개골 · 뇌','Axial cranial view','earlybrain',1.4,['두개골 윤곽과 정중선의 형성을 봅니다.','맥락총의 양측 나비 모양을 확인합니다.','초기 뇌 구조는 2분기 영상과 다르게 보임을 이해합니다.'],'초기 정상 소견이 이후 모든 뇌 이상을 배제하지 않습니다.','초기 뇌의 특징적인 구조는?',['양측 맥락총','완성된 피질 고랑','대퇴골 골단']),
v('earlyabd','복벽 · 위','Transverse abdomen','abdomen',-.35,['위의 위치와 복벽의 연속성을 확인합니다.','제대가 복벽에 연결되는 부위를 확인합니다.','주수에 따른 정상 발달을 고려하여 평가합니다.'],'복벽과 제대 삽입부는 여러 방향에서 확인합니다.','복벽 평가에서 함께 볼 구조는?',['제대 삽입부','안와','대조']),
v('bladder1','방광 · 사지','Pelvis and limbs overview','pelvis',-.85,['골반 내 방광을 확인합니다.','상지·하지 각 분절과 손·발의 존재를 봅니다.','한 장면에 모든 사지가 보이지 않으면 연속 탐색합니다.'],'이 모식도는 골반 단면입니다. 사지 평가는 별도의 여러 단면이 필요합니다.','사지의 기본 평가 방법은?',['여러 단면에서 각 분절 확인','한 단면으로 네 사지 모두 판정','방광만 보고 사지 추정'])]},
{title:'2분기',range:'통상 18–24주',desc:'체계적인 해부학 검사에서 사용하는 핵심 표준 단면을 학습합니다.',lessons:[head,
v('vent','측뇌실 단면','Transventricular plane','ventricle',1.6,['정중선과 양측 대뇌반구를 관찰합니다.','측뇌실 심방과 맥락총의 관계를 확인합니다.','심방 폭은 내벽–내벽 사이를 뇌실 장축에 수직으로 측정합니다.'],'비스듬한 캘리퍼 배치는 뇌실 폭을 과대평가할 수 있습니다.','측뇌실 심방 폭의 캘리퍼 위치는?',['내벽–내벽','외벽–외벽','두피–두피']),
v('cereb','소뇌 단면','Transcerebellar plane','cerebellum',1.15,['소뇌 양측 반구와 후두와를 관찰합니다.','대조와 주변 구조를 확인합니다.','적절한 후방 경사로 소뇌가 보이는 단면을 확보합니다.'],'과도한 기울기는 후두와 구조를 왜곡합니다.','이 단면의 핵심 구조는?',['소뇌와 대조','위와 문맥동','방광과 신장']),
four,
v('lvot','좌심실 유출로','Left ventricular outflow tract','lvot',.4,['좌심실에서 나오는 대동맥을 추적합니다.','심실중격과 대동맥 전벽의 연결을 확인합니다.','유출로는 사강 단면에서 탐촉자 각도를 조절하여 관찰합니다.'],'정적인 그림만으로 판막 운동이나 연결 관계를 판정할 수 없습니다.','좌심실에서 직접 나오는 대혈관은?',['대동맥','폐동맥','상대정맥']),
v('rvot','우심실 유출로','Right ventricular outflow tract','rvot',.55,['우심실에서 나오는 폐동맥을 추적합니다.','주폐동맥의 분지와 대혈관의 교차 관계를 관찰합니다.','좌심실 유출로와 함께 연속적으로 확인합니다.'],'두 유출로가 평행하게 보이는지 여부는 여러 단면에서 평가합니다.','우심실 유출로의 혈관은?',['폐동맥','대동맥','제대정맥']),
v('3vt','삼혈관 · 기관 단면','Three-vessel and trachea view','vessels',.75,['상흉부 횡단면에서 대혈관과 기관의 관계를 봅니다.','혈관 수·상대 크기·배열을 확인합니다.','대동맥궁·동맥관궁과 기관의 관계를 관찰합니다.'],'AIUM은 기술적으로 가능한 경우 3V·3VT 관찰을 포함합니다.','혈관과 함께 위치를 확인할 구조는?',['기관','방광','대퇴골']),ac,fl,
v('kidneys','신장 · 방광','Renal and pelvic views','kidneys',-.6,['양측 신장의 존재와 위치를 확인합니다.','신장 집합계와 주변 구조를 관찰합니다.','골반으로 이동하여 방광을 별도 확인합니다.'],'신장 단면과 방광 단면은 동일한 높이가 아닙니다.','방광을 보려면 신장 단면에서 어디로 이동하나요?',['골반 쪽','머리 쪽','항상 같은 높이']),
v('spine','척추','Longitudinal spine','spine',0,['경추에서 천추까지 연속성을 확인합니다.','종단면과 횡단면을 함께 탐색합니다.','척추를 덮는 피부의 연속성을 봅니다.'],'뼈만 보고 피부 평가를 생략하지 마세요.','척추 평가에 적절한 접근은?',['여러 단면과 피부 연속성 확인','한 개 척추뼈만 확인','두개골만 확인']),
v('face','얼굴 · 상순','Coronal face and profile','face',1.3,['관상면에서 상순의 연속성을 확인합니다.','정중시상면에서 옆얼굴을 관찰합니다.','얼굴 앞의 손과 제대가 시야를 가리는지 확인합니다.'],'상순 단면 하나로 모든 구개 이상을 배제할 수 없습니다.','상순 관찰의 주요 방향은?',['관상면','대퇴골 장축','복부 횡단면'])]},
{title:'3분기',range:'28주 이후 · 적응증별',desc:'성장 평가와 재관찰을 위한 단면입니다. 일률적인 검사 시점을 뜻하지 않습니다.',lessons:[head,ac,fl,four,
v('brain3','뇌 · 측뇌실 재평가','Third-trimester brain review','ventricle',1.6,['이전 검사와 비교해 뇌 구조를 재관찰합니다.','측뇌실과 후두와를 가능한 범위에서 확인합니다.','태위·골화에 따른 관찰 제한을 기록합니다.'],'후기에는 음영과 태위로 관찰이 제한될 수 있습니다.','관찰이 불충분한 경우 필요한 것은?',['제한 사항 기록 및 적절한 후속 평가','정상으로 단정','이전 기록 삭제']),
v('renal3','신장 · 방광 재평가','Third-trimester urinary tract','kidneys',-.6,['양측 신장과 방광을 재관찰합니다.','이전 소견의 변화 여부를 확인합니다.','양수량 등 다른 검사 결과와 함께 평가합니다.'],'성장·태반 위치·양수·태위 평가도 필요하며, 이 단면 모듈만으로 전체 검사가 완료되지 않습니다.','3분기 검사에 함께 필요한 평가는?',['양수·태반·태위·성장','신장 하나만','외부 얼굴만'])]}
];

// All 38 document classes; temporal cardiac labels share anatomical geometry.
const catalog=[
 ['hc','시상 단면 · BPD/HC','head',1.35],['vent','측뇌실 단면','ventricle',1.6],['cereb','소뇌 · 후두와 단면','cerebellum',1.15],
 ['face','코 · 상순','face',1.3],['orbit','양측 안와','orbit',1.5],['facialprofile','얼굴 옆모습','facialprofile',1.4],
 ['4ch','심장 사강 · 이완기 초기','heart',.25],['4ch-ed','심장 사강 · 이완기 말','heart',.25],['4ch-es','심장 사강 · 수축기 말','heart',.25],
 ['lvot','좌심실 유출로 · 수축기','lvot',.4],['lvot-ed','좌심실 유출로 · 이완기 말','lvot',.4],['rvot','우심실 유출로 · 수축기','rvot',.55],['rvot-ed','우심실 유출로 · 이완기 말','rvot',.55],
 ['3vv-pa','삼혈관 · 폐동맥 측정면','threevpa',.56],['3vv','삼혈관 단면','threev',.59],['3vt','삼혈관 · 기관 단면','vessels',.65],
 ['aoarch','대동맥궁','aoarch',.56],['ductarch','동맥관궁','ductarch',.56],['bicaval','양대정맥','bicaval',.3],
 ['ac','복부 · 복부둘레','abdomen',-.35],['cord','태아 복벽 제대 삽입부','cord',-.3],['diaphragm','횡격막','diaphragm',-.1],
 ['kidneys','신장 · 횡단면','kidneys',-.6],['kidney-sag','신장 · 시상면','kidneysag',-.6],['kidney-cor','신장 · 관상면','kidneycor',-.6],['bladder','방광','pelvis',-.85],
 ['spine','척추','spine',0],['fl','대퇴골','femur',-1.15],['tibia','경골 · 비골','tibia',-.7],['foot','발','foot',-.9],['humerus','상완골','humerus',.3],['forearm','요골 · 척골','forearm',.25],['hand','손','hand',.3],
 ['genitalia','외부 생식기','genitalia',-.95],['placenta','태반','placenta',0],['cervix','자궁경부','cervix',-1.5],['crl','머리엉덩길이','profile',.3],['nt','목덜미 투명대','nt',1.1]
];
const groups=['머리 · 뇌','얼굴','심장','복부 · 비뇨기','척추 · 사지','생식기 · 태반 · 자궁경부','1분기 전용'];
for(let p=0;p<phases.length;p++){
 const previous=phases[p].lessons;
 phases[p].lessons=standards.flatMap((doc,i)=>{
  if(p>0&&doc.number>=37||p===0&&[15,24,28].includes(doc.number))return [];
  const quality=doc.blocks[`${p+1}분기`]||doc.blocks['공통'];if(!quality)return [];
  const [id,title,type,y]=catalog[i],old=previous.find(v=>v.id===id);
  const group=groups[i<3?0:i<6?1:i<19?2:i<26?3:i<33?4:i<36?5:6];
  const temporal=doc.number>=7&&doc.number<=13;
  return [{...old,id,title,en:doc.name,type:p===0&&type==='ventricle'?'earlybrain':type,y,group,trimester:p+1,documentNumber:doc.number,quality,scope:doc.scope,memo:doc.memo,temporal,
   checks:[quality.best,quality.acceptable,doc.memo],tip:doc.memo,
   question:temporal?'이 항목의 심장 주기 판정에 필요한 자료는?':'Acceptable 판정에서 반드시 충족해야 하는 조건은?',
   options:temporal?['Cine와 인접 프레임으로 시점 확인','정지 3D 모양만으로 판정','단면 이름만으로 판정']:['필수 구조가 보이고 판단·측정에 의미 있는 편향이 없음','필수 구조가 빠져도 화면이 밝으면 됨','심한 단축이 있어도 이름이 같으면 됨'],answer:0}];
 });
 phases[p].desc='첨부 문서의 분기별 기준을 수록했습니다. 상세·표적·적응증 항목은 모든 임신의 필수 검사라는 뜻이 아닙니다.';
}
sources.push(['ISUOG · 자궁경부 / 조산 예측 (2022)','https://www.isuog.org/static/e45c9342-359c-4c5b-86fb71d52562303b/ultrasound-in-preterm-birth.pdf']);

sources.push(['제공 문서 · Standard Plane Best / Acceptable 상세 기준 38항목','./standards.json']);
