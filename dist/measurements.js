import {renderDoppler} from './doppler.js?v=44';
import {supplementaryFor} from './supplementary-measurements.js?v=44';
// Educational measurement guidance. No patient measurements or automatic diagnoses.
const refs={
 ctr:['태아 심초음파 가이드라인 · 심흉 면적비','https://doi.org/10.1111/ped.12467'],
 shortcervix:['SMFM Consult #70 · 단경부 정의','https://publications.smfm.org/publications/560-society-for-maternal-fetal-medicine-consult-series-70/'],
 foot:['태아 발 길이 계측 연구','https://pmc.ncbi.nlm.nih.gov/articles/PMC5399981/'],
 orbit:['태아 안와 거리 계측 연구','https://pubmed.ncbi.nlm.nih.gov/7709212/'],
 first:['ISUOG 2023 · 11–14주','https://doi.org/10.1002/uog.26106'],
 mid:['ISUOG 2022 · 중기 검사','https://doi.org/10.1002/uog.24888'],
 late:['ISUOG 2024 · 후기 검사','https://doi.org/10.1002/uog.27538'],
 growth:['ISUOG 2019 · 생체계측','https://doi.org/10.1002/uog.20272'],
 cns:['ISUOG 2020 · 뇌 계측','https://doi.org/10.1002/uog.22145'],
 soft:['SMFM Consult #57 · NF·신우 기준','https://doi.org/10.1016/j.ajog.2021.06.079'],
 echo:['ASE 2023 · 태아 심초음파 계측','https://www.asecho.org/wp-content/uploads/2023/07/PIIS0894731723002067-1.pdf'],
 heart:['ISUOG 2023 · 심장 선별검사','https://doi.org/10.1002/uog.26224'],
 annulus:['태아 판륜·궁 내경 측정 연구 · 2023','https://doi.org/10.3389/fcvm.2023.1279453'],
 utd:['UTD 합의문 · 2024','https://pmc.ncbi.nlm.nih.gov/articles/PMC11726877/'],
 cervix:['ISUOG 2022 · 자궁경부','https://doi.org/10.1002/uog.26020'],
 bladder:['ISUOG · 초기 거대방광','https://www.isuog.org/clinical-resources/patient-information-series/patient-information-pregnancy-conditions/renal-system/fetal-megacystisis.html'],
 tcd:['TCD Outer-to-Outer 측정 연구','https://pmc.ncbi.nlm.nih.gov/articles/PMC11040476/']
};
const M=(name,role,weeks,placement,interpretation,sources)=>({name,role,weeks,placement,interpretation,sources});
const NO=(name,weeks,assessment,note,sources=['mid','late'])=>M(name,'형태 평가 중심',weeks,assessment,note,sources);
const weekBand=t=>t===1?'11–14주':t===2?'중기 · 보통 18–24주 해부학 검사':'28주 이후 · 검사 적응증에 따라';
const chart='고정된 mm 정상값 대신 측정법이 일치하는 주수별 성장곡선의 백분위수 또는 Z-score로 해석합니다.';
const head=t=>[
 M('BPD · 양두정골 직경',t===1?'주수·크기 평가 보조':'기본 생체계측',t===1?'11–14주 · CRL과 함께':weekBand(t),'대칭적인 축상면에서 정중선에 수직인 양두정골 직경을 잽니다. Outer-to-Outer 또는 근위 Outer-to-원위 Inner 중 사용한 성장곡선과 동일한 방식을 선택합니다.','두 방식의 값을 섞지 않습니다. '+chart,['growth','first']),
 M('HC · 머리둘레',t===1?'주수·크기 평가 보조':'기본 생체계측',weekBand(t),'올바른 머리 축상면에서 두개골 외측 윤곽을 따라 타원(Ellipse)을 놓습니다. 두피 연조직까지 넓히지 않습니다.','두개골이 눌리거나 비스듬한 면을 피합니다. '+chart,['growth','cns'])
];
const atrium=t=>t===1?[NO('측뇌실·맥락총',weekBand(t),'대뇌낫과 양측 맥락총·뇌실의 대칭을 관찰합니다. 후기 심방 폭 캘리퍼를 억지로 적용하지 않습니다.','1분기에 후기의 10 mm 기준을 대입하지 않습니다.',['first'])]:[
 M('Atrial width · 측뇌실 심방 폭','CNS 선별 계측','15주 이후 · 중기 및 후기','맥락총 사구(Glomus) 높이에서 뇌실 장축에 수직으로 내측 벽–내측 벽(Inner-to-Inner)을 잽니다. 뚜렷한 원위 뇌실을 확인하고 필요시 반대쪽 접근으로 양측을 평가합니다.','일반 기준은 10 mm 미만입니다. 10 mm 이상이면 정확한 단면에서 재확인하고 정밀 평가가 필요하며, 한 수치만으로 원인을 결정하지 않습니다.',['cns'])
];
function cerebellum(t){
 if(t===1)return [NO('초기 소뇌·후두와',weekBand(t),'초기 소뇌, 제4뇌실과 후두와 관계를 우선 관찰합니다. 별도 초기 연구·정밀 프로토콜 없이 후기 TCD·CM 기준을 적용하지 않습니다.','CM 2–10 mm 및 NF 6 mm 기준은 1분기용이 아닙니다. NT는 정중시상면에서 별도로 측정합니다.',['first','cns'])];
 const rows=[M('TCD · 가로 소뇌 직경','CNS 선별 계측',t===2?'중기 · 해당 주수의 TCD 참고치 사용':'28주 이후 · 성장·형태 재평가','양측 소뇌반구의 가장 바깥 경계(Outer-to-Outer)를 잇는 최대 횡경을 잽니다. 정중선에 수직인 해부학적 횡축을 기준으로 하며 화면 수평을 강제하지 않습니다.',chart+' TCD만으로 이미 정한 예정일을 다시 정하지 않습니다.',['cns','tcd']),M('CM · 대조 전후경','의심 소견·기관 프로토콜에 따른 계측',t===2?'중기 · 올바른 TCP 확보 후':'후기 · 후두와 재평가 시','정중앙 충부의 가장 뒤쪽 외측 경계에서 후두골 내면(Inner border)까지 전후경을 잽니다. 후두골 두께와 피부를 포함하지 않고 사선으로 늘어난 거리를 피합니다.','표준 참고 범위 2–10 mm. 주수·머리 형태·충부 및 다른 후두와 소견을 함께 해석하며 범위를 벗어나면 단면을 재확인합니다.',['cns'])];
 rows.push(t===2?M('NF · 목덜미 주름','적용 주수 내 선별·적응증 계측','15–20주','정중선의 후두골 외측면(Outer bone margin)에서 피부 바깥선(Outer skin surface)까지 측정합니다. 뼈의 안쪽 경계에서 시작하지 않습니다.','15–20주에 6 mm 미만이 비후 기준 미만이며, 6 mm 이상은 두꺼운 NF 기준입니다. 단독 진단값이 아니며 NT와 다릅니다. 이 기준을 20주 이후에 자동 적용하지 않습니다.',['soft']):NO('NF · 후기 적용 제한','28주 이후','후기에는 중기 NF 캘리퍼와 6 mm 기준을 일률적으로 반복 적용하지 않습니다.','목덜미 이상이 의심되면 피부·연조직을 표적 평가합니다.',['soft','late']));return rows;
}
const longBone=(name,t,routine=false)=>[M(name,routine?'기본 생체계측':'필요시 추가 계측',weekBand(t),'각 뼈를 따로 식별하고 최장축에서 골화된 골간(Diaphysis)의 양끝을 잇습니다. 연골성 끝부분·골단을 포함하지 않으며 양끝이 선명한 단면에서 측정합니다.',t===1?'초기에는 존재·형태를 우선 확인하고, 계측 시 1분기용 참고치가 있는 경우에만 해석합니다.':chart,['growth','mid','first'])];
const renal=t=>t===1?[NO('초기 신장·신우',weekBand(t),'양측 신장의 존재와 위치, 내부 형태를 우선 확인합니다.','16주 이후 UTD의 4 mm·7 mm 기준을 1분기에 적용하지 않습니다.',['first','utd'])]:[M('APRPD · 신우 전후경','신우 확장 평가',t===2?'16주–27주 6일':'28주 0일 이후','신장 횡단면에서 신우의 최대 전후 내경을 Inner-to-Inner로 잽니다. 신장 전체 길이·신배 폭·사선 대각선과 구분하며 좌우를 따로 기록합니다.',t===2?'UTD 기준에서 정상 전후경은 4 mm 미만(16–27주 6일). 신배·요관·실질·방광 소견을 함께 평가합니다.':'UTD 기준에서 정상 전후경은 7 mm 미만(28주 이후). 이전 계측과 비교하며 직경만으로 UTD 위험군을 정하지 않습니다.',['utd','soft'])];
const cardiacTypes=new Set(['heart','lvot','rvot','threevpa','threev','vessels','aoarch','ductarch','bicaval']);
function cardiac(v,t){
 const age=t===1?'11–14주 · 조기 정밀 심초음파의 적응증·가시성에 따라':t===2?'주로 18–22주 · 정밀 심초음파 시':'28주 이후 · 정밀·추적 심초음파 시';
 const z='측정부위·심장 주기·주수 범위가 일치하는 태아 참고치로 Z-score를 해석합니다. 성인 정상값을 사용하지 않습니다.';
 if(v.type==='heart'){
  const rows=[M('FHR · 심박수 및 리듬','기본 심장 평가',weekBand(t),'B-mode cine 또는 M-mode에서 동일한 심장 사건이 반복되는 한 주기의 시간 간격에 시간 캘리퍼를 놓습니다. 부정맥은 심방·심실 관계를 추가 확인합니다.','심박수는 주수와 검사 상황에 따라 해석합니다. 심박수만을 위해 불필요한 스펙트럴 도플러를 사용하지 않습니다.',['first','heart'])];
  if(v.id==='4ch-es')rows.push(M('수축 말기 심실 크기','기능 이상 시 추가 계측',age,'Cine로 수축 말기를 확인합니다. 기능 계측이 필요하면 정해진 심실 단축면/M-mode로 옮겨 동일 위치의 내강 직경을 이완 말기와 짝지어 측정합니다.','이 사강면 한 장의 면적·직경만으로 EF 또는 단축률을 계산하지 않습니다.',['echo']));
  else if(v.id==='4ch-ed')rows.push(M('이완 말기 심실 크기','비대칭·기능 이상 시 추가 계측',age,'최대 충만 후 수축 직전 프레임을 고릅니다. 길이는 참고치에 맞춰 방실판륜 평면에서 내막측 심첨까지 측정하며, 직경·벽두께가 필요하면 해당 표준 단축면으로 이동합니다.',z,['echo']));
  else rows.push(M('MV / TV annulus · 승모판·삼첨판륜','정밀 심초음파 기본 계측',age,'이완기 초기 판막 개방 시 양쪽 판엽 부착점 사이의 판륜 내경을 잽니다. 판엽 끝 사이의 열린 틈을 재지 않습니다.',z,['echo','annulus']));
  rows.push(M('CTAR · 심흉 면적비','정밀 심초음파 기본 계측',age,'전체 흉곽이 포함된 사강 횡단면에서 심장 외곽과 흉곽 외곽을 각각 추적하여 심장 면적/흉곽 면적을 구합니다. 흉곽 면적은 늑골·척추를 포함하되 피부·근육을 제외하는 방법이며, 사용한 참고치의 주기·윤곽 정의와 맞춥니다.','서로 다른 CTR 정의를 혼용하지 않습니다. 현재 선택한 프레임이 참고치의 주기와 다르면 cine에서 해당 주기를 다시 선택합니다.',['echo','ctr']));
  return rows;
 }
 if(['lvot','rvot'].includes(v.type))return [M(v.type==='lvot'?'AoV annulus · 대동맥판륜':'PV annulus · 폐동맥판륜','정밀 심초음파 기본 계측',age,'유출로 장축면에서 판엽 부착점 높이의 판륜 내경(Inner-to-Inner)을 혈류 장축에 수직으로 잽니다. 일반적으로 수축기 프레임을 사용하며 참고치가 정한 시점과 일치시킵니다.',(v.id.endsWith('-ed')?'현재 View는 이완 말기입니다. 수축기 참고치와 비교하려면 cine에서 수축기 프레임을 별도로 선택합니다. ':'')+z,['echo','annulus'])];
 const map={
 threevpa:['MPA diameter · 주폐동맥 직경','주폐동맥 분지 직전에서 장축에 수직인 내벽–내벽 직경을 수축기에 잽니다. 폐동맥판륜과 다른 측정부위입니다.'],
 threev:['PA / Ao / SVC · 대혈관 크기','선별에서는 세 혈관의 배열·상대 크기를 평가합니다. 계측이 필요하면 각 혈관을 식별하고 참고치에 정의된 위치에서 내벽–내벽 직경을 장축에 수직으로 잽니다.'],
 vessels:['Aortic isthmus / Ductus · 협부·동맥관','3VT 또는 적절한 궁 종단면에서 각각의 경로를 추적합니다. 참고치에 지정된 협부와 원위 동맥관의 내경을 수축기에 장축에 수직으로 잽니다. V자 전체 폭을 재지 않습니다.'],
 aoarch:['Aortic arch / Isthmus · 대동맥궁·협부','궁 장축면에서 분지 위치를 확인합니다. 협부는 좌쇄골하동맥 분지 이후·동맥관 합류 이전에서 내경을 장축에 수직으로 재며 참고치의 위치·주기를 따릅니다.'],
 ductarch:['Ductus arteriosus · 동맥관 직경','주폐동맥–동맥관–하행대동맥을 추적하고 참고치가 정한 원위 동맥관 내경을 수축기에 장축에 수직으로 잽니다.'],
 bicaval:['SVC / IVC · 대정맥 평가','기본적으로 두 대정맥의 우심방 연결과 흐름을 평가합니다. 특정 정맥 직경이 필요한 경우 해당 혈관·위치·주기를 정의한 정밀 프로토콜에서 내경을 장축에 수직으로 측정합니다.']
 };
 const [name,placement]=map[v.type];return [M(name,'필요시 정밀 심초음파 추가 계측',age,placement,z,['echo','annulus'])];
}
const other={
 face:t=>[NO('상순·비공의 연속성',weekBand(t),'상순 View에는 모든 태아에 적용하는 필수 길이 캘리퍼가 없습니다. 결손이 의심되면 범위·깊이를 추가 단면에서 확인합니다.','구개 평가를 상순 길이나 한 단면으로 대체하지 않습니다.')],
 orbit:t=>[M('IOD / BOD · 안와 내측·외측 간 거리','안와 간격 이상 의심 시',weekBand(t),'양측 안와가 같은 축상면에 있을 때 IOD는 두 안와의 내측 경계 사이, BOD는 양측 안와의 가장 바깥 경계 사이를 잽니다. 사용할 참고치의 경계 정의와 정확히 맞춥니다.',t===1?'초기에는 양측 안와·수정체의 존재가 우선입니다. 계측은 초기 주수용 참고치에 한합니다.':chart,['mid','first','late','orbit'])],
 facialprofile:t=>[M('NBL · 비골 길이','적응증·선별 프로토콜에 따른 추가 계측',weekBand(t),'정중시상면에서 비골을 덮는 피부와 골화된 비골을 구분하고 골화부 양끝을 따라 최대 길이를 잽니다. 사선으로 짧게 잘리지 않게 합니다.',t===1?'1분기 기본 표지는 비골의 존재 여부입니다. 길이를 모든 태아의 필수 계측으로 요구하지 않습니다.':'주수·측정법·인구집단이 맞는 참고치를 사용합니다. 길이 하나만으로 염색체 이상을 진단하지 않습니다.',['first','mid','soft'])],
 abdomen:t=>[M('AC · 복부둘레',t===1?'추가 계측':'기본 생체계측',weekBand(t),'위와 문맥동이 보이는 둥근 횡단면에서 피부 바깥 경계에 타원을 맞춥니다. 신장·심장이 들어간 높이 또는 복부를 사선으로 자른 면을 피합니다.',t===1?'초기 해부학 평가가 우선이며 계측 시 해당 주수 참고치를 사용합니다.':chart+' EFW는 HC·AC·FL 등 선택한 공식의 항목을 결합한 추정치이며 한 단면의 직접 측정값이 아닙니다.',['growth','mid','late'])],
 cord:t=>[NO('복벽 제대 삽입부',weekBand(t),'삽입부 연속성과 복벽 결손을 관찰합니다. 정상 삽입부에 일률적인 필수 직경 계측은 없습니다.','결손·탈출이 의심되면 별도 표적 검사에서 범위를 측정합니다. 제대동맥 Doppler는 별도 검사이며 이 삽입부의 길이 계측이 아닙니다.')],
 diaphragm:t=>[NO('횡격막·흉복부 장기 관계',weekBand(t),'좌우 횡격막 연속성과 위·간 위치를 확인합니다. 정상 선별에서 필수 횡격막 두께 계측은 없습니다.','횡격막 탈장 등이 의심되면 전문 프로토콜의 폐 계측으로 전환하며 정상 View의 단순 길이로 대체하지 않습니다.')],
 kidneys:t=>renal(t),
 kidneysag:t=>[M('Renal length · 신장 길이','크기·비대칭 의심 시 추가 계측',weekBand(t),'각 신장의 최장 종단면에서 상극 외측 피막부터 하극 외측 피막까지 잽니다. 부신을 포함하거나 양극이 잘린 짧은 면을 사용하지 않습니다.',chart+' 신우 전후경은 이 종단면 대신 횡단면에서 별도로 측정합니다.',['mid','late'])],
 kidneycor:t=>[NO('양측 신장 크기·위치',weekBand(t),'관상면은 양측 존재·대칭을 확인합니다. 신장 길이는 각 신장의 정확한 장축에서, 신우 전후경은 횡단면에서 따로 잽니다.','관상면에서 가장 넓게 보이는 신우 폭을 횡단 APRPD로 기록하지 않습니다.',['first','mid','utd'])],
 pelvis:t=>[t===1?M('LBD · 방광 종축 길이','방광이 커 보일 때','11–14주','현재 골반 축상면에서 방광 정중시상면으로 바꾸고 방광 돔부터 방광경부까지의 최대 종축을 잽니다. 충만·배출을 함께 관찰합니다.','ISUOG 초기 해부학 기준에서 방광 종축은 7 mm 미만입니다. 7 mm 이상이거나 지속 확장되면 단면·주수와 배출 여부를 확인해 전문 평가합니다.',['first','bladder']):NO('방광의 크기·충만·배출',weekBand(t),'고정 길이 하나보다 충만·배출, 벽과 상부요로를 관찰합니다. 지속 확장 시 별도 정중시상면에서 종축을 기록하고 정밀 평가합니다.','1분기 7 mm 기준을 중기·후기에 적용하지 않습니다.',['mid','late','bladder'])],
 spine:t=>[NO('척추·등 피부의 연속성',weekBand(t),'정상 선별에서 전 척추 길이나 뼈 사이 간격을 필수로 재지 않습니다. 시상·관상·횡단면으로 높이별 연속성을 확인합니다.','병변이 의심되면 위치·범위와 덮는 피부를 별도 표적 평가합니다.')],
 femur:t=>longBone('FL · 대퇴골 골간 길이',t,true),
 humerus:t=>longBone('HL · 상완골 골간 길이',t),
 forearm:t=>longBone('Radius / Ulna length · 요골·척골 길이',t),
 tibia:t=>longBone('Tibia / Fibula length · 경골·비골 길이',t),
 foot:t=>[M('Foot length · 발 길이','사지 불균형 의심 시 추가 계측',weekBand(t),'발바닥의 가장 긴 축에서 뒤꿈치 외측 피부 경계부터 가장 긴 발가락 끝까지 잽니다. 굽히거나 사선으로 잘린 발을 피합니다.','일반 선별은 존재·자세·다리와의 관계 평가가 우선입니다. 계측 시 같은 끝점 정의와 주수의 참고치를 사용합니다.',['first','mid','late','foot'])],
 hand:t=>[NO('손·손가락 및 손목 관계',weekBand(t),'일반 선별에서 손바닥·각 손가락 길이를 모두 필수로 재지 않습니다. 양측 손의 존재·움직임과 손목 방향을 평가합니다.','사지 이상이 의심될 때 전문 프로토콜에 따라 특정 뼈·손 길이를 선택합니다.')],
 genitalia:t=>[NO('외부생식기 형태',weekBand(t),'정상 선별에서 생식기 길이나 각도를 필수 계측으로 요구하지 않습니다. 주수에 맞는 구조를 관찰합니다.','이상 의심 시 별도 표적 검사로 전환합니다. 1분기 생식결절 각도를 후기 성별·형태 평가의 기준으로 대입하지 않습니다.',['first','mid','late'])],
 placenta:t=>[M('IOD · 태반 가장자리–내자궁구 거리',t===1?'관계 관찰·필요시 기록':'저위 태반 의심 시 계측',t===1?'11–14주 · 초기 위치 기록':t===2?'중기 위치 평가':'후기 · 저위 태반 추적 시','태반의 실제 실질 가장자리와 내자궁구를 모두 보이게 하고 가장 가까운 가장자리–내구 사이의 최단 거리를 잽니다. 저위가 의심되면 경질초음파로 명확히 하며, 내구를 덮으면 덮임을 별도로 기록합니다.',t===1?'초기 낮은 부착만으로 후기 전치태반을 확정하지 않습니다.':'내구를 덮지 않으면서 가장자리 거리가 20 mm 미만이면 저위 태반 기준에 해당합니다. 두께나 제대 부착부까지의 거리와 혼동하지 않습니다.',['mid','late'])],
 cervix:t=>[M('CL · 자궁경부 길이','적응증·선별 정책에 따른 계측',t===1?'11–14주 · 제한적 적용':t===2?'주로 16–24주':'28주 이후 · 증상·적응증에 따라','방광을 비우고 최소 압박의 경질 정중시상면에서 내자궁구–외자궁구 사이 닫힌 경관을 잽니다. 깔때기 부분을 닫힌 길이에 포함하지 않습니다. 3회 이상 적절히 측정한 값 중 최단값을 기록합니다.',t===2?'자연 조산 병력이 없는 단태임신의 중기 경질 CL ≤25 mm는 SMFM 단경부 정의입니다. 진단 기준과 치료 기준은 같지 않으며 주수·병력·기관 프로토콜에 따라 해석합니다.':'중기의 25 mm 기준을 현재 분기에 자동 적용하지 않습니다. 곡선 경관은 기관의 검증된 측정법으로 일관되게 기록합니다.',['cervix','shortcervix'])],
 profile:t=>[M('CRL · 머리엉덩길이','1분기 기본 주수 계측','1분기 · 특히 11–14주 검사','중립 자세의 정중시상면에서 머리끝(Crown)과 엉덩이끝(Rump)의 바깥 경계를 직선으로 잇습니다. 팔다리·난황낭을 포함하지 않습니다.','검증된 CRL 주수 환산표를 사용합니다. NT 선별 프로토콜의 CRL 45–84 mm 범위와 일반 CRL 측정 가능 범위를 혼동하지 않습니다.',['first'])],
 nt:t=>[M('NT · 목덜미 투명대','선별 프로토콜에 따른 계측','11주 0일–13주 6일 · CRL 45–84 mm','머리·상흉부의 정중시상면과 중립 목 자세에서 가장 넓은 투명 공간을 선택합니다. 두 고에코 경계의 안쪽에 캘리퍼 가로선을 맞추어 액체 공간 두께를 잽니다. 피부와 양막을 분리합니다.','CRL에 따른 백분위수와 선별검사 알고리즘으로 해석합니다. NF의 6 mm 기준을 적용하지 않으며 기술적으로 올바른 측정 중 최대값을 기록합니다.',['first'])]
};
export function measurementsFor(v){
 const t=v.trimester||2;
 const rows=v.type==='head'?head(t):['ventricle','earlybrain'].includes(v.type)?atrium(t):v.type==='cerebellum'?cerebellum(t):cardiacTypes.has(v.type)?cardiac(v,t):other[v.type]?.(t);
 if(!rows)return null;
 return {trimester:t,rows,refs:[...new Set(rows.flatMap(r=>r.sources))].map(k=>refs[k])};
}
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const isAdditional=r=>/보조|추가|의심|방광이 커/.test(r.role);
export function measurementGroupsFor(v){const p=measurementsFor(v);if(!p)return null;return {...p,core:p.rows.filter(r=>!isAdditional(r)),existingAdditional:p.rows.filter(isAdditional),supplementary:supplementaryFor(v)||[]};}
const links=items=>items.map(([name,url])=>`<a href="${url}" target="_blank" rel="noopener">${name} ↗</a>`).join('');
const fields=r=>`<dl><dt>적용 주수</dt><dd>${escape(r.weeks)}</dd><dt>캘리퍼·측정 방법</dt><dd>${escape(r.placement)}</dd><dt>해석·주의</dt><dd>${escape(r.interpretation)}</dd></dl>`;
export function renderMeasurements(v){const p=measurementGroupsFor(v);if(!p)return '';return `<section class="measurement-guide" aria-label="주수별 측정 항목과 캘리퍼 배치"><h3>정확한 캘리퍼(측정자) 배치 기준 <small>${p.trimester}분기 · 주수별 측정 항목</small></h3><p class="measurement-intro">기본 계측·현재 View의 평가와 추가 계측을 나누었습니다. 각 항목의 적용 주수와 검사 범위를 확인하세요.</p><div class="core-measurements"><h4 class="measurement-group-title">기본 계측 · 현재 View의 평가</h4>${p.core.length?p.core.map(r=>`<article class="measurement-item"><h4>${escape(r.name)}</h4><span class="measurement-role">${escape(r.role)}</span>${fields(r)}</article>`).join(''):'<p class="measurement-note">이 View에서는 형태·연결 평가가 우선이거나 계측이 적응증에 따라 선택됩니다. 아래 추가 항목에서 해당 목적을 확인하세요.</p>'}</div>${renderDoppler(v)}<section class="supplementary-guide" aria-label="추가로 측정 가능한 항목"><h3>추가로 측정 가능한 항목 <small>선택·표적·정밀 계측</small></h3><p class="measurement-intro">모든 임신에서 필수로 시행하는 목록은 아닙니다. 항목을 펼쳐 측정 목적과 필요한 추가 단면·검사를 확인하세요.</p>${p.existingAdditional.map(r=>`<details class="supplementary-item"><summary><span>${escape(r.name)}</span><small>${escape(r.role)}</small></summary><div class="supplementary-body">${fields(r)}<div class="measurement-sources">${links(r.sources.map(k=>refs[k]))}</div></div></details>`).join('')}${p.supplementary.map(r=>`<details class="supplementary-item${r.available?'':' deferred-measurement'}"><summary><span>${escape(r.name)}</span><small>${r.available?'추가 평가':'중기 이후 참고'}</small></summary><div class="supplementary-body">${r.available?'':'<p class="measurement-note">현재 1분기에 일상적으로 적용하는 계측이 아닙니다. 아래는 중기 이후의 표적 검사 참고 내용입니다.</p>'}<dl><dt>측정 목적</dt><dd>${escape(r.purpose)}</dd><dt>적용 주수</dt><dd>${escape(r.weeks)}</dd><dt>필요한 단면·검사</dt><dd>${escape(r.plane)}</dd><dt>캘리퍼·측정 방법</dt><dd>${escape(r.placement)}</dd><dt>해석·주의</dt><dd>${escape(r.caution)}</dd></dl><div class="measurement-sources">${links(r.sources)}</div></div></details>`).join('')}</section><p class="measurement-note">길이는 mm, 심박수는 bpm, 비율·유속은 해당 정의와 단위로 기록합니다. 추가 계측에도 같은 주수·단면·측정법의 참고치를 사용하며 단일 수치로 진단하지 않습니다.</p><div class="measurement-sources">${links(p.refs)}</div></section>`;}
