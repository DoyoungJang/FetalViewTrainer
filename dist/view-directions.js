import {Vector3} from './vendor/three.module.js';
import {orbitLandmarks,limbLandmarks,brainLandmarks} from './anatomy-registration.js?v=45';

const mid='https://doi.org/10.1002/uog.24888';
const cns='https://www.isuog.org/static/b91bae06-731b-4a2d-8bbcbb2f0d886af4/ISUOG-Practice-Guidelines-CNS-part-2-targeted-neurosonography.pdf';
const heart='https://www.asecho.org/wp-content/uploads/2023/07/PIIS0894731723002067-1.pdf';
const cardiac=new Set(['heart','lvot','rvot','threev','threevpa','vessels','aoarch','ductarch','bicaval']);
const brain=new Set(['head','ventricle','cerebellum']);
const limbs={humerus:['shoulder','elbow'],forearm:['elbow','wrist'],hand:['wrist','finger'],femur:['hip','knee'],tibia:['knee','ankle'],foot:['heel','toe']};
const labels={axial:'횡단면 · Axial',coronal:'관상면 · Coronal',sagittal:'시상면 · Sagittal','sagittal-left':'좌측 방시상면 · Left parasagittal','sagittal-right':'우측 방시상면 · Right parasagittal',short:'단축면 · Short axis',long2:'직교 장축면 · Orthogonal long axis'};
const defaults={face:'coronal',facialprofile:'sagittal',spine:'sagittal',diaphragm:'sagittal',kidneysag:'sagittal',kidneycor:'coronal',placenta:'sagittal',cervix:'sagittal'};
// Additional directions are educational anatomy planes, not new universal screening requirements.
export function directionsFor(v){
 if(![2,3].includes(v.trimester))return [];
 let axes=v.type==='orbit'?['coronal','sagittal-left','sagittal-right']:limbs[v.type]?['short','long2']:['axial','coronal','sagittal'].filter(a=>a!==(defaults[v.type]||'axial'));
 if(cardiac.has(v.type))axes=['axial','coronal','sagittal'];
 return [{id:'standard',label:'기준 단면 · '+(v.type==='orbit'?'Axial':limbs[v.type]?'Long axis':cardiac.has(v.type)?v.en.split(' · ')[0]:labels[defaults[v.type]||'axial'])},...axes.map(id=>({id,label:labels[id]}))];
}
export function isAlternate(v){return [2,3].includes(v.trimester)&&v.direction&&v.direction!=='standard'&&directionsFor(v).some(d=>d.id===v.direction);}
const targets={
 orbit:{coronal:'양측 안구(Globes)·수정체(Lenses)·안와벽(Orbital walls)의 대칭과 위치를 앞쪽에서 비교합니다.','sagittal-left':'좌측 안구(Globe)·수정체(Lens)와 앞뒤 안와 경계를 한쪽 눈의 장축 방향으로 살핍니다.','sagittal-right':'우측 안구(Globe)·수정체(Lens)와 앞뒤 안와 경계를 한쪽 눈의 장축 방향으로 살핍니다.'},
 head:{coronal:'양측 시상(Thalami)·제3뇌실(Third ventricle)·반구간열(Interhemispheric fissure)을 좌우로 비교합니다.',sagittal:'뇌량(Corpus callosum)·뇌간(Brainstem) 등 정중 구조의 전후 관계를 살핍니다.'},
 ventricle:{coronal:'양측 측뇌실(Lateral ventricles)과 맥락총(Choroid plexus)의 좌우 관계를 살핍니다.',sagittal:'한쪽 측뇌실의 전두각·체부·후두각(Frontal horn, body, occipital horn)의 연결을 방시상면에서 살핍니다.'},
 cerebellum:{coronal:'양측 소뇌 반구(Cerebellar hemispheres)와 충부(Vermis)의 좌우 관계를 살핍니다.',sagittal:'소뇌 충부(Vermis)·제4뇌실(Fourth ventricle)·뇌간(Brainstem)의 정중 관계를 살핍니다.'},
 face:{axial:'상악(Maxilla)·치조궁(Alveolar ridge)·구개(Palate)의 횡단 관계를 살핍니다.',sagittal:'코(Nose)·상순(Upper lip)·상악과 하악(Maxilla, mandible)의 옆모습을 살핍니다.'},
 facialprofile:{axial:'양측 안와(Orbits)와 상악(Maxilla)의 높이를 스윕하며 확인합니다.',coronal:'코·상순(Nose, upper lip)의 연속성과 얼굴 좌우 대칭을 확인합니다.'},
 spine:{axial:'척추체(Vertebral body)와 양측 후방 골화 중심(Posterior ossification centers)을 한 높이에서 살핍니다.',coronal:'척추 골화 중심(Ossification centers)의 종렬과 좌우 대칭을 살핍니다.'},
 kidneys:{coronal:'척추 양옆의 두 신장(Kidneys)·신우(Renal pelvis)의 위치를 비교합니다.',sagittal:'한쪽 신장의 상극·하극(Upper/lower poles)과 장축을 살핍니다.'},
 kidneysag:{axial:'신장 횡단면에서 신우(Renal pelvis)와 신실질(Renal parenchyma)을 구분합니다.',coronal:'두 신장(Kidneys)의 위치와 장축 방향을 비교합니다.'},
 kidneycor:{axial:'신장과 신우(Kidney, renal pelvis)의 횡단 형태를 살핍니다.',sagittal:'한쪽 신장의 상극·하극(Upper/lower poles)과 장축을 살핍니다.'},
 diaphragm:{axial:'같은 높이에서 양측 폐(Lungs)와 흉곽(Thorax)의 관계를 살핍니다. 횡격막 연속성은 종단면에서도 확인합니다.',coronal:'양측 횡격막(Diaphragm)과 폐·간·위(Lung, liver, stomach)의 상하 관계를 살핍니다.'},
 abdomen:{coronal:'위·간·장관(Stomach, liver, bowel)의 좌우·상하 관계를 살핍니다.',sagittal:'복벽(Abdominal wall)과 흉부–복부 장기의 종축 관계를 살핍니다.'},
 cord:{coronal:'복벽(Abdominal wall)과 제대 삽입부(Cord insertion)의 관계를 스윕합니다.',sagittal:'제대가 복벽으로 이어지는 부위(Cord insertion)와 복벽의 연속성을 종단으로 확인합니다.'},
 pelvis:{coronal:'방광(Bladder)과 양측 골반 구조(Pelvic structures)의 관계를 살핍니다.',sagittal:'방광(Bladder)의 상하 범위와 하복벽(Lower abdominal wall)의 관계를 살핍니다.'},
 placenta:{axial:'태반(Placenta)의 횡단 범위와 자궁벽(Uterine wall)의 접촉을 살핍니다.',coronal:'태반의 좌우 범위와 자궁강(Uterine cavity)의 관계를 살핍니다.'},
 cervix:{axial:'경관(Cervical canal) 주변 조직의 횡단 관계를 살핍니다. CL 길이를 재는 단면은 아닙니다.',coronal:'자궁경부(Cervix)와 자궁하부(Lower uterine segment)의 좌우 관계를 살핍니다. CL 계측에는 정중시상면이 필요합니다.'},
 genitalia:{coronal:'외부 생식기(External genitalia)와 양측 대퇴(Thighs)의 관계를 살핍니다.',sagittal:'회음부(Perineum)와 외부 생식기(External genitalia)의 종축 관계를 살핍니다.'}
};
export function directionInfo(v){
 if(!isAlternate(v))return null;
 const label=directionsFor(v).find(d=>d.id===v.direction).label;
 const target=targets[v.type]?.[v.direction]||(limbs[v.type]?(v.direction==='short'?'장축에 수직인 면에서 뼈·주변 연조직(Bone, surrounding soft tissue)의 횡단 관계를 살핍니다.':'같은 사지의 직교 장축면에서 뼈·관절(Bone, joint)의 정렬을 비교합니다.'):cardiac.has(v.type)?'심방·심실·대혈관(Atria, ventricles, great vessels)의 공간적 관계를 탐색합니다. 이 방향으로 회전한 면을 기존 '+v.en+'와 같은 표준 View로 판정하지 않습니다.':'해당 장기의 서로 직교하는 해부학적 관계를 비교합니다.');
 return {label,target,source:brain.has(v.type)?cns:cardiac.has(v.type)?heart:v.type==='cervix'?'https://doi.org/10.1002/uog.26020':mid,
  timing:v.trimester===3?'3분기는 태위·골화 음영과 공간 제약에 따라 가시성이 달라집니다. 추가 방향은 적응증에 따른 재평가·정밀검사에 활용합니다.':'2분기는 기준 단면을 먼저 확보한 뒤 필요한 구조를 추가 방향에서 확인합니다. 모든 추가 방향이 기본 선별검사의 필수 항목은 아닙니다.'};
}
export function orientPreset(v,preset){
 if(!isAlternate(v))return preset;
 const d=v.direction,center=preset.center.clone();let normal;
 if(limbs[v.type]){
  const [a,b]=limbs[v.type].map(k=>new Vector3(...limbLandmarks[k]));const along=b.sub(a).normalize();
  normal=d==='short'?along:new Vector3().crossVectors(along,preset.normal).normalize();
 }else if(v.type==='orbit'){
  const x=new Vector3(1,0,0),a=new Vector3(...orbitLandmarks.left),b=new Vector3(...orbitLandmarks.right),back=new Vector3(...orbitLandmarks.posterior);
  const axial=new Vector3().crossVectors(b.clone().sub(a),back.sub(a)).normalize();
  normal=d==='coronal'?new Vector3().crossVectors(x,axial).normalize():x;
  center.copy(d==='sagittal-left'?a:d==='sagittal-right'?b:a.add(b).multiplyScalar(.5));
 }else if(brain.has(v.type)){
  const a=new Vector3(...brainLandmarks.ttpLeft),b=new Vector3(...brainLandmarks.ttpRight),c=new Vector3(...brainLandmarks.ttpAnterior);
  const axial=new Vector3().crossVectors(b.sub(a),c.sub(a)).normalize();
  normal=d==='coronal'?new Vector3().crossVectors(new Vector3(1,0,0),axial).normalize():new Vector3(1,0,0);
  if(d==='sagittal')center.x=v.type==='ventricle'?.135:0;
 }else{
  normal=new Vector3(...({axial:[0,1,0],coronal:[0,0,1],sagittal:[1,0,0]}[d]));
  if(preset.directionCenters?.[d])center.set(...preset.directionCenters[d]);else if(d==='sagittal'&&['kidneys','kidneycor'].includes(v.type))center.x-=.15;
  if(v.type==='facialprofile'&&d==='coronal')center.z=.72;
 }
 return {...preset,center,normal,landmarks:[],anchorNames:[],note:directionInfo(v).target};
}
export function renderDirections(v,$,hasPhoto){
 const options=directionsFor(v),info=directionInfo(v);
 const available=options.filter(o=>hasPhoto({...v,direction:o.id}));
 $('#directionControls').hidden=!available.length;
 $('#directionSelect').disabled=!available.length;
 const selected=v.direction||'standard';
 const placeholder=available.some(o=>o.id===selected)?'':'<option value="" selected disabled hidden>방향 선택</option>';
 $('#directionSelect').innerHTML=placeholder+available.map(o=>`<option value="${o.id}" ${o.id===selected?'selected':''}>${o.label}</option>`).join('');
 $('#directionSummary').textContent=info?info.target:'사진이 있는 단면 방향만 표시합니다. 방향 전환 시 카메라 시점은 유지됩니다.';
 $('#diagram').hidden=!!info;
 if(!info)return;
 $('#planeName').textContent=v.en+' · '+info.label;
 $('#diagramLegend').innerHTML='';$('#diagramNote').textContent='이 추가 방향의 전용 구조물 그림은 아직 제공되지 않습니다. 위 3D 평면과 아래 방향별 설명을 참고하세요.';
 const link=`<a href="${info.source}" target="_blank" rel="noopener">추가 방향의 해부학·검사 범위 참고 ↗</a>`;
 $('#anatomyPanel').innerHTML=`<h3>${info.label}에서 관찰할 구조물</h3><p>${info.target}</p><p>현재 3D 모델에 모든 미세 구조가 분할되어 있는 것은 아닙니다.</p>${link}`;
 $('#acquisitionPanel').innerHTML=`<h3>추가 방향 획득 · ${info.label}</h3><ol><li>기존 기준 단면에서 장기 위치와 태아의 머리·등·배 방향을 확인합니다.</li><li>${v.type==='orbit'&&v.direction.startsWith('sagittal')?'선택한 한쪽 안구 중심을 지나도록 이동한 뒤 방시상면을 맞춥니다. 정중시상면은 안구 중심을 통과하지 않습니다.':limbs[v.type]?'굴곡된 사지 자체의 장축을 기준으로 회전합니다. 화면의 수직·수평과 구분합니다.':'장기 중심을 유지하며 원하는 방향으로 회전·스윕하고 인접 구조의 연속성을 확인합니다.'}</li><li>${info.target}</li></ol><h4>스캔 시 주의</h4><p>${info.timing} 사단면·음영으로 구조가 사라지면 기준 단면부터 다시 확인합니다.</p><p>3D의 방향은 교육용 등록값이며 환자별 탐촉자 각도를 규정하지 않습니다.</p>${link}`;
 $('#measurementPanel').innerHTML=`<h3>추가 방향의 측정 적용</h3><p>현재 방향은 해부학 탐색용입니다. 기준 View의 캘리퍼·정상범위를 이 방향에 자동 적용하지 않습니다.</p><p>길이·둘레·비율은 해당 측정법에서 요구하는 표준 단면으로 복귀한 후 평가하세요. 사지 단축면은 골간 길이, 안와 방시상면은 양안 간격, 자궁경부 횡단면은 CL 측정에 사용하지 않습니다.</p>${link}`;
 $('#qualityPanel').innerHTML=`<h3>추가 방향 정렬 확인</h3><p>${info.target}</p><p>장기 중심과 좌우·전후 관계를 확인하고 사단면을 교정합니다. 기존 기준 View의 Best/Acceptable 등급을 추가 방향에 그대로 적용하지 않습니다.</p>${link}`;
 $('#quiz').innerHTML='<p>추가 방향에서는 구조의 관계를 확인하세요. 기존 View의 셀프 체크는 기준 단면으로 돌아가면 다시 표시됩니다.</p>';
}
