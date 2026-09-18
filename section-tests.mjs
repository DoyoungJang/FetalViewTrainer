import assert from 'node:assert/strict';
import * as T from './dist/vendor/three.module.js';
import {sectionGeometry} from './dist/sections.js';
// A cut through a torus must preserve its cavity, not triangulate a solid disk.
const mesh=new T.Mesh(new T.TorusGeometry(.2,.05,32,96));
const geometry=sectionGeometry([mesh],new T.Vector3(0,0,.001),new T.Quaternion());
const p=geometry.attributes.position,a=new T.Vector3(),b=new T.Vector3(),c=new T.Vector3();let area=0;
for(let i=0;i<p.count;i+=3){a.fromBufferAttribute(p,i);b.fromBufferAttribute(p,i+1);c.fromBufferAttribute(p,i+2);area+=b.sub(a).cross(c.sub(a)).length()/2;}
assert(Math.abs(area-Math.PI*(.25**2-.15**2))<.003,`Annular cap area ${area}`);
assert(sectionGeometry([mesh],new T.Vector3(0,0,2),new T.Quaternion()).attributes.position.count===0);
console.log('Cut caps preserve enclosed cavities and produce no geometry outside the organ.');
