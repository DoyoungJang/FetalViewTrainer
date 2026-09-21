import {isAlternate,directionInfo} from './view-directions.js?v=45';
import {directionUltrasound,kidneyThirdImage} from './direction-ultrasound.js?v=45';
import {trimesterUltrasound,unmatchedReference} from './trimester-ultrasound.js?v=45';
import {ultrasoundFigures} from './ultrasound-data.js?v=45';
const p=(n,panel)=>['PMC12401504:uog29299-fig-'+String(n).padStart(4,'0'),panel];
const h=(n,panel)=>['PMC3784141:F'+n,panel];
const mapping={
 earlybrain:['PMC4710000:Fig1','위쪽 A–C: 정상 1분기 측뇌실·맥락총 횡단면 / 아래 D–F: 뇌실확장 비교 영상 (정상 단면 아님)'],
 diaphragm:['PMC10023640:Fig1b','23: 우측 / 24: 좌측 횡격막 · 세 번째 줄 가운데와 오른쪽의 방시상면'],
 kidneysag:['PMC10023640:Fig1b','29: 좌측 / 30: 우측 신장 시상면 · 마지막 줄 가운데와 오른쪽'],
 kidneycor:['PMC7498649:F1','d: 두 신장이 함께 보이는 관상면 (맨 오른쪽) · a는 12주 예시'],
 genitalia:['PMC9633498:Fig3','여성 외부 생식기 · 음순의 평행한 선형 에코, 30주 4일 예시'],
 ventricle:p(4,'Plane 4 · TVP (왼쪽)'),head:p(4,'Plane 5 · TTP (가운데)'),cerebellum:p(4,'Plane 6 · TCP (오른쪽)'),
 spine:p(3,'Plane 1 · 시상면 / Plane 2 · 관상면'),abdomen:p(6,'Plane 11 · 위와 제대정맥을 포함한 복부 횡단면'),cord:p(6,'Plane 12 · 복벽 제대 삽입부'),kidneys:p(6,'Plane 13a / 13b · 좌우 신장과 신우 횡단면'),
 pelvis:p(7,'Plane 14 · 방광과 양측 제대동맥'),femur:p(7,'Plane 15 · 대퇴골'),tibia:p(7,'Plane 16 · 경골·비골'),foot:['PMC10023640:Fig1c','35: 발 · 두 번째 줄 가운데'],humerus:p(7,'Plane 17 · 상완골'),forearm:p(7,'Plane 17 · 요골·척골'),hand:['PMC10023640:Fig1c','38: 손 · 세 번째 줄 가운데'],
 face:p(10,'Plane 18 · 상순·비공·코끝'),orbit:p(10,'Plane 19 · 양측 안와와 수정체'),facialprofile:p(10,'Plane 20 · 정중 얼굴 윤곽'),
 heart:h(5,'A: 4CV / B: 방실 유입 혈류 / C·D: 판막 도플러'),lvot:h(6,'A: LVOT / B: 대동맥판을 지나는 색 도플러'),rvot:h(7,'A: RVOT / B: 폐동맥판을 지나는 색 도플러'),threev:h(8,'3VV · MPA, AAo, SVC'),threevpa:h(8,'3VV의 폐동맥 영역 참고 · PA 측정 전용 영상 아님'),vessels:h(9,'A: 3VT / B: 두 궁의 V자 합류 혈류'),aoarch:h(10,'A: 대동맥궁 / B: 색 도플러'),ductarch:h(11,'A: 동맥관궁 / B: 색 도플러'),bicaval:h(12,'상·하대정맥과 우심방'),
 nt:['PMC11107467:F2','정중시상면의 정상 NT 예시'],
 profile:['PMC11107467:F2','1분기 정중시상면 참고 · CRL 측정 예시 아님'],
 placenta:['PMC2747450:F0002','11주 전벽 태반 위치 · 화살표 확인 (다른 주수·태반 위치의 대표 영상 아님)'],
 cervix:['PMC7311420:Fig1','오른쪽 위 Maternal cervix 영역 · 여러 데이터셋 예시가 포함된 원본 전체 그림']
};
export function ultrasoundFor(v){
 if(isAlternate(v)){
  const direct=directionUltrasound(v);if(direct)return direct;
  const matching={kidneys:{coronal:'kidneycor',sagittal:'kidneysag'},kidneysag:{axial:'kidneys',coronal:'kidneycor'},kidneycor:{axial:'kidneys',sagittal:'kidneysag'},face:{sagittal:'facialprofile'},facialprofile:{coronal:'face'}}[v.type]?.[v.direction];
  return matching?ultrasoundFor({...v,type:matching,direction:'standard'}):null;
 }
 if(v.trimester===3&&v.type==='kidneys')return kidneyThirdImage('axial');
 if(v.type==='cervix'||v.trimester===1||v.trimester===3)return trimesterUltrasound(v,ultrasoundFigures);
 const selected=selectedPanels[v.type],match=selected||mapping[v.type];
 if(!match)return null;
 const [key,panel]=match,ref=ultrasoundFigures[key];
 return {...ref,key,panel,region:selected?.[2]||[0,0,...ref.size]};
}
const selectedPanels={
 earlybrain:['PMC4710000:Fig1','A: 정상 1분기 측뇌실 횡단면',[0,0,154,165]],
 diaphragm:['PMC10023640:Fig1b','23: 우측 횡격막 방시상면',[254,347,191,140]],
 kidneysag:['PMC10023640:Fig1b','29: 좌측 신장 시상면',[254,690,191,138]],
 kidneycor:['PMC7498649:F1','d: 양측 신장 관상면',[501,0,167,142]],
 ventricle:[p(4)[0],'Plane 4 · TVP',[0,0,215,167]],
 head:[p(4)[0],'Plane 5 · TTP',[221,0,245,167]],
 cerebellum:[p(4)[0],'Plane 6 · TCP',[473,0,236,167]],
 spine:[p(3)[0],'Plane 1 · 척추 시상면',[0,0,232,163]],
 abdomen:[p(6)[0],'Plane 11 · 복부둘레 횡단면',[0,0,352,245]],
 cord:[p(6)[0],'Plane 12 · 복벽 제대 삽입부',[360,0,349,245]],
 kidneys:[p(6)[0],'Plane 13a · 신장·신우 횡단면',[0,251,352,241]],
 pelvis:[p(7)[0],'Plane 14 · 방광과 양측 제대동맥',[0,0,231,160]],
 femur:[p(7)[0],'Plane 15 · 대퇴골',[239,0,229,160]],
 tibia:[p(7)[0],'Plane 16 · 경골·비골',[477,0,232,160]],
 humerus:[p(7)[0],'Plane 17 · 상완골',[239,169,229,158]],
 forearm:[p(7)[0],'Plane 17 · 요골·척골',[477,169,232,158]],
 foot:['PMC10023640:Fig1c','35: 발',[250,176,193,140]],
 hand:['PMC10023640:Fig1c','38: 손',[249,348,193,136]],
 face:[p(10)[0],'Plane 18 · 코·상순',[0,0,231,163]],
 orbit:[p(10)[0],'Plane 19 · 양측 안와·수정체',[239,0,229,163]],
 facialprofile:[p(10)[0],'Plane 20 · 얼굴 정중시상면',[477,0,232,163]],
 heart:[h(5)[0],'A: 심장 사강 단면 · 4CV',[5,5,365,346]],
 lvot:[h(6)[0],'A: 좌심실 유출로 · LVOT',[3,3,341,294]],
 rvot:[h(7)[0],'A: 우심실 유출로 · RVOT',[3,3,341,306]],
 threev:['PMC8429868:f3','A: 정상 3VV · PA 폐동맥 / Ao 대동맥 / S 상대정맥',[0,0,391,409]],
 threevpa:[h(8)[0],'3VV의 폐동맥 분지 참고 · 폐동맥 직경 측정 예시 아님',[7,6,670,602]],
 vessels:[h(9)[0],'A: 삼혈관·기관 단면 · 3VT',[4,4,340,327]],
 aoarch:[h(10)[0],'A: 대동맥궁',[3,3,339,278]],
 ductarch:[h(11)[0],'A: 동맥관궁',[3,3,340,270]],
 cervix:['PMC7311420:Fig1','Maternal cervix · 자궁경부 단면',[447,104,99,75]]
};
export function renderUltrasound(v,$){
 const ref=ultrasoundFor(v);$('#schematicDetails').open=true;
 if(!ref){if(isAlternate(v)){const info=directionInfo(v);$('#ultrasoundReference').innerHTML=`<h3>실제 초음파 · ${info.label}</h3><p>선택한 ${v.trimester}분기·추가 방향의 실제 영상은 아직 확보하지 못했습니다. 기준 단면 영상을 다른 방향으로 표시하지 않습니다.</p><p>${info.target}</p><a href="${info.source}" target="_blank" rel="noopener">방향·검사 범위 참고 ↗</a>`;return;}const external=unmatchedReference(v);$('#ultrasoundReference').innerHTML=`<h3>실제 초음파 <small>${v.trimester||''}분기</small></h3><p class="us-warning">이 분기와 단면이 함께 확인된 재사용 가능 영상을 아직 확보하지 못했습니다.</p>${external?`<p>${external.reason}</p><a href="${external.url}" target="_blank" rel="noopener">${external.label} ↗</a>`:''}<p>아래 구조물 그림과 표준 단면 설명을 참고하세요.</p>`;return;}
 const src='./ultrasound/'+ref.file;
 const [x,y,w,h]=ref.region;
 const imageStyle=`width:${100*ref.size[0]/w}%;height:${100*ref.size[1]/h}%;left:${-100*x/w}%;top:${-100*y/h}%`;
 $('#ultrasoundReference').innerHTML=`<h3>실제 초음파 <small>논문 정지영상</small></h3><p class="us-panel">${ref.panel}</p>${ref.referenceNote?`<p class="us-warning">구조물 참고 영상 · ${ref.referenceNote}</p>`:''}<div class="us-viewport" style="aspect-ratio:${w}/${h}"><img id="ultrasoundImage" style="${imageStyle}" src="${src}" alt="${ref.panel} · ${ref.author}, ${ref.figure}" loading="lazy"></div><p class="us-age">${ref.age}${ref.ageMatched?' · 선택한 분기와 일치':' · 개별 촬영 주수는 출처 설명 참고'}</p>${v.temporal&&ref.phaseVerified?'<p class="us-age">원문 캡션에서 선택한 심장 주기를 확인한 정지영상입니다.</p>':v.temporal?'<p class="us-warning">현재 수축기·이완기와 일치한다고 확인된 프레임은 아닙니다. 같은 해부학적 단면을 참고하며, 주기는 실제 cine로 판정해야 합니다.</p>':''}<p id="usImageStatus">캡션에 해당하는 단면만 표시합니다. 3D 조작과 연동되는 영상은 아닙니다. <a href="${src}" target="_blank" rel="noopener">원본 전체 그림 보기</a></p><p class="us-credit">${ref.author} (${ref.year}), ${ref.figure} · <a href="https://doi.org/${ref.doi}" target="_blank" rel="noopener">원문</a> · <a href="${ref.source}" target="_blank" rel="noopener">그림 설명</a><br><a href="${ref.licenseUrl}" target="_blank" rel="noopener">${ref.license}</a> · ${ref.processing||'원본 파일 보존 · 선택 패널 확대 표시'}${ref.license.includes('NC')?' · 비상업 교육용':''}</p>`;
 $('#ultrasoundImage').onerror=()=>{$('#ultrasoundImage').hidden=true;$('#usImageStatus').textContent='영상을 불러오지 못했습니다. 위 원문·그림 설명 링크에서 확인하세요.';$('#schematicDetails').open=true;};
}
