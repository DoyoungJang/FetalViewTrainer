import {supplementPhotos} from './supplement-photos.js?v=47';
import {extendedSources} from './extended-views.js?v=47';
import {extendedFigures} from './extended-figures.js?v=47';
export function extendedPhoto(v){
 const own=extendedFigures[v.id];if(own)return {...own,region:own.region||[0,0,...own.size],panel:own.title};
 if(v.id==='conus'||v.id==='early-posterior-fossa')return null;
 const photos=supplementPhotos({id:v.moduleId},v.trimester);
 return photos[v.photoIndex]||null;
}
export function renderExtendedPhoto(v,$){
 $('#schematicDetails').open=true;
 const photos=v.id==='pulmonary-veins'?supplementPhotos({id:v.moduleId},v.trimester):[extendedPhoto(v)].filter(Boolean);
 $('#ultrasoundReference').innerHTML=photos.length?photos.map((r,i)=>{
  const [x,y,w,h]=r.region;
  return `<section><h3>${i?'도플러 참고':'실제 초음파'} · ${r.title}</h3><div class="us-viewport" style="aspect-ratio:${w}/${h}"><img style="width:${r.size[0]/w*100}%;height:${r.size[1]/h*100}%;left:${-x/w*100}%;top:${-y/h*100}%" src="./ultrasound/${r.file}" alt="${r.title}"></div><p>${r.age}</p>${r.note?`<p>${r.note}</p>`:''}<p class="us-credit">${r.author} · ${r.rights||r.license} · 해당 패널 확대 표시<br><a href="${r.source}" target="_blank" rel="noopener">원문·캡션 ↗</a></p></section>`;
 }).join(''):`<h3>단면 획득 참고</h3><p>구조물 그림과 획득 순서를 참고하세요.</p>${extendedSources(v).map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('<br>')}`;
}
