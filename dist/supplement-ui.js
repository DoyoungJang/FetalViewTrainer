import {modulesForTrimester,supplementSources} from './supplement-catalog.js?v=47';
import {supplementPhotos} from './supplement-photos.js?v=47';
import {phases} from './data.js?v=47';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const list=(items,ordered=false)=>`<${ordered?'ol':'ul'}>${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${ordered?'ol':'ul'}>`;
export function moduleMarkup(m,t){
 const sources=m.refs.map(key=>supplementSources[key]);
 const phaseNote=t===1?'초기 해부학은 이후에 발달·변화하므로 중기 검사를 대체하지 않습니다.':t===3?'후기 태위·골화·양수로 관찰이 제한되면 한계를 기록하고 적응증에 맞춰 재평가합니다.':'기준 단면을 먼저 확보하고 필요한 구조·기능을 추가로 평가합니다.';
 return `<div class="supplement-title"><span class="scope">보완 ${m.number} / 25 · ${t}분기 · ${esc(m.scope)}</span><h2 id="supplementTitle" tabindex="-1">${esc(m.title)}</h2><p>${esc(m.en)}</p></div>
 <p class="supplement-context">${phaseNote} 이 항목은 획득·판독 학습 자료입니다. 관련 기준 View 버튼에서 연결된 3D 학습으로 이동할 수 있습니다.</p>
 <div class="supplement-columns"><div><section><h3>확인할 구조물</h3>${list(m.structures)}</section>
 ${m.variants?`<section><h3>구분해서 확인할 세부 단면·구조</h3><dl class="supplement-variants">${m.variants.map(([n,d])=>`<dt>${esc(n)}</dt><dd>${esc(d)}</dd>`).join('')}</dl></section>`:''}
 <section><h3>단면 획득 · Step-by-Step</h3>${list(m.steps,true)}</section>
 <section><h3>측정·기록 기준</h3><p>${esc(m.measure)}</p></section>
 ${m.doppler?`<section class="doppler-guide"><h3>도플러·시간관계 세부 설정</h3><dl><dt>표본 위치</dt><dd>${esc(m.doppler.gate)}</dd><dt>설정</dt><dd>${esc(m.doppler.settings)}</dd><dt>기록</dt><dd>${esc(m.doppler.record)}</dd></dl><p>필요한 최소 출력·시간으로 시행하며 주수와 적응증에 맞춰 적용합니다.</p></section>`:''}
 <section><h3>스캔 시 주의사항</h3>${list(m.tips)}</section></div>
 <aside class="supplement-reference"><section id="supplementGallery"></section><section><h3>학회 근거</h3><ul>${sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a></li>`).join('')}</ul><p>획득 순서는 원문을 바탕으로 재구성한 교육용 요약입니다. 정밀·표적 항목을 모든 임신의 필수 검사로 해석하지 않습니다.</p></section><button id="supplementRelated" type="button">관련 기준 View로 이동</button></aside></div>`;
}
export function photoMarkup(r){
 const [x,y,w,h]=r.region,[iw,ih]=r.size;
 return `<figure><div class="supplement-photo" style="aspect-ratio:${w}/${h}"><img src="ultrasound/${esc(r.file)}" alt="${esc(r.title)}" style="width:${100*iw/w}%;height:${100*ih/h}%;left:${-100*x/w}%;top:${-100*y/h}%"></div><figcaption><strong>${esc(r.title)}</strong><p>${esc(r.age)}</p>${r.note?`<p class="us-warning">${esc(r.note)}</p>`:''}<small>${esc(r.author)} · ${esc(r.rights)} · 해당 패널 확대 표시</small><br><a href="${esc(r.source)}" target="_blank" rel="noopener">원문·캡션 ↗</a> · <a href="ultrasound/${esc(r.file)}" target="_blank" rel="noopener">전체 그림 ↗</a></figcaption></figure>`;
}

export function setupSupplementUI(doc){
 const $=s=>doc.querySelector(s),section=$('#supplementLearning');if(!section)return;
 let mode=false,trimester=2,selected=null,query='';const remembered=new Map();
 const workspace=$('.workspace');
 function getTrimester(){const active=$('#trimesters [aria-pressed="true"]');return active?Number(active.dataset.phase)+1:2;}
 function setMode(active){mode=active;workspace.hidden=active;section.hidden=!active;$('.skip-learning').setAttribute('href',active?'#supplementDetail':'#learningGuide');$('#standardLearningButton').setAttribute('aria-pressed',String(!active));$('#supplementLearningButton').setAttribute('aria-pressed',String(active));if(active)render();}
 function renderDetail(m){
  selected=m.id;remembered.set(trimester,m.id);$('#supplementDetail').innerHTML=moduleMarkup(m,trimester);
  const photos=supplementPhotos(m,trimester),gallery=$('#supplementGallery');
  if(photos.length){
   gallery.innerHTML=`<h3>실제 초음파 · 방법 참고</h3><label for="supplementPhotoSelect">참고 사진</label><select id="supplementPhotoSelect">${photos.map((p,i)=>`<option value="${i}">${esc(p.title)}</option>`).join('')}</select><div id="supplementPhoto"></div>`;
   const show=i=>{$('#supplementPhoto').innerHTML=photoMarkup(photos[i]);const img=$('#supplementPhoto img');img.onerror=()=>{img.parentElement.innerHTML='<p class="us-warning">사진을 불러오지 못했습니다. 아래 원문·캡션 링크에서 확인하세요.</p>';};};show(0);
   $('#supplementPhotoSelect').onchange=e=>{const n=Number(e.target.value);if(Number.isInteger(n)&&photos[n])show(n);};
  }else{gallery.hidden=true;}
  const items=phases[trimester-1].lessons;let index=items.findIndex(v=>v.extended&&v.moduleId===m.id);if(index<0)index=items.findIndex(v=>v.id===m.related);$('#supplementRelated').hidden=index<0;
  $('#supplementRelated').onclick=()=>{if(index<0)return;setMode(false);const picker=$('#lessonSelect');picker.value=String(index);picker.dispatchEvent(new Event('change',{bubbles:true}));$('#viewTitle').scrollIntoView({block:'center',behavior:'smooth'});};
 }
 function render(){
  trimester=getTrimester();const items=modulesForTrimester(trimester),filtered=items.filter(m=>(m.title+' '+m.en+' '+m.group+' '+m.structures.join(' ')).toLowerCase().includes(query));
  $('#supplementCount').textContent=`${trimester}분기 ${filtered.length} / ${items.length}개 · 전체 25개`;
  let group='';$('#supplementList').innerHTML=filtered.map(m=>{const heading=group!==m.group?`<h3>${esc(m.group)}</h3>`:'';group=m.group;return `${heading}<button type="button" data-module="${m.id}" aria-pressed="false"><span>${String(m.number).padStart(2,'0')}</span><span><strong>${esc(m.title)}</strong><small>${esc(m.en)}</small></span></button>`;}).join('');
  if(!filtered.length){$('#supplementDetail').innerHTML='<p role="status">이 분기에 일치하는 항목이 없습니다. 검색어 또는 분기를 바꿔 주세요.</p>';return;}
  const m=filtered.find(m=>m.id===remembered.get(trimester))||filtered[0];renderDetail(m);highlight();
 }
 function highlight(){for(const b of section.querySelectorAll('[data-module]'))b.setAttribute('aria-pressed',String(b.dataset.module===selected));}
 $('#supplementList').onclick=e=>{const b=e.target.closest('[data-module]');if(!b)return;const m=modulesForTrimester(trimester).find(m=>m.id===b.dataset.module);if(m){renderDetail(m);highlight();$('#supplementTitle').focus({preventScroll:true});}};
 $('#supplementSearch').oninput=e=>{query=e.target.value.trim().toLowerCase();render();};
 $('#standardLearningButton').onclick=()=>setMode(false);$('#supplementLearningButton').onclick=()=>setMode(true);
 new MutationObserver(()=>{if(mode&&getTrimester()!==trimester)render();}).observe($('#trimesters'),{childList:true});
}
if(typeof document!=='undefined')setupSupplementUI(document);
