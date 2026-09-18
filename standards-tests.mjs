import assert from 'node:assert/strict';
import {standards} from './dist/standards-data.js';
import {phases} from './dist/data.js';
import {isCardiac} from './dist/planes.js';
assert.equal(standards.length,38);
assert.deepEqual([...new Set(phases.flatMap(p=>p.lessons.map(v=>v.documentNumber)))].sort((a,b)=>a-b),Array.from({length:38},(_,i)=>i+1));
assert.deepEqual(phases.map(p=>p.lessons.length),[35,36,36]);
for(let p=0;p<3;p++)for(const v of phases[p].lessons){
 const doc=standards[v.documentNumber-1],expected=doc.blocks[`${p+1}분기`]||doc.blocks['공통'];
 assert.deepEqual(v.quality,expected);assert(v.quality.best&&v.quality.acceptable);
 assert.equal(isCardiac(v),v.group==='심장');
 if(v.documentNumber>=37)assert.equal(p,0);
 if(v.temporal)assert(['heart','lvot','rvot'].includes(v.type));
}
console.log('All 38 document classes covered: 35 / 36 / 36 phase entries; exact supplied quality criteria, cardiac grouping and temporal labels verified.');
