import assert from 'node:assert/strict';
import {phases} from './dist/data.js';
import {measurementGroupsFor,renderMeasurements} from './dist/measurements.js';
import {supplementaryFor} from './dist/supplementary-measurements.js';
let lessons=0,active=0,deferred=0;
for(const phase of phases)for(const v of phase.lessons){
 const p=measurementGroupsFor(v),extras=supplementaryFor(v);
 assert(extras?.length,`${v.trimester}/${v.id}: additional guidance missing`);
 assert.equal(p.core.length+p.existingAdditional.length,p.rows.length);
 assert(!p.core.some(r=>p.existingAdditional.includes(r)));
 const names=new Set();
 for(const r of extras){
  for(const key of ['name','purpose','plane','placement','caution','weeks'])assert(r[key]?.length,`${v.id}/${key}`);
  assert(!names.has(r.name));names.add(r.name);
  assert(r.sources.every(s=>s&&s[0]&&new URL(s[1]).protocol==='https:'));
  assert.equal(r.available,v.trimester>=r.minTrimester);
  r.available?active++:deferred++;
 }
 const html=renderMeasurements(v);assert(html.includes('추가로 측정 가능한 항목'));assert(html.includes('supplementary-item'));assert(!html.includes('undefined'));lessons++;
}
const v=(phase,type,id)=>phases[phase-1].lessons.find(l=>l.type===type&&(!id||l.id===id));
assert(supplementaryFor(v(1,'cerebellum'))[0].available);assert.match(supplementaryFor(v(1,'cerebellum'))[0].name,/IT/);
assert.match(supplementaryFor(v(2,'cerebellum'))[0].plane,/정중시상면/);
assert(!supplementaryFor(v(1,'genitalia'))[0].available);
assert(measurementGroupsFor(v(2,'cerebellum')).existingAdditional.some(r=>r.name.startsWith('CM')));
assert(measurementGroupsFor(v(2,'head')).core.some(r=>r.name.startsWith('HC')));
assert.match(supplementaryFor(v(2,'heart','4ch-es'))[0].caution,/현재 수축 말기/);
console.log(`${lessons} lessons: ${active} applicable and ${deferred} explicitly deferred additional rows; grouping, source links and phase/plane limits passed.`);
