// Simplified orientation drawings: labels refer only to shapes actually drawn here.
export function drawExtended(v,{g,ellipse:e,line:l},$){
 const id=v.id;let labels=[];
 const mark=(name,x,y)=>labels.push([name,x,y]);
 if(id==='low-sax'){
  e(295,175,70,75);e(295,175,50,55,'#e7bd7f','#10212b');l([[244,100],[195,135],[190,195],[240,242]],'#9fbaff',12);e(275,184,9,12);e(315,184,9,12);
  mark('좌심실 LV',295,160);mark('우심실 RV',200,160);mark('심실중격 IVS',236,174);mark('유두근 Papillary muscles',315,184);
 }else if(id==='high-sax'){
  e(295,185,35,35);l([[212,238],[204,154],[238,100],[323,90],[370,130]],'#75dacb',20);l([[349,105],[361,121]],'#e7bd7f',5);
  mark('대동맥근 Aortic root',295,185);mark('RVOT',214,161);mark('폐동맥판 Pulmonary valve',355,113);mark('MPA',370,130);
 }else if(id==='pa-bifurcation'){
  l([[300,267],[300,166],[210,105]],'#75dacb',22);l([[300,166],[394,103]],'#75dacb',16);
  mark('MPA',300,236);mark('RPA / LPA 분지',245,130);mark('반대측 폐동맥 분지',365,121);
 }else if(id==='pulmonary-veins'){
  e(300,184,65,49);for(const [x,y] of [[177,125],[177,222],[423,125],[423,222]])l([[x,y],[x<300?250:350,180]],'#9ebaff',9);
  mark('좌심방 LA',300,184);mark('우측 폐정맥 Right PV',210,146);mark('좌측 폐정맥 Left PV',388,142);
 }else if(id==='placental-insertion'){
  e(300,220,133,30,'#ee94b6','#964c64');l([[300,200],[327,157],[304,98]],'#75dacb',17);
  mark('태반 Placenta',245,220);mark('제대 Umbilical cord',322,149);mark('태반측 연결점 Insertion',300,199);
 }else if(id==='conus'){
  for(let i=0;i<8;i++)e(230,65+i*29,14,9);l([[296,56],[296,157],[315,213],[335,157],[335,56]],'#edba83',4);l([[190,45],[180,286],[390,286]],'#b8d2d9',3);
  mark('척수 Spinal cord',315,108);mark('척수원뿔 Conus',315,213);mark('척추체 Vertebral bodies',230,182);mark('피부 Skin',181,240);
 }else if(id==='rnt'){
  l([[300,90],[210,238],[390,238],[300,90]],'#e7bd7f',9);e(254,83,25,18);e(346,83,25,18);
  mark('비골 Nasal bones',300,99);mark('상악돌기 Maxillary process',240,188);mark('전방 상악 치조융기 Alveolar ridge',300,238);
 }else if(['corpus-callosum','posterior-fossa','early-posterior-fossa'].includes(id)){
  e(300,169,139,113);
  if(id==='corpus-callosum'){l([[213,177],[225,121],[278,100],[337,117],[366,155]],'#e7bd7f',14);e(290,146,38,15);e(297,195,18,23);mark('뇌량 Corpus callosum',279,100);mark('CSP',290,146);mark('제3뇌실 Third ventricle',297,195);}
  else{l([[275,118],[278,206],[300,246]],'#e7bd7f',19);e(326,205,22,30);e(297,195,10,22,'#75dacb','#10212b');e(363,222,12,25,'#75dacb','#10212b');mark('뇌간 Brainstem',279,166);mark(id==='early-posterior-fossa'?'제4뇌실 IT':'제4뇌실 Fourth ventricle',297,195);mark(id==='early-posterior-fossa'?'발달 중 후두와 Posterior fossa':'충부 Vermis',326,205);mark('대조 CM',363,222);}
 }else{
  e(300,168,125,107);l([[300,63],[300,272]],'#e7bd7f',3);
  if(id==='transfrontal'){e(247,161,30,45);e(353,161,30,45);mark('좌·우 전두엽 Frontal lobes',247,161);mark('반구간열 Interhemispheric fissure',300,115);mark('두개골 Skull',414,168);}
  else if(id==='transcaudate'){for(const x of [258,342]){e(x,147,18,29);e(x,198,25,18);}e(300,155,9,21);mark('전두각 Frontal horns',258,147);mark('미상핵 Caudate nuclei',258,198);mark('CSP',300,155);}
  else if(id==='coronal-thalamic'){e(268,200,25,28);e(332,200,25,28);e(300,204,6,20);mark('시상 Thalami',268,200);mark('제3뇌실 Third ventricle',300,204);mark('반구간열 Interhemispheric fissure',300,108);}
  else{e(257,220,35,23);e(343,220,35,23);e(300,218,12,25);e(255,143,16,27);e(345,143,16,27);mark('소뇌 반구 Cerebellar hemispheres',257,220);mark('충부 Vermis',300,218);mark('후두각 Occipital horns',255,143);}
 }
 labels.forEach(([name,x,y],i)=>{g.fillStyle='#ffda85';g.font='bold 15px sans-serif';g.fillText(String(i+1),x+7,y-5);});
 $('#diagramLegend').innerHTML=labels.map(([name],i)=>`<li><b>${i+1}</b><span>${name}</span></li>`).join('');
 $('#diagramNote').textContent='구조의 관계를 단순화한 교육용 그림입니다. 실제 크기·태위·탐촉자 방향이나 주수별 발달을 재현한 영상이 아닙니다.';
 g.fillStyle='#b8d2d9';g.font='13px sans-serif';g.fillText('교육용 구조물 그림 · 실제 비율 아님',20,333);
}
