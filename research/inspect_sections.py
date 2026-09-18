import sys,json
sys.path.insert(0,'research/pydeps')
import numpy as np,trimesh,matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
from pathlib import Path
d=json.loads(Path('research/section-inspection.json').read_text())
fig=plt.figure(figsize=(12,6),facecolor='#172c35')
ax=fig.add_subplot(121,projection='3d',facecolor='#172c35')
for item in d['meshes']:
 m=trimesh.Trimesh(np.array(item['vertices']).reshape(-1,3),np.array(item['faces']).reshape(-1,3),process=False)
 tri=m.vertices[m.faces]
 tri=tri[tri[:,:,2].max(axis=1)<=0]
 if not len(tri):continue
 color='#efd6ad' if 'valve' in item['name'] else '#c67c77'
 ax.add_collection3d(Poly3DCollection(tri[:,:,[0,2,1]],linewidths=0,shade=True,facecolors=color))
cap=np.array(d['cap']).reshape(-1,3,3)
ax.add_collection3d(Poly3DCollection(cap[:,:,[0,2,1]],linewidths=0,facecolors='#f2ae9d'))
ax.set(xlim=(-.45,.45),ylim=(-.45,.45),zlim=(-.45,.45));ax.set_box_aspect((1,1,1));ax.view_init(15,75);ax.set_axis_off();ax.set_title('HRA actual geometry + sectional tissue',color='white')
ax=fig.add_subplot(122,facecolor='#172c35');pixels=np.frombuffer(Path('research/brain-slice.rgba').read_bytes(),dtype=np.uint8).reshape(256,256,4);ax.imshow(pixels,origin='lower');ax.set_axis_off();ax.set_title('DHARANI sampled histology',color='white')
plt.tight_layout();plt.savefig('research/section-check.png',dpi=140)
