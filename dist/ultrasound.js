import {ultrasoundFigures} from './ultrasound-data.js?v=24';
const p=(n,panel)=>['PMC12401504:uog29299-fig-'+String(n).padStart(4,'0'),panel];
const h=(n,panel)=>['PMC3784141:F'+n,panel];
const mapping={
 ventricle:p(4,'Plane 4 · TVP (왼쪽)'),head:p(4,'Plane 5 · TTP (가운데)'),cerebellum:p(4,'Plane 6 · TCP (오른쪽)'),
 spine:p(3,'Plane 1 · 시상면 / Plane 2 · 관상면'),abdomen:p(6,'Plane 11 · 위와 제대정맥을 포함한 복부 횡단면'),cord:p(6,'Plane 12 · 복벽 제대 삽입부'),kidneys:p(6,'Plane 13a / 13b · 좌우 신장과 신우 횡단면'),
 pelvis:p(7,'Plane 14 · 방광과 양측 제대동맥'),femur:p(7,'Plane 15 · 대퇴골'),tibia:p(7,'Plane 16 · 경골·비골'),foot:p(7,'Plane 16 · 하퇴와 발의 위치 관계 (발가락 상세 영상 아님)'),humerus:p(7,'Plane 17 · 상완골'),forearm:p(7,'Plane 17 · 요골·척골'),hand:p(7,'Plane 17 · 전완과 손의 위치 관계 (손가락 상세 영상 아님)'),
 face:p(10,'Plane 18 · 상순·비공·코끝'),orbit:p(10,'Plane 19 · 양측 안와와 수정체'),facialprofile:p(10,'Plane 20 · 정중 얼굴 윤곽'),
 heart:h(5,'A: 4CV / B: 방실 유입 혈류 / C·D: 판막 도플러'),lvot:h(6,'A: LVOT / B: 대동맥판을 지나는 색 도플러'),rvot:h(7,'A: RVOT / B: 폐동맥판을 지나는 색 도플러'),threev:h(8,'3VV · MPA, AAo, SVC'),threevpa:h(8,'3VV의 폐동맥 영역 참고 · PA 측정 전용 영상 아님'),vessels:h(9,'A: 3VT / B: 두 궁의 V자 합류 혈류'),aoarch:h(10,'A: 대동맥궁 / B: 색 도플러'),ductarch:h(11,'A: 동맥관궁 / B: 색 도플러'),bicaval:h(12,'상·하대정맥과 우심방'),
 nt:['PMC11107467:F2','정중시상면의 정상 NT 예시'],
 profile:['PMC11107467:F2','1분기 정중시상면 참고 · CRL 측정 예시 아님'],
 placenta:['PMC2747450:F0002','11주 전벽 태반 위치 · 화살표 확인 (다른 주수·태반 위치의 대표 영상 아님)'],
 cervix:['PMC7311420:Fig1','오른쪽 위 Maternal cervix 영역 · 여러 데이터셋 예시가 포함된 원본 전체 그림']
};
export function ultrasoundFor(v){
 let match=mapping[v.type];
 if(v.trimester===1&&['heart','lvot','threev'].includes(v.type))match=h(13,{heart:'A: 4CV',threev:'B: 3VV',lvot:'C: LVOT'}[v.type]+' · 13주');
 if(!match)return null;
 const [key,panel]=match,ref=ultrasoundFigures[key];
 return {...ref,key,panel,age:key==='PMC3784141:F13'?'13주 실제 심장 영상':ref.age};
}
export function renderUltrasound(v,$){
 const ref=ultrasoundFor(v);$('#schematicDetails').open=!ref;
 if(!ref){$('#ultrasoundReference').innerHTML='<h3>실제 초음파</h3><p>이 세부 단면에 맞는 재사용 가능한 실제 영상은 아직 확보하지 못했습니다. 아래 모식도로 확인하세요.</p>';return;}
 const src='./ultrasound/'+ref.file;
 $('#ultrasoundReference').innerHTML=`<h3>실제 초음파 <small>논문 정지영상</small></h3><p class="us-panel">${ref.panel}</p><a href="${src}" target="_blank" rel="noopener" aria-label="실제 초음파 원본 크기로 보기"><img id="ultrasoundImage" src="${src}" alt="${ref.panel} · ${ref.author}, ${ref.figure}" loading="lazy"></a><p class="us-age">${ref.age} · 선택한 분기와 동일 주수의 영상임을 뜻하지 않습니다.</p>${v.temporal?'<p class="us-warning">현재 수축기·이완기와 일치한다고 확인된 프레임은 아닙니다. 같은 해부학적 단면을 참고하며, 주기는 실제 cine로 판정해야 합니다.</p>':''}<p id="usImageStatus">이미지를 누르면 원본 크기로 볼 수 있습니다. 3D 회전·단면 조작과 연동되는 영상은 아닙니다.</p><p class="us-credit">${ref.author} (${ref.year}), ${ref.figure} · <a href="https://doi.org/${ref.doi}" target="_blank" rel="noopener">원문</a> · <a href="${ref.source}" target="_blank" rel="noopener">그림 설명</a><br><a href="${ref.licenseUrl}" target="_blank" rel="noopener">${ref.license}</a> · 원본 전체 그림, 수정 없음${ref.license.includes('NC')?' · 비상업 교육용':''}</p>`;
 $('#ultrasoundImage').onerror=()=>{$('#ultrasoundImage').hidden=true;$('#usImageStatus').textContent='영상을 불러오지 못했습니다. 위 원문·그림 설명 링크에서 확인하세요.';$('#schematicDetails').open=true;};
}
