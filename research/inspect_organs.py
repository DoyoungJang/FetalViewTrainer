import numpy as np, matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
import sys
sys.path.insert(0,'research/pydeps')
import trimesh
fig=plt.figure(figsize=(13,6),facecolor='#172c35')
for i,file in enumerate(['heart-human.glb','brain-dharani.glb']):
 mesh=trimesh.load('dist/models/'+file,force='mesh');p=np.asarray(mesh.vertices);p=(p-(p.min(0)+p.max(0))/2)/np.ptp(p,axis=0).max();tri=p[mesh.faces]
 ax=fig.add_subplot(1,2,i+1,projection='3d',facecolor='#172c35');ax.add_collection3d(Poly3DCollection(tri[:,:,[0,2,1]],linewidths=0,shade=True,facecolors='#d4a58e'));ax.set_xlim(-.55,.55);ax.set_ylim(-.55,.55);ax.set_zlim(-.55,.55);ax.set_box_aspect((1,1,1));ax.view_init(20,60);ax.set_title(file,color='white');ax.set_axis_off()
plt.tight_layout();plt.savefig('research/organ-inspection.png',dpi=130)
