// Viewer-space landmarks registered to the current curled gelmi surface.
// They locate a teaching plane; the external artist mesh is not a bone segmentation.
export const limbLandmarks={
 shoulder:[.64,.83,-.28],elbow:[1.05,.17,.17],wrist:[.52,.50,.85],
 palm:[.35,.63,1.00],finger:[.2602,.6028,1.1185],palmEdge:[.4963,.5747,1.0161],
 hip:[.52,-1.05,-.05],knee:[.63,-.03,1.08],ankle:[.55,-.55,2.15],
 heel:[.53,-.57,2.29],toe:[.39,-.05,2.45],footEdge:[.63,-.23,2.41]
};
// Viewer +Y superior, +Z anterior. Region estimates from the registered
// DHARANI sagittal histology, not segmented or clinically validated landmarks.
export const brainLandmarks={
 cerebellumLeft:[-.18,1.38,-.08],cerebellumRight:[.18,1.38,-.08],
 thalamicRegion:[0,1.65,.28],ventricularLevel:[0,1.79,.16],
 tvpLeft:[-.15,1.726,-.04],tvpRight:[.15,1.726,-.04],tvpAnterior:[0,1.854,.36],
 ttpLeft:[-.13,1.63,.20],ttpRight:[.13,1.63,.20],ttpAnterior:[0,1.694,.40]
};
// Registration to the current curled gelmi cranial surface; preserve the
// source brain's handedness and move its teaching landmarks by the same map.
export const brainPlacement={sourceCenter:[0,1.53,.12],center:[0,1.60,.24],scale:.90};
// Paired eye-region surface anchors, inspected on the actual gelmi mesh.
// No segmented globes/lenses are present in this artistic skin model.
export const orbitLandmarks={left:[.30,.80,.579],right:[-.30,.80,.579],posterior:[0,1.00,.291]};
export const heartOrigin=[.1,.24,.04];
// In the authored cardiac schematic +X is fetal left, +Z anterior, +Y cranial.
export const greatVessels={
 PA:[.18,.35,.08],Ao:[0,.35,.0],SVC:[-.20,.35,-.04],
 PAmeasure:[.18,.32,.08],
 ductStart:[.18,.46,.06],archStart:[0,.49,.02],descending:[.09,.52,-.28],
 trachea:[-.09,.49,-.17]
};
const G=greatVessels;
export const cardiacPaths=[
 {name:'Ao',r:.035,mat:'ao',points:[[.16,-.05,.09],[.09,.19,-.015],[0,.25,0],[0,.28,0],[0,.35,0],[0,.40,0],G.archStart]},
 {name:'AoArch',r:.035,mat:'ao',points:[G.archStart,[.045,.505,-.13],G.descending]},
 {name:'dAo',r:.035,mat:'ao',points:[G.descending,[.09,.2,-.28]]},
 {name:'PA',r:.045,mat:'pa',points:[[-.06,-.02,.13],[-.12,.2,.13],[.18,.24,.08],[.18,.28,.08],[.18,.35,.08],[.18,.40,.08],G.ductStart]},
 {name:'RPA',r:.022,mat:'pa',points:[[.18,.35,.08],[.09,.36,-.08],[-.19,.36,-.15]]},
 {name:'LPA',r:.022,mat:'pa',points:[[.18,.35,.08],[.26,.37,-.03],[.33,.39,-.09]]},
 {name:'Duct',r:.038,mat:'pa',points:[G.ductStart,[.135,.49,-.11],G.descending]},
 {name:'SVC',r:.025,mat:'vein',points:[[-.2,.65,-.04],[-.2,.35,-.04],[-.2,.28,-.04],[-.2,.23,-.04],[-.11,0,-.11]]},
 {name:'Trachea',r:.024,mat:'trachea',points:[[-.09,.27,-.17],[-.09,.67,-.17]]},
 {name:'IVC',r:.032,mat:'vein',points:[[-.2,-.2,-.09],[-.17,-.1,-.1],[-.11,0,-.11]]}
];
