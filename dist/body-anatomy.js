import * as T from './vendor/three.module.js';

const selections={abdomen:['liver','stomach','spleen','gallbladder'],cord:['liver','stomach'],kidneys:['kidneys','renal_pelvis','adrenals'],kidneysag:['kidneys','renal_pelvis'],kidneycor:['kidneys','renal_pelvis'],pelvis:['bladder'],diaphragm:['diaphragm','lungs','liver'],spine:['spine']};
export function createBodyAnatomy(body,skeleton){
 const all=[...(body?.meshes||[]),...(skeleton?.meshes||[])];
 for(const m of all){m.userData.bodyPart=m.name.startsWith('FMA')?'spine':m.name;m.userData.baseColor=m.material.color.clone();}
 const supported=type=>!!body&&!!selections[type];
 const meshes=type=>all.filter(m=>selections[type]?.includes(m.userData.bodyPart));
 function bounds(name){const b=new T.Box3();all.filter(m=>m.userData.bodyPart===name).forEach(m=>b.union(new T.Box3().setFromObject(m)));return b;}
 return {supported,meshes,
  show(type,visible){if(body)body.group.visible=visible;if(skeleton)skeleton.group.visible=visible;
   for(const m of all){const selected=!selections[type]||selections[type].includes(m.userData.bodyPart);m.visible=visible;m.material.transparent=!selected;m.material.opacity=selected?1:.12;m.material.depthWrite=selected;}
  },
  isolate(type,yes){if(yes)for(const m of all)m.visible=selections[type]?.includes(m.userData.bodyPart)||false;},
  preset(type){if(!supported(type))return null;
   const key=type==='pelvis'?'bladder':type.startsWith('kidney')?'kidneys':type==='spine'?'spine':type==='diaphragm'?'diaphragm':'stomach';
   const b=bounds(key);if(b.isEmpty())return null;const center=b.getCenter(new T.Vector3());let normal=new T.Vector3(0,1,0);
   if(type==='kidneysag'){center.x=(b.min.x+center.x)/2;normal.set(1,0,0);}else if(type==='kidneycor')normal.set(0,0,1);else if(['spine','diaphragm'].includes(type))normal.set(1,0,0);
   if(type==='cord')return null; // External insertion stays registered to the fetal surface.
   return {center,normal,extent:type==='spine'?2.6:1.65,landmarks:[center.clone()],anchorNames:[{bladder:'방광 중심',kidneys:'신장 영역',spine:'척추 영역',diaphragm:'횡격막 영역',stomach:'위 중심'}[key]+' · 참고 위치']};
  }
 };
}
