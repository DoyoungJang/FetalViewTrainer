import * as T from './vendor/three.module.js';
import {sectionSegments} from './planes.js?v=12';

// Join mesh/plane intersections into closed rings, preserving nested cavities.
export function sectionGeometry(meshes,center,quaternion){
 const inv=quaternion.clone().invert(),positions=[];
 for(const mesh of meshes){
  const normal=new T.Vector3(0,0,1).applyQuaternion(quaternion);
  const segments=sectionSegments([mesh],normal,center),nodes=new Map(),edges=new Set();
  const key=p=>`${Math.round(p.x*1e5)},${Math.round(p.y*1e5)}`;
  for(let i=0;i<segments.length;i+=6){
   const a=new T.Vector3().fromArray(segments,i).sub(center).applyQuaternion(inv),b=new T.Vector3().fromArray(segments,i+3).sub(center).applyQuaternion(inv),ka=key(a),kb=key(b);
   if(ka===kb)continue;const edge=[ka,kb].sort().join('|');if(edges.has(edge))continue;edges.add(edge);
   if(!nodes.has(ka))nodes.set(ka,{p:new T.Vector2(a.x,a.y),next:[]});if(!nodes.has(kb))nodes.set(kb,{p:new T.Vector2(b.x,b.y),next:[]});nodes.get(ka).next.push(kb);nodes.get(kb).next.push(ka);
  }
  const used=new Set(),rings=[];
  for(const [start,node] of nodes){if(used.has(start)||node.next.length!==2)continue;const ring=[];let at=start,prev=null,closed=false;
   for(let i=0;i<=nodes.size;i++){if(used.has(at)){closed=at===start;break;}used.add(at);const n=nodes.get(at);ring.push(n.p);if(n.next.length!==2)break;const next=n.next.find(k=>k!==prev);prev=at;at=next;}
   if(closed&&ring.length>=3)rings.push(ring);
  }
  const contains=(ring,p)=>{let inside=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)inside=!inside;}return inside;};
  const records=rings.map(r=>({ring:r,area:Math.abs(T.ShapeUtils.area(r)),parent:null,depth:0})).sort((a,b)=>b.area-a.area);
  records.forEach((r,i)=>{for(let j=i-1;j>=0;j--)if(contains(records[j].ring,r.ring[0])){r.parent=records[j];r.depth=r.parent.depth+1;break;}});
  for(const r of records){if(r.depth%2)continue;const holes=records.filter(h=>h.parent===r).map(h=>h.ring),vertices=[...r.ring,...holes.flat()];for(const tri of T.ShapeUtils.triangulateShape(r.ring,holes))for(const index of tri){const p=vertices[index];positions.push(p.x,p.y,.0003);}}
 }
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.computeVertexNormals();return geometry;
}

export async function loadBrainVolume(){
 const [meta,res]=await Promise.all([fetch(new URL('./models/brain-volume.json',import.meta.url)).then(r=>r.json()),fetch(new URL('./models/brain-volume.bin.gz',import.meta.url))]);
 if(!res.ok)throw new Error('Brain volume unavailable');
 const stream=res.body.pipeThrough(new DecompressionStream('gzip'));
 const data=new Uint8Array(await new Response(stream).arrayBuffer());
 if(data.length!==meta.dimensions.reduce((a,b)=>a*b,4))throw new Error('Invalid brain volume');
 return {...meta,data};
}

export function createHistologySection(asset){
 const resolution=256,pixels=new Uint8Array(resolution*resolution*4),texture=new T.DataTexture(pixels,resolution,resolution,T.RGBAFormat);
 texture.colorSpace=T.SRGBColorSpace;texture.magFilter=T.LinearFilter;texture.minFilter=T.LinearFilter;
 const mesh=new T.Mesh(new T.PlaneGeometry(1.65,1.65),new T.MeshBasicMaterial({map:texture,transparent:true,alphaTest:.25,side:T.DoubleSide,toneMapped:false}));
 mesh.name='actual-histology-section';mesh.visible=false;
 const point=new T.Vector3(),u=new T.Vector3(),v=new T.Vector3(),origin=new T.Vector3();
 function update(center,quaternion){
  const volume=asset.volume;if(!volume)return;
  asset.modelRoot.updateWorldMatrix(true,false);
  const transform=new T.Matrix4().fromArray(volume.voxelToModel).invert().multiply(asset.modelRoot.matrixWorld.clone().invert());
  const [nx,ny,nz]=volume.dimensions;
  origin.copy(center).applyMatrix4(transform);
  u.set(1.65,0,0).applyQuaternion(quaternion).add(center).applyMatrix4(transform).sub(origin);
  v.set(0,1.65,0).applyQuaternion(quaternion).add(center).applyMatrix4(transform).sub(origin);
  for(let y=0;y<resolution;y++)for(let x=0;x<resolution;x++){
   point.copy(origin).addScaledVector(u,(x+.5)/resolution-.5).addScaledVector(v,(y+.5)/resolution-.5);
   const ix=Math.round(point.x),iy=Math.round(point.y),iz=Math.round(point.z),out=(y*resolution+x)*4;
   if(ix<0||iy<0||iz<0||ix>=nx||iy>=ny||iz>=nz){pixels[out+3]=0;continue;}
   const index=((iz*ny+iy)*nx+ix)*4;
   for(let c=0;c<4;c++)pixels[out+c]=volume.data[index+c];
  }
  texture.needsUpdate=true;mesh.position.copy(center).addScaledVector(new T.Vector3(0,0,1).applyQuaternion(quaternion),.0005);mesh.quaternion.copy(quaternion);
 }
 return {mesh,update};
}
