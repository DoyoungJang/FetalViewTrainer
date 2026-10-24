import assert from 'node:assert/strict';
import {phases} from './dist/data.js';
import {modulesForTrimester} from './dist/supplement-catalog.js';
import {moduleMarkup} from './dist/supplement-ui.js';
import {clinicalCatalog,clinicalSources,clinicalFor,renderClinical} from './dist/clinical-purpose.js';

let views=0,modules=0;
function verify(v){
 const c=clinicalFor(v);assert(c,`Missing clinical content: ${v.trimester}/${v.id}`);
 assert(c.why.length>15&&c.limit.length>15&&c.findings.length);
 assert(c.refs.length&&c.refs.every(k=>clinicalSources[k]),v.id);
 assert(c.sources.every(s=>s.label&&s.url.startsWith('https://')));
 assert.equal(new Set(c.sources.map(s=>s.url)).size,c.sources.length);
 for(const f of c.findings){assert(/[A-Za-z]/.test(f.name),`English name: ${v.id}`);assert(f.sign.length>5&&f.next.length>5);}
 const html=renderClinical(v);assert(html.includes('관찰 단서')&&html.includes('추가 확인')&&html.includes('해석 한계'));
 assert(!/undefined|\[object Object\]/.test(html),v.id);
 assert(c.phaseNote.includes(`${v.trimester}분기`));
 return c;
}
for(const [i,p] of phases.entries())for(const v of p.lessons){verify({...v,trimester:i+1});views++;}
for(const t of [1,2,3])for(const m of modulesForTrimester(t)){
 verify({...m,trimester:t,clinicalModule:true});
 assert(moduleMarkup(m,t).includes('촬영 목적과 주요 이상 소견'));modules++;
}
assert.equal(views,133);assert.equal(modules,48);
const lesson=(t,id)=>({...phases[t-1].lessons.find(v=>v.id===id),trimester:t});
const earlyHead=clinicalFor({...phases[0].lessons.find(v=>v.type==='head'),trimester:1});
assert(earlyHead.why.includes('BPD')&&earlyHead.why.includes('CRL'));
assert(earlyHead.limit.includes('CSP')&&earlyHead.limit.includes('정상 발달'));
assert(clinicalFor({type:'cerebellum',trimester:1}).limit.includes('축상'));
assert(clinicalFor({type:'cervix',trimester:1}).phaseNote.includes('초기 CL 선별용으로 사용하지 않습니다'));
assert(clinicalFor(lesson(2,'4ch-es')).cycleNote.includes('역류'));
assert(clinicalFor(lesson(2,'lvot-ed')).cycleNote.includes('정상일 수 있습니다'));
assert.notEqual(clinicalFor(lesson(2,'4ch-es')).why,clinicalFor(lesson(2,'4ch-ed')).why);
assert(clinicalFor({type:'orbit',trimester:2,direction:'coronal'}).directionNote.includes('기준 단면'));
assert(clinicalCatalog['vasa-previa'].findings[0].sign.includes('정맥'));
assert(clinicalCatalog.pas.limit.includes('소견이 없어도'));
assert(clinicalCatalog['early-femur'].refs.includes('skeleton'));
assert(clinicalCatalog['brain-coronal'].findings.some(f=>f.name.includes('Callosal')));
assert(clinicalCatalog['rnt-gap'].findings.some(f=>f.name.includes('Mandibular gap')));
const before=JSON.stringify(clinicalCatalog.heart);clinicalFor(lesson(1,'4ch'));clinicalFor(lesson(3,'4ch-es'));assert.equal(JSON.stringify(clinicalCatalog.heart),before);
const escaped=renderClinical({type:'head',trimester:2,scope:'<img onerror="bad">'});assert(!escaped.includes('<img onerror'));
console.log(`Clinical purpose/anomaly coverage: ${views} standard views, ${modules} trimester-module combinations; ${Object.keys(clinicalSources).length} evidence references. Stage, cycle, anatomy, rendering and safety checks passed.`);
