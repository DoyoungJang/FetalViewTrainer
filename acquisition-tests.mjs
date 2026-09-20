import assert from 'node:assert/strict';
import {phases} from './dist/data.js';
import {acquisitionFor} from './dist/acquisition.js';
const all=phases.flatMap(p=>p.lessons);
for (const v of all) {
 const p=acquisitionFor(v);
 assert(p,`${v.trimester}/${v.id}: missing protocol`);
 assert.equal(p.steps.length,v.temporal?6:5);
 assert.equal(p.steps[4][0],`${v.trimester}분기 적용`);
 assert(p.refs.every(([label,url])=>label&&new URL(url).protocol==='https:'));
}
for(const type of new Set(all.map(v=>v.type))){
 const variants=phases.map(p=>p.lessons.find(v=>v.type===type)).filter(Boolean);
 const notes=variants.map(v=>acquisitionFor(v).steps[4][1]);
 assert.equal(new Set(notes).size,notes.length,`${type}: repeated trimester guidance`);
}
for(const phase of phases){
 const cardiac=phase.lessons.filter(v=>v.temporal);
 assert.equal(new Set(cardiac.map(v=>acquisitionFor(v).steps.at(-1)[1])).size,5);
}
const early=phases[0].lessons;
assert.match(acquisitionFor(early.find(v=>v.type==='head')).steps[2][1],/CSP는 초기 필수 표지로 요구하지 않습니다/);
assert.match(acquisitionFor(early.find(v=>v.type==='cerebellum')).steps[2][1],/제4뇌실/);
assert.match(acquisitionFor(early.find(v=>v.type==='genitalia')).steps[0][1],/정중시상면/);
console.log(`${all.length} acquisition protocols: complete trimester coverage, distinct age guidance, cardiac frame selection, early brain and genitalia overrides passed.`);
