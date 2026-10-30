import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const code=await readFile('dist/streamlit-bridge.js','utf8');
const messages=[];let receive;
const parent={postMessage:(message,origin)=>messages.push({message,origin})};
const window={parent,location:{origin:'https://example.streamlit.app'},
 addEventListener:(type,fn)=>{assert.equal(type,'message');receive=fn;}};
vm.runInNewContext(code,{window});
assert.equal(messages[0].message.type,'streamlit:componentReady');
assert.equal(messages[0].message.apiVersion,1);
assert.equal(messages[0].origin,window.location.origin);
const render=(data,source=parent,origin=window.location.origin)=>receive({data,source,origin});
render({type:'streamlit:render',args:{height:1000}});
assert.equal(messages.at(-1).message.type,'streamlit:setFrameHeight');
assert.equal(messages.at(-1).message.height,1000);
assert(messages.at(-1).message.isStreamlitMessage);
const count=messages.length;
render({type:'streamlit:render',args:{height:700}},{},window.location.origin);
render({type:'streamlit:render',args:{height:700}},parent,'https://unrelated.example');
render({type:'unknown'},parent);render(null,parent);
assert.equal(messages.length,count,'Ignore unrelated frames, origins and messages');
render({type:'streamlit:render',args:{height:-100}});assert.equal(messages.at(-1).message.height,600);
render({type:'streamlit:render',args:{height:Infinity}});assert.equal(messages.at(-1).message.height,1000);
// A normal static visit must not register listeners or send a parent message.
const standalone={addEventListener:()=>{throw Error('Unexpected listener');}};
standalone.parent=standalone;vm.runInNewContext(code,{window:standalone});
console.log('Streamlit handshake, frame height, parent/origin validation and static-site no-op passed.');
