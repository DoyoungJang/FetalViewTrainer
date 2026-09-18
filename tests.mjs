import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {phases,sources} from './dist/data.js';
import {drawExtra} from './dist/extra-diagrams.js';
const elements=new Map();const ctx=new Proxy({},{get:()=>()=>{}});
function el(s){if(!elements.has(s))elements.set(s,{innerHTML:'',textContent:'',hidden:false,value:0,checked:true,classList:{toggle(){}},getContext:()=>ctx,showModal(){this.hidden=false;},close(){this.hidden=true;}});return elements.get(s);}
let registered;const storage=new Map();const sandbox={document:{querySelector:el,modelContext:{registerTool:t=>registered=t}},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},phases,sources,drawExtra,console,Set,Promise};
let code=await readFile('dist/app.js','utf8');code=code.replace("import {phases,sources} from './data.js';",'').replace("import {drawExtra} from './extra-diagrams.js';",'').replace(/setup3D\(\)\.catch\(\(\)=>\{.*?\}\);/s,'');vm.runInNewContext(code,sandbox);
assert.equal(registered.name,'select_fetal_view');let count=0;
for(let p=0;p<phases.length;p++){const seen=new Set();for(const lesson of phases[p].lessons){assert(!seen.has(lesson.id));seen.add(lesson.id);assert.equal(lesson.options.length,3);assert(lesson.checks.length>=3);const r=registered.execute({trimester:p+1,viewId:lesson.id});assert.equal(r.title,lesson.title);assert.equal(el('#viewTitle').textContent,lesson.title);el('#quiz').onclick({target:{closest:()=>({dataset:{answer:lesson.answer}})}});assert.match(el('#quiz .feedback').textContent,/정답/);el('#quiz').onclick({target:{closest:()=>({dataset:{answer:(lesson.answer+1)%3}})}});assert.match(el('#quiz .feedback').textContent,/다시/);el('#complete').onclick();assert.match(el('#complete').textContent,/완료됨/);el('#complete').onclick();assert.equal(el('#complete').textContent,'이 단면 학습 완료 ✓');count++;}}
const prior=el('#viewTitle').textContent;assert.throws(()=>registered.execute({trimester:0,viewId:'hc'}));assert.throws(()=>registered.execute({trimester:2,viewId:'missing'}));assert.equal(el('#viewTitle').textContent,prior);assert.equal(JSON.parse(storage.get('fetalview-progress')).length,0);console.log(`${count} lessons: selection, drawing branches, correct/incorrect answers, completion persistence and invalid tool input passed. Mock contract only; no browser/WebGL validation.`);
