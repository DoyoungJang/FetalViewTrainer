// Teaching schematics only. They illustrate landmarks, not patient imaging.
export function drawExtra(v,{g,ellipse:e,line:l,label:t}){
 const type=v.type,teal='#75dacb',gold='#e7bd7f';
 if(v.documentNumber===3&&v.trimester===1){e(280,161,132,111);e(282,208,20,43);e(324,209,14,32,teal,'#10212b');e(360,216,15,36,gold,'#10212b');t('Brainstem',97,290);t('4th ventricle / IT',324,137);t('Developing cisterna magna',278,313);}
 else if(type==='orbit'){e(300,180,160,100);e(225,165,42,40);e(375,165,42,40);e(225,155,12,8,teal);e(375,155,12,8,teal);t('Orbit / globe / lens',155,305);}
 else if(type==='facialprofile'){l([[220,280],[195,230],[180,180],[185,105],[220,70],[295,72],[330,95],[337,129],[365,160],[337,168],[346,190],[330,203],[338,224],[304,250],[260,266]],'#b8d2d9',5);t('Forehead',345,91);t('Nose',392,165);t('Maxilla',376,207);t('Mandible',350,257);}
 else if(['threev','threevpa','vessels'].includes(type)){
  e(300,180,165,118);e(270,275,18,11);
  if(type==='vessels'){l([[210,113],[267,230],[327,126]],teal,13);e(267,230,13,12,teal);e(378,142,13,13);e(361,222,13,13,gold,'#10212b');t('Ductal arch',65,83);t('Ao arch',302,86);t('SVC',397,143);t('Trachea',382,241);t('V-sign',188,271);}
  else{e(224,160,31,31,teal);e(309,170,24,24,gold);e(379,181,15,15);t('PA',204,110);t('Ao',294,120);t('SVC',365,139);if(type==='threevpa'){l([[194,160],[254,160]],gold,2);t('PA diameter',170,244);}}
 }
 else if(type==='aoarch'){l([[196,277],[195,174],[207,112],[243,89],[284,96],[313,135],[328,203],[336,275]],gold,18);for(const [x,y]of [[221,104],[251,91],[279,102]])l([[x,y],[x-4,y-43]],gold,9);t('Ascending Ao',36,290);t('Arch / isthmus',334,130);t('Descending Ao',351,275);}
 else if(type==='ductarch'){l([[176,255],[242,204],[324,190],[367,213],[381,275]],teal,18);t('MPA',125,289);t('Ductus arteriosus',212,140);t('Descending Ao',372,309);t('No head/neck branches',139,66);}
 else if(type==='bicaval'){e(307,173,70,72);l([[286,55],[286,121]],'#8cabed',22);l([[284,236],[280,304]],'#8cabed',25);t('SVC',334,80);t('RA',298,177);t('IVC',328,284);}
 else if(type==='cord'){e(263,184,112,95);l([[363,163],[426,152],[465,181],[488,170]],teal,23);l([[370,164],[425,155],[465,181]],gold,5);t('Abdominal wall',120,65);t('Cord insertion',361,255);l([[385,241],[374,188]],teal,2);}
 else if(type==='diaphragm'){e(300,175,127,135);l([[185,190],[212,165],[246,158],[300,192],[350,158],[387,165],[415,189]],teal,5);t('Thorax',262,100);t('Abdomen',249,259);t('Diaphragm',30,170);}
 else if(['kidneysag','kidneycor'].includes(type)){
  if(type==='kidneysag'){e(302,173,55,106);e(298,180,18,49,teal,'#10212b');t('Upper pole',373,75);t('Lower pole',373,284);t('Pelvis',355,190);l([[226,68],[226,279]],gold,2);}
  else{for(const x of [216,385]){e(x,171,40,78);e(x+(x<300?10:-10),180,16,35,teal,'#10212b');}for(let i=0;i<10;i++)e(300,67+i*24,12,8);t('Bilateral kidneys',172,303);}
 }
 else if(['humerus','forearm','tibia'].includes(type)){
  const two=type!=='humerus';l([[219,80],[344,270]],'#b8d2d9',15);if(two)l([[271,81],[388,251]],'#b8d2d9',12);e(240,62,32,13);e(368,288,34,15);t(type==='humerus'?'Shoulder — humerus — elbow':type==='forearm'?'Radius + ulna / wrist':'Tibia + fibula / ankle',65,301);
 }
 else if(type==='hand'){l([[259,281],[254,172],[236,126],[244,114],[274,149],[277,81],[290,80],[295,139],[303,60],[318,62],[321,140],[334,77],[347,80],[345,150],[360,113],[373,119],[367,194],[342,237],[337,282]],'#b8d2d9',7);t('Wrist / hand orientation',156,302);}
 else if(type==='foot'){l([[237,60],[246,209],[272,246],[380,260],[412,245],[401,224],[323,191],[312,67]],'#b8d2d9',8);t('Lower leg',330,105);t('Ankle',147,206);t('Foot orientation',312,309);}
 else if(type==='genitalia'){e(226,163,56,95);e(382,163,56,95);l([[287,141],[312,141]],teal,5);l([[282,164],[316,164]],teal,5);t('External genital region',174,271);t('Morphology, not sex assignment',126,301);}
 else if(type==='placenta'){e(300,161,135,129);l([[201,88],[213,67],[251,45],[296,38],[336,45]],gold,23);l([[278,277],[278,307],[321,307],[321,277]],'#b8d2d9',6);t('Placenta',350,62);t('Lower edge',61,139);t('Internal os',357,278);l([[351,269],[322,277]],teal,2);}
 else if(type==='cervix'){l([[160,98],[242,142],[399,184],[436,246]],'#b8d2d9',13);l([[156,171],[220,189],[362,234],[422,300]],'#b8d2d9',13);l([[243,165],[381,210]],teal,3);e(207,77,75,29);t('Internal os',102,246);t('External os',361,139);t('Canal / minimal probe pressure',96,301);}
 else return false;
 return true;
}
