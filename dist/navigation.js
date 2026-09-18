import * as T from './vendor/three.module.js';

export function attachNavigation(camera,controls,$){
 controls.enablePan=true;controls.screenSpacePanning=true;controls.panSpeed=.8;
 function mode(value){
  const pan=value==='pan';
  controls.mouseButtons.LEFT=pan?T.MOUSE.PAN:T.MOUSE.ROTATE;
  controls.mouseButtons.RIGHT=pan?T.MOUSE.ROTATE:T.MOUSE.PAN;
  controls.touches.ONE=pan?T.TOUCH.PAN:T.TOUCH.ROTATE;
  controls.touches.TWO=pan?T.TOUCH.DOLLY_ROTATE:T.TOUCH.DOLLY_PAN;
  $('#rotateMode').setAttribute('aria-pressed',String(!pan));$('#panMode').setAttribute('aria-pressed',String(pan));
  $('#viewport').style.cursor=pan?'move':'grab';
  $('#dragHelp').textContent=pan?'드래그로 이동 · 스크롤로 확대 · 오른쪽 드래그로 회전':'드래그로 회전 · 오른쪽 드래그로 이동 · 스크롤로 확대';
 }
 function move(x,y){
  camera.updateMatrixWorld();const step=camera.position.distanceTo(controls.target)*.07;
  const delta=new T.Vector3().setFromMatrixColumn(camera.matrixWorld,0).multiplyScalar(-x*step).addScaledVector(new T.Vector3().setFromMatrixColumn(camera.matrixWorld,1),-y*step);
  camera.position.add(delta);controls.target.add(delta);controls.update();
 }
 $('#rotateMode').onclick=()=>mode('rotate');$('#panMode').onclick=()=>mode('pan');
 for(const [id,x,y] of [['panLeft',-1,0],['panRight',1,0],['panUp',0,1],['panDown',0,-1]])$('#'+id).onclick=()=>move(x,y);
 mode('rotate');return {mode,move};
}
