import {anatomyFor} from './anatomy.js?v=28';
// Anchors in the 600 x 350 teaching diagram coordinate system.
// These identify drawn structures, not segmentation of a patient image.
const marks={
 head:[['두개골',185,95],['대뇌겸 · 정중선',300,80],['양측 시상',322,178],['투명중격강 · CSP',300,130]],
 ventricle:[['두개골',185,95],['대뇌겸',300,80],['측뇌실',258,167],['맥락총',342,174],['투명중격강 · CSP',300,130]],
 earlybrain:[['두개골',185,95],['대뇌겸',300,80],['맥락총 · 나비 모양',342,167]],
 cerebellum:[['소뇌 반구',324,223],['소뇌충부 영역',300,223],['대조 · CM',300,258],['후두골',368,280]],
 face:[['코 · 비공',299,193],['상순',280,214],['하순',299,234]],
 orbit:[['안와 · 안구',225,179],['수정체',375,155],['반대쪽 안구',375,183]],
 facialprofile:[['이마',328,97],['코끝',365,160],['상악',343,185],['하악 · 턱끝',336,224]],
 heart:[['우심방 · RA',296,133],['좌심방 · LA',350,134],['우심실 · RV',296,198],['좌심실 · LV',352,198],['심실중격',324,198],['방실판 수준',350,164]],
 lvot:[['좌심실 · LV',352,198],['좌심실 유출로',343,145],['대동맥판 수준',335,107],['상행대동맥 · Ao',307,83]],
 rvot:[['우심실 · RV',296,198],['우심실 유출로',292,145],['폐동맥판 수준',290,107],['주폐동맥 · MPA',330,83]],
 threev:[['주폐동맥 · PA',224,160],['상행대동맥 · Ao',309,170],['상대정맥 · SVC',379,181]],
 threevpa:[['주폐동맥 · PA',224,160],['대동맥 · Ao',309,170],['상대정맥 · SVC',379,181],['폐동맥 직경 측정 축',224,160]],
 vessels:[['동맥관궁',237,172],['대동맥궁',297,178],['상대정맥 · SVC',378,142],['기관',361,222],['하행대동맥 합류 · V',267,230]],
 aoarch:[['상행대동맥',195,210],['대동맥궁',251,93],['두경부 분지 3개',251,54],['하행대동맥',335,263]],
 ductarch:[['주폐동맥 · MPA',197,239],['동맥관',313,191],['하행대동맥',380,262]],
 bicaval:[['상대정맥 · SVC',286,86],['우심방 · RA',307,173],['하대정맥 · IVC',282,273]],
 abdomen:[['위',365,155],['제대정맥–문맥동',290,160],['복벽',443,175],['척추',300,268]],
 cord:[['태아 복벽',157,177],['복벽 제대 삽입부',368,164],['제대',451,174]],
 diaphragm:[['횡격막',300,192],['흉부 · 폐 영역',274,112],['복부 · 간 영역',304,240]],
 kidneys:[['한쪽 신장',249,214],['반대쪽 신장',351,214],['신우',351,214],['척추',300,268]],
 kidneysag:[['신장 상극',302,71],['신장 하극',302,274],['신우',298,180],['신실질',337,172]],
 kidneycor:[['한쪽 신장',216,171],['반대쪽 신장',385,171],['신우',375,180],['척추',300,163]],
 pelvis:[['방광',300,172],['제대동맥 · 한쪽',248,170],['제대동맥 · 반대쪽',352,170],['척추',300,268]],
 spine:[['척추체',278,183],['후방 골화 중심',278,136],['척추관 영역',300,157],['등쪽 피부',300,108]],
 femur:[['대퇴골 골간부',285,182],['골간부 근위 끝',410,112],['골간부 원위 끝',174,244]],
 humerus:[['상완골',282,176],['어깨 쪽',240,62],['팔꿈치 쪽',368,288]],
 forearm:[['요골',282,176],['척골',335,175],['팔꿈치 쪽',240,62],['손목 쪽',368,288]],
 tibia:[['경골',282,176],['비골',335,175],['무릎 쪽',240,62],['발목 쪽',368,288]],
 hand:[['엄지',245,126],['손가락',308,68],['손바닥',310,191],['손목',299,278]],
 foot:[['하퇴',275,105],['발목',283,201],['발뒤꿈치',271,242],['발 앞쪽 · 발가락 영역',401,242]],
 genitalia:[['음순 · 여성 형태 예시',297,151],['한쪽 대퇴부',226,163],['반대쪽 대퇴부',382,163]],
 placenta:[['태반',258,47],['태반 하연',202,91],['자궁벽',431,163],['자궁경부 내구',300,283]],
 cervix:[['자궁경부 내구',243,165],['경부관',303,185],['자궁경부 외구',381,210],['앞쪽 경부 조직',300,158],['뒤쪽 경부 조직',289,210]],
 profile:[['머리 끝 · Crown',183,73],['엉덩이 끝 · Rump',387,222],['몸통',319,218]],
 nt:[['코끝',295,144],['목덜미 투명대 · NT',265,160],['몸통',319,218]]
};
export function diagramLabelsFor(v){
 if(v.trimester===1&&v.type==='head')return marks.head.slice(0,2).concat([['초기 뇌 영역',322,178]]);
 if(v.trimester===1&&v.type==='cerebellum')return [['뇌간',282,208],['제4뇌실 · IT',324,209],['발달 중인 대조',360,216]];
 if(v.trimester===1&&v.type==='genitalia')return [['생식결절',300,155],['몸통 축',280,205],['회음부',285,182]];
 return marks[v.type]||[];
}
export function finishDiagram(v,{g,ellipse:e,line:l},$){
 // Complete landmarks absent from the older overview schematics.
 if(v.type==='face')l([[269,234],[300,237],[330,234]],'#d7a6c7',4);
 if(v.type==='ventricle'){e(258,174,9,21,'#f0c36d','#aa7c3d');e(342,174,9,21,'#f0c36d','#aa7c3d');}
 if(v.type==='cerebellum'&&v.trimester!==1)e(300,223,8,17,'#edba83','#927451');
 if(v.type==='kidneys')for(const x of [249,351])e(x,214,8,19,'#75dacb','#10212b');
 if(v.type==='pelvis')for(const x of [248,352])l([[x,214],[x,155],[x+(x<300?14:-14),126]],'#e7bd7f',7);
 if(v.type==='heart'){l([[324,166],[324,230]],'#e7bd7f',4);l([[277,164],[310,164]],'#75dacb',3);l([[333,164],[370,164]],'#75dacb',3);}
 if(v.type==='lvot')l([[326,107],[344,103]],'#e7bd7f',3);
 if(v.type==='rvot')l([[281,107],[299,104]],'#e7bd7f',3);
 const labels=diagramLabelsFor(v),colors=['#75dacb','#f3c36a','#aebaff','#ffa4bd','#98dd91','#e5c3ff'];
 labels.forEach(([name,x,y],i)=>{
  const left=i%2===0,bx=left?88:512,by=65+Math.floor(i/2)*91;
  g.strokeStyle=colors[i%colors.length];g.lineWidth=1.5;g.beginPath();g.moveTo(bx+(left?14:-14),by);g.lineTo(x,y);g.stroke();
  g.beginPath();g.arc(x,y,3,0,Math.PI*2);g.fillStyle=colors[i%colors.length];g.fill();
  g.beginPath();g.arc(bx,by,15,0,Math.PI*2);g.fillStyle='#10212b';g.fill();g.stroke();
  g.fillStyle=colors[i%colors.length];g.font='bold 17px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(String(i+1),bx,by);
 });
 g.textAlign='left';g.textBaseline='alphabetic';
 const source=anatomyFor(v)?.source;
 $('#diagramLegend').innerHTML=labels.map(([name],i)=>`<li><b style="color:${colors[i%colors.length]}">${i+1}</b><span>${name}</span></li>`).join('');
 $('#diagramNote').innerHTML=`번호와 선이 가리키는 구조물을 비교하세요. 해부학적 위치 관계를 단순화한 교육용 그림이며, 실제 초음파의 형태·비율·좌우 표시를 그대로 재현하지 않습니다.${v.temporal?' 같은 단면의 수축·이완기 항목은 공통 구조 그림을 사용합니다.':''}${v.trimester===1?' 1분기는 발달 중인 구조이며 후기 영상과 다릅니다.':''} <a href="${source}" target="_blank" rel="noopener">해부학 설명 근거</a>`;
 $('#diagram').setAttribute?.('aria-label',`${v.title} 구조물 그림: ${labels.map(([n],i)=>`${i+1} ${n}`).join(', ')}`);
}
