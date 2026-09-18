"""Reproducible derivatives: KCL fetal atlas (CC0), BodyParts3D (CC BY-SA 2.1 JP)."""
import sys
sys.path.insert(0,'research/pydeps')
import json,numpy as np,nibabel as nib,trimesh
from scipy.ndimage import gaussian_filter
from skimage.measure import marching_cubes
from pathlib import Path
image=nib.load('research/reo-fetal-t2w-body-atlas-mask-body_organs-10.nii.gz')
data=image.get_fdata()
names=['lungs','liver','stomach','spleen','renal_pelvis','kidneys','bladder','thymus','gallbladder','adrenals']
colors=['c792bd','aa6555','df9c8e','9474b0','f2d58c','b77985','e4bf8a','dfb2cc','83ac87','d6a76b']
scene=trimesh.Scene()
for label,(name,color) in enumerate(zip(names,colors),1):
 field=gaussian_filter((data==label).astype(np.float32),.65)
 vertices,faces,_,_=marching_cubes(field,.5,step_size=1)
 points=nib.affines.apply_affine(image.affine,vertices)
 # RAS -> viewer left, superior, anterior; one shared transform for all organs.
 points=np.column_stack([-points[:,0],points[:,2],points[:,1]])*.016+[0,-.15,.12]
 mesh=trimesh.Trimesh(points,faces,process=True)
 mesh=mesh.simplify_quadric_decimation(face_count=min(len(mesh.faces),12000))
 trimesh.smoothing.filter_taubin(mesh,iterations=2)
 mesh.visual=trimesh.visual.ColorVisuals(mesh,face_colors=[*bytes.fromhex(color),255])
 scene.add_geometry(mesh,node_name=name,geom_name=name)
 print(name,len(mesh.faces))
scene.export('dist/models/fetal-body-kcl.glb')
entries=json.loads(Path('research/bodyparts-selected.json').read_text())
entries += [['FMA12519','atlas',''],['FMA12520','axis','']]
scene=trimesh.Scene()
for id,name,_ in entries:
 mesh=trimesh.load('research/bodyparts/'+id+'.stl',force='mesh')
 mesh=mesh.simplify_quadric_decimation(face_count=min(len(mesh.faces),8000 if name=='diaphragm' else 1600))
 p=mesh.vertices.copy()
 if name=='diaphragm':
  center=mesh.bounds.mean(0);extent=np.ptp(p,axis=0)
  p=(p-center)/extent
  mesh.vertices=np.column_stack([p[:,0]*1.02,p[:,2]*.30-.06,-p[:,1]*.72+.1])
 else:
  mesh.vertices=np.column_stack([p[:,0]*.0028,(p[:,2]-790)*.0028-1.05,-p[:,1]*.0028-.55])
 mesh.visual=trimesh.visual.ColorVisuals(mesh,face_colors=[193,139,126,255] if name=='diaphragm' else [233,220,184,255])
 scene.add_geometry(mesh,node_name='diaphragm' if name=='diaphragm' else id,geom_name=id)
scene.export('dist/models/bodyparts-spine-diaphragm.glb')
print('Exported separate licensed derivatives.')
