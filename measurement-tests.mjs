import assert from 'node:assert/strict';
import {phases} from './dist/data.js';
import {measurementsFor,renderMeasurements} from './dist/measurements.js';
const find=(trimester,type,id)=>phases[trimester-1].lessons.find(v=>v.type===type&&(!id||v.id===id));
const guide=(trimester,type,id)=>measurementsFor(find(trimester,type,id));
let count=0,rows=0;
for(const phase of phases)for(const v of phase.lessons){
 const p=measurementsFor(v);assert(p,`${v.trimester}/${v.id}`);assert.equal(p.trimester,v.trimester);assert(p.rows.length);
 for(const r of p.rows){for(const field of ['name','role','weeks','placement','interpretation'])assert(r[field]?.length,`${v.id}/${field}`);assert(r.sources.length);rows++;}
 assert(p.refs.every(r=>r?.length===2&&new URL(r[1]).protocol==='https:'));
 const html=renderMeasurements(v);assert(html.includes(`${v.trimester}분기 · 주수별 측정 항목`));assert(!html.includes('undefined'));assert(html.includes(p.rows[0].name));count++;
}
assert.equal(count,107);
const tcp=guide(2,'cerebellum').rows;
assert.match(tcp[0].placement,/Outer-to-Outer/);
assert.match(tcp[1].placement,/후두골 내면/);
assert.match(tcp[1].interpretation,/2–10 mm/);
assert.equal(tcp[2].weeks,'15–20주');assert.match(tcp[2].interpretation,/6 mm 이상/);
assert.equal(guide(1,'cerebellum').rows.length,1);
assert.equal(guide(3,'cerebellum').rows[2].role,'형태 평가 중심');
assert.match(guide(2,'kidneys').rows[0].weeks,/27주 6일/);
assert.match(guide(2,'kidneys').rows[0].interpretation,/4 mm 미만/);
assert.match(guide(3,'kidneys').rows[0].interpretation,/7 mm 미만/);
assert.match(guide(1,'kidneys').rows[0].interpretation,/1분기에 적용하지 않습니다/);
assert.match(guide(1,'nt').rows[0].weeks,/45–84 mm/);
assert.match(guide(1,'nt').rows[0].interpretation,/최대값/);
assert.match(guide(2,'cervix').rows[0].interpretation,/≤25 mm/);
assert.match(guide(2,'lvot','lvot-ed').rows[0].interpretation,/수축기 프레임을 별도로/);
assert.notDeepEqual(guide(2,'heart','4ch-ed').rows,guide(2,'heart','4ch-es').rows);
assert.match(guide(2,'hand').rows[0].role,/형태 평가/);
console.log(`${count} lessons / ${rows} measurement rows: coverage, sources, caliper boundaries, gestational limits and cardiac timing passed.`);
