import {supplementModules,supplementSources} from './supplement-catalog.js?v=47';
// Independent lessons, with explicit clinical scope; baseType only selects the context organ.
const definitions=[
 ['low-sax','low-sax','심실 단축면','Low ventricular short-axis','heart'],
 ['high-sax','high-sax','심기저부 단축면','High short-axis','rvot'],
 ['pulmonary-veins','pulmonary-veins','폐정맥–좌심방 연결면','Pulmonary venous connections','heart'],
 ['pa-bifurcation','pa-bifurcation','폐동맥 분지면','Pulmonary artery bifurcation','rvot'],
 ['corpus-callosum','brain-sagittal','뇌량 정중시상면','Corpus callosum midsagittal view','head',0,['뇌량 Corpus callosum: rostrum / genu / body / splenium','투명중격강 Cavum septi pellucidi (CSP)','제3뇌실 Third ventricle']],
 ['posterior-fossa','brain-sagittal','후두개와 정중시상면','Posterior fossa midsagittal view','cerebellum',1,['소뇌충부 Cerebellar vermis','제4뇌실 Fourth ventricle','뇌간 Brainstem','대조 Cisterna magna']],
 ['transfrontal','brain-coronal','경전두 관상면','Transfrontal coronal plane','head',0,['전두엽 Frontal lobes','반구간열 Interhemispheric fissure','안와 상방 두개골 Supraorbital skull']],
 ['transcaudate','brain-coronal','경미상 관상면','Transcaudate coronal plane','head',1,['측뇌실 전두각 Frontal horns','미상핵 Caudate nuclei','투명중격강 CSP','뇌량 전방부 Anterior corpus callosum']],
 ['coronal-thalamic','brain-coronal','경시상 관상면','Transthalamic coronal plane','head',2,['양측 시상 Bilateral thalami','제3뇌실 Third ventricle','반구간열 Interhemispheric fissure']],
 ['coronal-cerebellar','brain-coronal','경소뇌 관상면','Transcerebellar coronal plane','cerebellum',3,['소뇌 반구 Cerebellar hemispheres','소뇌충부 Cerebellar vermis','측뇌실 후두각 Occipital horns','반구간열 Interhemispheric fissure']],
 ['conus','spinal-conus','척수원뿔 시상면','Conus medullaris sagittal view','spine'],
 ['placental-insertion','placental-insertion','태반측 제대 부착부','Placental cord insertion','placenta'],
 ['early-posterior-fossa','early-posterior-fossa','1분기 후두개와 시상면','Early posterior fossa / IT','earlybrain'],
 ['rnt','rnt-gap','후비삼각 · RNT','Retronasal triangle','face']
];
export const extendedViews=definitions.map(([id,moduleId,title,en,type,photoIndex=0,structures])=>{
 const base=supplementModules.find(m=>m.id===moduleId);
 const m={...base,structures:structures||base.structures};
 if(moduleId==='brain-coronal')m.steps=[base.steps[0],`관상 스윕에서 ${en} 수준을 선택합니다. ${base.variants[photoIndex][1]}를 확인합니다.`, '정중선과 양측 구조의 대칭을 맞추고 인접 관상면과 구분하여 저장합니다.'];
 if(id==='corpus-callosum')m.steps=['전방 천문을 통한 정중시상면을 확보합니다.','뇌량의 부리·무릎·몸통·팽대를 연속적으로 추적하고 CSP와 제3뇌실을 확인합니다.','정중면 이탈을 교정하고 필요한 경우 뇌량주위동맥 컬러를 보조적으로 확인합니다.'];
 if(id==='posterior-fossa')m.steps=['후방 천문을 통한 정중시상면을 확보합니다.','뇌간·제4뇌실·소뇌충부·대조를 함께 정렬합니다.','소뇌 반구가 충부처럼 겹치지 않도록 정중면을 재확인합니다.'];
 return {id,title,en,type,y:0,extended:true,moduleId,photoIndex,module:m,trimesters:base.trimesters,
 group:type==='placenta'?'기본 검사 · 태반 부착부':base.trimesters[0]===1?'정밀 검사 · 1분기':base.group==='심장'?'정밀 심장':'정밀 신경',
 scope:base.scope,documentNumber:'확장',quality:{best:`${m.structures.join(', ')}의 관계를 왜곡 없이 확인하고 필요한 연속 스윕을 기록합니다.`,acceptable:'해당 검사의 핵심 구조와 연결을 평가할 수 있어야 합니다. 관찰이 제한되면 제한 사항과 재평가 계획을 기록합니다.'},memo:'학회 권고를 바탕으로 구성한 정밀·표적 학습입니다. 3D는 교육용 위치 참고이며 임상 표준 단면으로 검증된 환자 모델이 아닙니다.',
 checks:m.steps,tip:m.tips.join(' '),question:'이 View의 판정에서 우선 확인할 것은?',options:['해당 구조의 위치·연결과 검사 범위','화면 방향만 맞으면 충분함','다른 주수의 수치를 그대로 적용함'],answer:0};
});
export const extendedSources=v=>v.module.refs.map(k=>supplementSources[k]);
const links=v=>extendedSources(v).map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join(' · ');
export function extendedGuide(v,tab){
 const m=v.module,t=v.trimester,age=t===1?'12+0–13+6주 정밀검사 범위 · 초기 발달을 고려합니다.':t===3?'3분기 · 골화·태위·양수로 제한되는 구조는 재평가 범위를 기록합니다.':'2분기 · 구조의 발달과 정확한 임신 주수를 함께 확인합니다.';
 const ul=a=>`<ul>${a.map(s=>`<li>${s}</li>`).join('')}</ul>`;
 if(tab==='anatomy')return `<section><h3>이 뷰에서 관찰할 구조물</h3>${ul(m.structures)}<p>${v.scope}</p>${links(v)}</section>`;
 if(tab==='acquisition')return `<section><h3>단면 획득 프로토콜 <small>${t}분기 · Step-by-Step</small></h3><p>${age}</p><ol>${m.steps.map(s=>`<li>${s}</li>`).join('')}</ol><h3>영상 획득 시 주의해야 할 핵심 팁</h3>${ul(m.tips)}${links(v)}</section>`;
 return `<section><h3>정확한 캘리퍼(측정자) 배치 기준</h3><p>${age}</p><h4>기본 평가 · 구조와 연결</h4><p>${m.structures.join(' / ')}의 형태와 연속성을 기록합니다. 독립된 보편적 수치 계측을 모든 경우에 요구하는 View는 아닙니다.</p><details open><summary>추가로 측정 가능한 항목 · 적응증별</summary><p>${m.measure}</p></details>${m.doppler?`<section class="doppler-guide"><h3>도플러 세부 영역</h3><p>${m.doppler.gate}</p><p>${m.doppler.settings}</p><p>${m.doppler.record}</p></section>`:''}${links(v)}</section>`;
}
