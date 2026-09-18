"""Pack source histology, retaining the source-to-surface coordinate transform."""
import sys, json, gzip
sys.path.insert(0,'research/pydeps')
import numpy as np, nibabel as nib
from pathlib import Path
img=nib.load('research/FB40.nii.gz')
rgb=np.squeeze(np.asanyarray(img.dataobj))[::2,::2,::2,:].copy()
alpha=np.where(rgb.min(axis=-1)<250,255,0).astype(np.uint8)
rgba=np.concatenate([rgb,alpha[...,None]],axis=-1)
# Web sampling uses x-fast layout.
raw=rgba.transpose(2,1,0,3).copy().tobytes()
Path('dist/models/brain-volume.bin.gz').write_bytes(gzip.compress(raw,compresslevel=9,mtime=0))
remap=np.array([[-1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]])
matrix=remap @ img.affine @ np.diag([2,2,2,1])
Path('dist/models/brain-volume.json').write_text(json.dumps({'dimensions':list(rgb.shape[:3]),'voxelToModel':matrix.T.flatten().tolist(),'source':'DHARANI FB40 Nissl RGB histology; stride 2; not ultrasound'},indent=2))
print('Volume:',rgb.shape,len(raw),'raw bytes',Path('dist/models/brain-volume.bin.gz').stat().st_size,'gzip bytes')
