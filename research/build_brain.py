import sys
sys.path.insert(0,'research/pydeps')
import numpy as np, nibabel as nib, trimesh, json
from scipy import ndimage
from skimage import measure
from pathlib import Path
img=nib.load('research/FB40.nii.gz');data=np.asanyarray(img.dataobj)
print('Input',data.shape,data.dtype, 'orientation',nib.aff2axcodes(img.affine),flush=True)
source_shape=data.shape;data=np.squeeze(data)
if data.dtype.fields:
 mask=np.stack([data[k] for k in data.dtype.names],axis=-1).min(axis=-1)<250
elif data.ndim==4: mask=data.min(axis=-1)<250
else: mask=data>0
mask=np.squeeze(mask)
assert mask.ndim==3
# Preserve source masked tissue support, denoise voxel stair-steps. This is not tissue-class segmentation.
mask=mask[::2,::2,::2]
labels,n=ndimage.label(mask);sizes=np.bincount(labels.ravel());sizes[0]=0;mask=labels==sizes.argmax()
field=ndimage.gaussian_filter(mask.astype(np.float32),sigma=.8)
vertices,faces,_,_=measure.marching_cubes(field,level=.5,step_size=2)
vertices=nib.affines.apply_affine(img.affine,vertices*2)
# Source anatomical coordinates to viewer: right->-X, superior->Y, anterior->Z.
vertices=np.column_stack([-vertices[:,0],vertices[:,2],vertices[:,1]])
mesh=trimesh.Trimesh(vertices,faces,process=True)
mesh.fix_normals()
trimesh.smoothing.filter_taubin(mesh,lamb=.5,nu=.53,iterations=3)
mesh.metadata={'name':'DHARANI FB40 masked tissue surface','source':'https://registry.opendata.aws/dharani-brain-dataset/','license':'CC BY 4.0','author':'SGBC IIT Madras; Verma et al. 2025','method':'RGB min < 250 (white background excluded), largest connected component, downsample 2, Gaussian 0.8, marching cubes step 2, Taubin 3'}
scene=trimesh.Scene(mesh);scene.export('dist/models/brain-dharani.glb')
Path('research/brain-build.json').write_text(json.dumps({'source_shape':data.shape,'source_dtype':str(data.dtype),'affine':img.affine.tolist(),'orientation':nib.aff2axcodes(img.affine),'faces':len(mesh.faces),'vertices':len(mesh.vertices),'bounds':mesh.bounds.tolist(),'method':mesh.metadata},indent=2))
print('Exported',len(mesh.faces),'triangles',Path('dist/models/brain-dharani.glb').stat().st_size,'bytes',flush=True)
# Save simple mesh arrays for geometry-only inspection using the installed plotting runtime.
np.savez_compressed('research/brain-mesh.npz',vertices=mesh.vertices,faces=mesh.faces)

